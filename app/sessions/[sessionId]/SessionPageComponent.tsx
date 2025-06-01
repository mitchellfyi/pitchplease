'use client';

import { ChatHeader } from '@/components/chat-header';
import ProgressSteps from '@/components/progress-steps/progress-steps';
import type { SupabaseSession } from '@/lib/supabase/types';
import type { Session } from 'next-auth';
import { useState } from 'react';
import UploadComplete from './upload-complete';
import DownloadAssets from './download-assets';
import { RefreshCw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { guestRegex } from '@/lib/constants';

const SessionPageComponent = ({
  session,
  userSession,
}: {
  session: SupabaseSession;
  userSession?: Session;
}) => {
  const [uploadFinished, setUploadFinished] = useState(false);
  const isGuest = userSession ? guestRegex.test(userSession.user?.email ?? '') : true;
  
  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      {userSession && <ChatHeader isReadonly={true} session={userSession} />}
      
      {isGuest && (
        <div className="relative z-20 -mb-12 -top-12 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-3.5">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Demo Mode:</strong> Guest users are currently limited to demo functionality only. 
              <Link 
                href="/login" 
                className="ml-1 underline hover:no-underline font-medium"
              >
                Sign up for full access
              </Link>
            </p>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 self-center px-4 bg-background pb-4 md:pb-6 gap-2 md:max-w-3xl">
        {!uploadFinished ? (
          <ProgressSteps
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
