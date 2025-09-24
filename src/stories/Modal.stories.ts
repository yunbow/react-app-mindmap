import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Sample Modal',
    children: 'This is the modal content. You can put any React components here.',
  },
};

export const SaveDialog: Story = {
  args: {
    isOpen: true,
    title: 'マインドマップを保存',
    children: 'Save dialog content would go here...',
  },
};

export const LoadDialog: Story = {
  args: {
    isOpen: true,
    title: 'マインドマップを読込',
    children: 'Load dialog content would go here...',
  },
};