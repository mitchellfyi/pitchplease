'use client';

import { ChatHeader } from '@/components/chat-header';
import ProgressSteps from '@/components/progress-steps/progress-steps';
import type { SupabaseSession } from '@/lib/supabase/types';
import type { Session } from 'next-auth';
import { useState } from 'react';
import UploadComplete from './upload-complete';

const SessionPageComponent = ({
  session,
  userSession,
}: {
  session: SupabaseSession;
  userSession: Session;
}) => {
  const [uploadFinished, setUploadFinished] = useState(false);
  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader isReadonly={true} session={userSession} />
      <div className="flex flex-1 self-center px-4 bg-background pb-4 md:pb-6 gap-2 md:max-w-3xl">
        {!uploadFinished ? (
          <ProgressSteps
            onFinish={() => {
              setUploadFinished(true);
            }}
          />
        ) : (
          <UploadComplete />
        )}
      </div>
    </div>
  );
};

export default SessionPageComponent;
