'use server';

import { z } from 'zod';

import { createUser, getUser } from '@/lib/db/queries';

import { signIn } from './auth';
import type { Attachment } from 'ai';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseSession } from '@/lib/supabase/types';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'user_exists'
    | 'invalid_data';
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const [user] = await getUser(validatedData.email);

    if (user) {
      return { status: 'user_exists' } as RegisterActionState;
    }
    await createUser(validatedData.email, validatedData.password);
    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }

    return { status: 'failed' };
  }
};

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
    console.log('Results', results);
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
