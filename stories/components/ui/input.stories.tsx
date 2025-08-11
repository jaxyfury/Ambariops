
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../apps/web/src/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Email',
    type: 'email',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Email',
    type: 'email',
    disabled: true,
  },
};
