import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ProgressStep from './progress-step';

interface Step {
  id: string;
  title: string;
  description?: string;
  duration: number; // in milliseconds
}

const steps: Step[] = [
  {
    id: 'upload',
    title: 'Uploading file',
    description: 'Securely uploading your video file...',
    duration: 3000,
  },
  {
    id: 'extract',
    title: 'Extracting slides',
    description: 'Extracting slides from deck...',
    duration: 2500,
  },
  {
    id: 'visuals',
    title: 'Generating visuals',
    description: 'Creating beautiful visual elements...',
    duration: 2500,
  },
  {
    id: 'voice',
    title: 'Synthesizing voice',
    description: 'Processing audio with AI voice synthesis...',
    duration: 2500,
  },
  {
    id: 'compile',
    title: 'Compiling in VEED',
    description: 'Final compilation and rendering...',
    duration: 2500,
  },
];

const ProgressPage: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || isComplete) return;

    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (currentStep.duration / 50);

        if (newProgress >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            if (currentStepIndex < steps.length - 1) {
              setCurrentStepIndex((prev) => prev + 0.5); // For some reason, this runs twice
              setProgress(0);
            } else {
              setIsComplete(true);
              setIsRunning(false);
              onFinish();
            }
          }, 500);

          return 100;
        }

        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentStepIndex, isRunning, isComplete]);

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

        {isComplete && (
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
