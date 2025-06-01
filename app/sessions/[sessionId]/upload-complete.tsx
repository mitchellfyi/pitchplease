import DownloadVideo from '@/components/download-video';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import type { SupabaseSession } from '@/lib/supabase/types';
import { CheckCircle2, Share, Video } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

type UploadCompleteProps = {
  session: SupabaseSession;
};

const UploadComplete: FC<UploadCompleteProps> = ({ session }) => {
  console.log(
    '%capp/sessions/[sessionId]/upload-complete.tsx:18 session',
    'color: #007acc;',
    session,
  );
  const videoUrl =
    session.video_url ||
    'https://shotstack-api-v1-output.s3-ap-southeast-2.amazonaws.com/kuta3nwxnf/3e3ee8c3-6a2a-4e1c-ba47-b1f016f5bca7.mp4';

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-500 mx-auto mb-4 animate-scale-in" />
          <h1 className="text-4xl font-bold text-green-600 dark:text-green-500 mb-4 animate-fade-in">
            Video Processing Complete!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 animate-fade-in">
            Your video has been successfully processed and is ready to watch.
          </p>
        </div>

        <div className="bg-white dark:bg-black rounded-2xl shadow-2xl p-8 mb-8 animate-scale-in">
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-6 h-6 text-brand-950 dark:text-brand-600" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Final Video
            </h2>
          </div>

          <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
            <video
              controls
              className="w-full h-auto"
              poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyMTIxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPllvdXIgVmlkZW8gSXMgUmVhZHkhPC90ZXh0Pgo8L3N2Zz4K"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <DownloadVideo videoUrl={videoUrl} videoName="video.mp4" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="px-8">
                  <Share />
                  Share your video
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    window.open(
                      `https://www.instagram.com/sharer/sharer.php?u=${videoUrl}`,
                      '_blank',
                    );
                  }}
                >
                  Instagram
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${videoUrl}`}
                    target="_blank"
                  >
                    Facebook
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${videoUrl}`}
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadComplete;
