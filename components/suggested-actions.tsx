'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo, useRef } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import { Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { uploadFilesToSupabase } from '@/app/(auth)/actions';
import { useRouter } from 'next/navigation';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
  selectedVisibilityType: VisibilityType;
}

function PureSuggestedActions({
  chatId,
  append,
  selectedVisibilityType,
}: SuggestedActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;

        return {
          url,
          name: pathname,
          contentType: contentType,
        };
      }
      const { error } = await response.json();
      toast.error(error);
    } catch (error) {
      toast.error('Failed to upload file, please try again!');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    // Validate file size (e.g., max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    try {
      toast.success('Processing pitch deck...');
      
      // Upload file
      const uploadedAttachment = await uploadFile(file);
      if (!uploadedAttachment) {
        toast.error('Failed to upload file');
        return;
      }

      // Upload to Supabase and get session
      const uploadFilesResult = await uploadFilesToSupabase([uploadedAttachment]);
      
      if (uploadFilesResult.status === 'failed' || uploadFilesResult.status === 'invalid_data') {
        toast.error('Failed to upload files, please try again!');
        return;
      }

      if (uploadFilesResult.sessions) {
        const sessionId = uploadFilesResult.sessions[0][0].session_id;
        
        // Redirect to sessions page with session ID
        router.push(`/sessions/${sessionId}`);
      }

      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to process file');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
     

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <div
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="border-2 border-dashed border-brand-200 dark:border-brand-800 rounded-2xl p-12 text-center cursor-pointer hover:border-brand-400 dark:hover:border-brand-600 transition-colors bg-brand-50/30 dark:bg-brand-950/10 hover:bg-brand-50/50 dark:hover:bg-brand-950/20"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-brand-950 dark:text-brand-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Upload Your Pitch Deck
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drop your PDF here or click to browse
              </p>
              <Button 
                type="button"
                size="lg" 
                className="bg-brand-950 hover:bg-brand-900 dark:bg-brand-600 dark:hover:bg-brand-700 text-white"
              >
                <FileText className="w-5 h-5 mr-2" />
                Choose PDF File
              </Button>
            </div>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Supported format: PDF • Max size: 10MB
        </p>
      </motion.div>
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);
