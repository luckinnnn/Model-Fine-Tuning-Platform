import { DatasetOption, FineTuneTask, ModelOption, TaskStatus, TrainingMetric } from './types';

export const MOCK_MODELS: ModelOption[] = [
  {
    id: 'qwen-7b',
    name: 'Qwen-7B-Chat',
    provider: '阿里云',
    description: '通义千问，具有强大的中文理解和生成能力的通用模型。',
    icon: '🟣',
    tags: ['通用', '中文优化'],
  },
  {
    id: 'deepseek-v2',
    name: 'DeepSeek-V2',
    provider: 'DeepSeek',
    description: '高性能代码编写和逻辑推理模型，适合复杂任务。',
    icon: '🔵',
    tags: ['代码', '数学'],
  },
  {
    id: 'llama-3-8b',
    name: 'Llama-3-8B',
    provider: 'Meta',
    description: 'Meta 最新一代开源模型，拥有出色的英语和推理能力。',
    icon: '🦙',
    tags: ['英文', '推理'],
  },
  {
    id: 'mistral-7b',
    name: 'Mistral-7B',
    provider: 'Mistral AI',
    description: '高效且高性能的小型模型，部署成本低。',
    icon: '🌪️',
    tags: ['快速', '高效'],
  },
];

export const MOCK_DATASETS: DatasetOption[] = [
  { id: 'ds-001', name: '客服_反馈优化_V1', size: '5万条样本', type: 'Feedback' },
  { id: 'ds-002', name: '医疗_多轮对话语料库', size: '12万条样本', type: 'QA' },
  { id: 'ds-003', name: '金融_研报摘要数据', size: '1.5万条样本', type: 'Feedback' },
  { id: 'ds-004', name: 'Java_代码审查建议', size: '20万条样本', type: 'Feedback' },
];

export const INITIAL_TASKS: FineTuneTask[] = [
  {
    id: 'job-20240520-001',
    name: '客服语气风格调整',
    baseModelId: 'qwen-7b',
    datasetId: 'ds-001',
    creator: 'alice@tech.com',
    createdAt: '2024-05-20 09:30:00',
    status: TaskStatus.COMPLETED,
    progress: 100,
    config: { epochs: 3, learningRate: 0.0002, batchSize: 32 },
  },
  {
    id: 'job-20240521-045',
    name: '金融逻辑增强 V2',
    baseModelId: 'deepseek-v2',
    datasetId: 'ds-003',
    creator: 'bob@tech.com',
    createdAt: '2024-05-21 14:15:00',
    status: TaskStatus.RUNNING,
    progress: 45,
    config: { epochs: 5, learningRate: 0.0001, batchSize: 16 },
  },
  {
    id: 'job-20240521-046',
    name: '医疗问答精准化',
    baseModelId: 'llama-3-8b',
    datasetId: 'ds-002',
    creator: 'carol@tech.com',
    createdAt: '2024-05-21 15:00:00',
    status: TaskStatus.PENDING,
    progress: 0,
    config: { epochs: 2, learningRate: 0.0003, batchSize: 64 },
  },
];

export const MOCK_METRICS: TrainingMetric[] = Array.from({ length: 20 }, (_, i) => ({
  step: (i + 1) * 100,
  loss: 2.5 - Math.log((i + 1) * 0.5) * 0.4 + Math.random() * 0.1,
  accuracy: 0.4 + Math.log((i + 1) * 0.5) * 0.15 + Math.random() * 0.05,
}));