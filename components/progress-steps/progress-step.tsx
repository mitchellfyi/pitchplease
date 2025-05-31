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
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'active':
        return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-gray-300" />;
    }
  };

  const getStepStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'active':
        return 'bg-blue-50 border-blue-200 shadow-lg scale-105';
      default:
        return 'bg-gray-50 border-gray-200';
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
            <span className="text-sm font-medium text-gray-500">
              Step {stepNumber}
            </span>
            <h3
              className={`text-lg font-semibold ${
                status === 'completed'
                  ? 'text-green-700'
                  : status === 'active'
                    ? 'text-blue-700'
                    : 'text-gray-400'
              }`}
            >
              {title}
            </h3>
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </div>

      {status === 'active' && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 text-right">{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default ProgressStep;
