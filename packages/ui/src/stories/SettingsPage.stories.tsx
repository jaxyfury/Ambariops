import type { Meta, StoryObj } from '@storybook/react';
import SettingsPage from '../../../../apps/admin/src/app/users/page';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../apps/web/src/lib/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof SettingsPage> = {
  title: 'Pages/User Management (Admin)',
  component: SettingsPage,
  decorators: [
    (Story) => (
       <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <Story />
           </QueryClientProvider>
       </I18nextProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SettingsPage>;

export const Default: Story = {
  render: () => <SettingsPage />,
};
