'use server';

/**
 * This file re-exports the AI flows as Server Actions.
 * This allows client components to call them without bundling the
 * server-side AI code into the client bundle.
 */

export {
  suggestTroubleshootingSteps,
  summarizeClusterHealth,
} from '@amberops/api/ai';
