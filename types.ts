export enum TaskStatus {
  PENDING = 'Pending',
  RUNNING = 'Running',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
}

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: string; // Emoji or icon name
  tags: string[];
}

export interface DatasetOption {
  id: string;
  name: string;
  size: string;
  type: 'Feedback' | 'QA' | 'Raw Text';
}

export interface FineTuneTask {
  id: string;
  name: string;
  baseModelId: string;
  datasetId: string;
  creator: string;
  createdAt: string;
  status: TaskStatus;
  progress: number; // 0-100
  // For demo purposes, we store config here
  config: {
    epochs: number;
    learningRate: number;
    batchSize: number;
  };
}

export interface TrainingMetric {
  step: number;
  loss: number;
  accuracy: number;
}
