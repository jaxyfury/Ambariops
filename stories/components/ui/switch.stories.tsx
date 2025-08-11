
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../../apps/web/src/components/ui/switch';
import { Label } from '../../../apps/web/src/components/ui/label';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};
