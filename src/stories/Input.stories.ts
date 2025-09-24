import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'color'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    value: '',
    placeholder: 'Enter text...',
  },
};

export const Color: Story = {
  args: {
    type: 'color',
    value: '#4a86e8',
  },
};

export const WithValue: Story = {
  args: {
    type: 'text',
    value: 'Sample text',
    placeholder: 'Enter text...',
  },
};