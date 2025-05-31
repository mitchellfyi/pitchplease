'use server';

import type { Attachment } from 'ai';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import type { SupabaseSession, WorkflowStatus } from '@/lib/supabase/types';

export interface UploadFilesToSupabaseActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
  sessions?: Array<Array<SupabaseSession>>;
}

export const uploadFilesToSupabase = async (
  files: Array<Attachment>,
): Promise<UploadFilesToSupabaseActionState> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const promises = [];

  for (const file of files) {
    promises.push(
      new Promise((resolve, reject) => {
        resolve(
          supabase
            .from('sessions')
            .insert({
              session_id: uuidv4(),
              original_filename: file.name,
              file_url: file.url,
            })
            .select(),
        );
      }),
    );
  }
  try {
    const results = await Promise.all(promises);

    const errorFound = results.find(
      (result) => (result as { error: { message: string } }).error,
    );

    if (errorFound) {
      console.error('Error uploading files', errorFound);
      return { status: 'failed' };
    }
    return {
      status: 'success',
      sessions: results.map(
        (result) => (result as { data: Array<SupabaseSession> }).data,
      ),
    };
  } catch (error) {
    console.error('Error uploading files', error);
    return { status: 'failed' };
  }
};

export interface GetSupabaseSessionActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
  session?: SupabaseSession;
}

export const getSupabaseSession = async (
  sessionId: string,
): Promise<GetSupabaseSessionActionState> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error getting session', error);
      return { status: 'failed' };
    }
    return {
      status: 'success',
      session: data[0] as SupabaseSession,
    };
  } catch (error) {
    console.error('Error getting session', error);
    return { status: 'failed' };
  }
};

type GetSessionStatusActionState = {
  status: 'success' | 'failed';
  sessionStatus?: WorkflowStatus;
};

export const getSessionStatus = async (
  sessionId: string,
): Promise<GetSessionStatusActionState> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('status')
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error getting session status: ', error);
      return { status: 'failed' };
    }
    return {
      status: 'success',
      sessionStatus: data[0].status as WorkflowStatus,
    };
  } catch (error) {
    console.error('Error getting session status: ', error);
    return { status: 'failed' };
  }
};
