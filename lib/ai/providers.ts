import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

// Guard to ensure required environment variables are present
if (!isTestEnvironment && !process.env.MODEL_CHAT) {
  throw new Error('MODEL_CHAT environment variable is required');
}

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openai(process.env.MODEL_CHAT!),
        'chat-model-reasoning': wrapLanguageModel({
          model: openai(process.env.MODEL_REASONING || process.env.MODEL_CHAT!),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openai(process.env.MODEL_TITLE || process.env.MODEL_CHAT!),
        'artifact-model': openai(process.env.MODEL_ARTIFACT || process.env.MODEL_CHAT!),
      },
      imageModels: {
        'small-model': openai.image(process.env.MODEL_IMAGE_SMALL || process.env.MODEL_CHAT!),
      },
    });
