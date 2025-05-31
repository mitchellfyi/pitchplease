export type WorkflowStatus =
  | 'not_started'
  | 'started'
  | 'pdf_split'
  | 'video_prompt'
  | 'audio_prompt'
  | 'video_generation'
  | 'audio_generation'
  | 'avatar_video_generation'
  | 'avatar_video_dubbing'
  | 'avatar_video_cropping'
  | 'video_captions'
  | 'video_merge'
  | 'video_translation'
  | 'completed';

export type SupabaseSession = {
  id: string;
  session_id: string;
  original_filename: string;
  file_url: string;
  status: WorkflowStatus;
  video_url?: string;
};
