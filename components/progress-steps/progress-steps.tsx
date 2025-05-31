import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ProgressStep from './progress-step';
import { FC } from 'react';
import type { WorkflowStatus } from '@/lib/supabase/types';

interface Step {
  id: WorkflowStatus;
  title: string;
  description?: string;
}

const steps: Step[] = [
  {
    id: 'started',
    title: 'Uploading file',
    description: 'Securely uploading your video file...',
  },
  {
    id: 'pdf_split',
    title: 'Extracting slides',
    description: 'Extracting slides from deck...',
  },
  {
    id: 'video_prompt',
    title: 'Generating visuals',
    description: 'Creating beautiful visual elements...',
  },
  {
    id: 'audio_prompt',
    title: 'Synthesizing voice',
    description: 'Processing audio with AI voice synthesis...',
  },
  {
    id: 'video_generation',
    title: 'Compiling in VEED',
    description: 'Final compilation and rendering...',
  },
  { id: 'completed', title: 'Completed' },
];

type ProgressPageProps = {
  uploadStep: WorkflowStatus;
  onFinish: () => void;
};

const ProgressPage: FC<ProgressPageProps> = ({ uploadStep, onFinish }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(
    steps.findIndex((step) => step.id === uploadStep),
  );
  const [progress, setProgress] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const currentStep = steps.find((step) => step.id === uploadStep);
    if (!currentStep) return;

    if (uploadStep === 'completed') {
      setIsRunning(false);
      return;
    }

    setCurrentStepIndex(steps.findIndex((step) => step.id === uploadStep));
    const interval = setInterval(() => {
      setProgress((prev: number) => {
        const newProgress = prev + 100 / (2500 / 50);
        if (newProgress >= 100) {
          return 0;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStepIndex, isRunning, uploadStep]);

  const getStepStatus = (index: number) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex && isRunning) return 'active';
    return 'pending';
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Video Processing Pipeline
          </h1>
          <p className="text-gray-600">
            Transform your content with our AI-powered video processing
          </p>
        </div>

        {uploadStep === 'completed' && (
          <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl text-center animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Ready!</h2>
            <p className="text-green-600">
              Your video has been successfully processed and is ready for use.
            </p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <ProgressStep
              key={step.id}
              title={step.title}
              description={step.description}
              status={getStepStatus(index)}
              progress={index === currentStepIndex ? Math.round(progress) : 0}
              stepNumber={index + 1}
            />
          ))}
        </div>

        <div className="text-center space-y-4">
          {isRunning && (
            <p className="text-sm text-gray-500 animate-pulse">
              Processing step{' '}
              {currentStepIndex < steps.length
                ? currentStepIndex + 1
                : steps.length}{' '}
              of {steps.length}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
