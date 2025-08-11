import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export async function enableMocking() {
  if (typeof window !== 'undefined') {
      await worker.start();
  }
}
