import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ProgressStep from './progress-step';
import type { FC } from 'react';
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
    id: 'avatar_video_generation',
    title: 'Narrating slides',
    description: 'Creating a talking avatar with Sievedata.com and VEED.io...',
  },
  {
    id: 'video_prompt',
    title: 'Generating visuals',
    description: 'Creating beautiful visual elements with fal.ai...',
  },
  {
    id: 'audio_prompt',
    title: 'Synthesizing voice',
    description: 'Processing audio AI voice synthesis with ElevenLabs.io...',
  },
  {
    id: 'video_generation',
    title: 'Compiling in VEED',
    description: 'Processing audio AI voice synthesis with ElevenLabs.io...',
  },
  { id: 'completed', title: 'Completed' },
];

const ProgressPage: FC<{
  onFinish: () => void;
  uploadStep: WorkflowStatus;
}> = ({ uploadStep, onFinish }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(
    steps.findIndex((step) => step.id === uploadStep),
  );
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (uploadStep === 'completed') {
      setIsComplete(true);
      return;
    }
    const currentStep = steps.find((step) => step.id === uploadStep);
    if (!currentStep) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset for current step
    startTimeRef.current = Date.now();
    setProgress(0);
    setCurrentStepIndex(steps.findIndex((step) => step.id === uploadStep));

    intervalRef.current = setInterval(() => {
      setProgress((prev: number) => {
        const newProgress = prev + 100 / (2500 / 50);
        if (newProgress >= 100) {
          return 0;
        }
        return newProgress;
      });
    }, 50);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentStepIndex, isComplete, onFinish]);

  const getStepStatus = (index: number) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex && !isComplete) return 'active';
    return 'pending';
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Video Processing Pipeline
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Transform your content with our AI-powered video processing
          </p>
        </div>

        {uploadStep === 'completed' && (
          <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl text-center animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-green-500 dark:text-green-400 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
              Ready!
            </h2>
            <p className="text-green-600 dark:text-green-400">
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
          {!isComplete && (
            <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
              Processing step {currentStepIndex + 1} of {steps.length}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
