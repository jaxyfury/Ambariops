
'use client';

import { AppLayout } from '@amberops/ui/components/layout/app-layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AppLayout>{children}</AppLayout>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
