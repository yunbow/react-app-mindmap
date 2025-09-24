import type { Meta, StoryObj } from '@storybook/react';
import { MindMapNode } from '../../features/mindmap/components/MindMapNode';
import { MindMapNode as NodeType } from '../../features/mindmap/types';

const meta = {
  title: 'Features/MindMap/MindMapNode',
  component: MindMapNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: { type: 'boolean' },
    },
    isRoot: {
      control: { type: 'boolean' },
    },
    onSelect: { action: 'selected' },
    onContextMenu: { action: 'context menu' },
    onDragStart: { action: 'drag start' },
    onContentChange: { action: 'content changed' },
  },
} satisfies Meta<typeof MindMapNode>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNode: NodeType = {
  id: 'node-1',
  parentId: 'root',
  content: 'サンプルノード',
  style: {
    left: '100px',
    top: '100px',
    backgroundColor: '#f8f9fa',
    color: '#212529',
    fontSize: '16px'
  }
};

const rootNode: NodeType = {
  id: 'root',
  parentId: null,
  content: '中心トピック',
  style: {
    left: '100px',
    top: '100px',
    backgroundColor: '#4a86e8',
    color: 'white',
    fontSize: '16px'
  }
};

export const Default: Story = {
  args: {
    node: sampleNode,
    isSelected: false,
    isRoot: false,
  },
};

export const Selected: Story = {
  args: {
    node: sampleNode,
    isSelected: true,
    isRoot: false,
  },
};

export const RootNode: Story = {
  args: {
    node: rootNode,
    isSelected: false,
    isRoot: true,
  },
};

export const LongText: Story = {
  args: {
    node: {
      ...sampleNode,
      content: 'これは長いテキストのサンプルです。ノードが複数行になる場合の表示を確認できます。',
    },
    isSelected: false,
    isRoot: false,
  },
};