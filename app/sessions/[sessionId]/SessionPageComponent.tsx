'use client';

import { ChatHeader } from '@/components/chat-header';
import ProgressSteps from '@/components/progress-steps/progress-steps';
import type { SupabaseSession, WorkflowStatus } from '@/lib/supabase/types';
import type { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import UploadComplete from './upload-complete';
import DownloadAssets from './download-assets';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getSessionStatus } from '@/app/sessions/actions';
import { toast } from '@/components/toast';

const SessionPageComponent = ({
  session,
  userSession,
}: {
  session: SupabaseSession;
  userSession: Session;
}) => {
  const [uploadStep, setUploadStep] = useState<WorkflowStatus>(session.status);
  const [uploadFinished, setUploadFinished] = useState(false);

  useEffect(() => {
    const pollingInterval = setInterval(async () => {
      const { status, sessionStatus } = await getSessionStatus(
        session.session_id,
      );
      if (status === 'success' && sessionStatus) {
        setUploadStep(sessionStatus);
        if (sessionStatus === 'completed') {
          setTimeout(() => {
            setUploadFinished(true);
          }, 1000);
        }
      } else {
        toast({
          type: 'error',
          description: 'Failed to get session status',
        });
      }
    }, 5000);

    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader isReadonly={true} session={userSession} />
      <div className="flex flex-1 self-center px-4 bg-background pb-4 md:pb-6 gap-2 md:max-w-3xl">
        {!uploadFinished ? (
          <ProgressSteps
            uploadStep={uploadStep}
            onFinish={() => {
              setUploadFinished(true);
            }}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <UploadComplete session={session} />
            <DownloadAssets session={session} />
            <div className="text-center">
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Process Another Video
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionPageComponent;
