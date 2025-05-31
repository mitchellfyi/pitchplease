import type { FC } from 'react';
import { Button, type ButtonProps } from './ui/button';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

type DownloadVideoProps = ButtonProps & {
  videoUrl: string;
  videoName: string;
  className?: string;
};

const DownloadVideo: FC<DownloadVideoProps> = ({
  videoUrl,
  videoName,
  className,
  ...buttonProps
}) => {
  return (
    <Button
      size="lg"
      className={cn('px-8', className)}
      {...buttonProps}
      onClick={() => {
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = 'video.mp4';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    >
      <Download />
      Download Video
    </Button>
  );
};

export default DownloadVideo;
