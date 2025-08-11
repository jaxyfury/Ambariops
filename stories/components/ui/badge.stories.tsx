
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../apps/web/src/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary: Story = {
    args: {
      children: 'Badge',
      variant: 'secondary',
    },
  };

export const Destructive: Story = {
    args: {
        children: 'Badge',
        variant: 'destructive',
    },
};

export const Outline: Story = {
    args: {
        children: 'Badge',
        variant: 'outline',
    },
};
