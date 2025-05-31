import { Button } from '@/components/ui/button';
import type { SupabaseSession } from '@/lib/supabase/types';
import type { FC } from 'react';
import { Download } from 'lucide-react';
import DownloadVideo from '@/components/download-video';

type DownloadAssetsProps = {
  session: SupabaseSession;
};

const DownloadAssets: FC<DownloadAssetsProps> = ({ session }) => {
  console.log(
    '%capp/sessions/[sessionId]/download-assets.tsx:11 session',
    'color: #007acc;',
    session,
  );
  const videoUrl =
    session.video_url ||
    'https://shotstack-api-v1-output.s3-ap-southeast-2.amazonaws.com/kuta3nwxnf/385aebfe-fa1f-4b15-aacc-ebf869465616.mp4';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-scale-in">
      <div className="flex items-center gap-3 mb-6">
        <Download className="w-6 h-6 text-purple-500 dark:text-purple-400" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Download Assets
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Download individual assets generated during each processing step.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Original PDF</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Your uploaded PDF file</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Extracted Slides</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Individual slide images (ZIP)
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download ZIP
          </Button>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Generated Visuals
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Enhanced visual elements</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Assets
          </Button>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Audio Track</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Synthesized voice audio</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download MP3
          </Button>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Final Video</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Final video file</p>
          <DownloadVideo
            videoUrl={videoUrl}
            videoName="video.mp4"
            variant="outline"
            size="sm"
            className="w-full"
          />
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">All Assets</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Complete package (ZIP)</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadAssets;
