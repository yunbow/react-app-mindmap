export const Config = {
  DEFAULT_NODE_STYLE: {
    backgroundColor: '#f8f9fa',
    color: '#212529',
    fontSize: '16px'
  },
  ROOT_NODE_STYLE: {
    backgroundColor: '#4a86e8',
    color: 'white',
    fontSize: '16px'
  },
  CANVAS: {
    MIN_SCALE: 0.3,
    MAX_SCALE: 3.0,
    SCALE_STEP: 0.1,
    GRID_SIZE: 20
  },
  NODE: {
    MIN_WIDTH: 100,
    MAX_WIDTH: 200,
    DEFAULT_OFFSET: 150
  },
  STORAGE_KEY: 'mindmaps'
} as const;