import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProgressStepProps {
  title: string;
  description?: string;
  status: 'pending' | 'active' | 'completed';
  progress?: number;
  stepNumber: number;
}

const ProgressStep: React.FC<ProgressStepProps> = ({
  title,
  description,
  status,
  progress = 0,
  stepNumber,
}) => {
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" />;
      case 'active':
        return <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400 animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600" />;
    }
  };

  const getStepStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'active':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-lg scale-105';
      default:
        return 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div
      className={`p-6 rounded-xl border-2 transition-all duration-500 ${getStepStyles()}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Step {stepNumber}
            </span>
            <h3
              className={`text-lg font-semibold ${
                status === 'completed'
                  ? 'text-green-700 dark:text-green-300'
                  : status === 'active'
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {title}
            </h3>
          </div>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>

      {status === 'active' && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400 text-right">{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default ProgressStep;
