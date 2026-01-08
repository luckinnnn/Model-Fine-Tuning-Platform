import React, { useState } from 'react';
import { MOCK_MODELS, MOCK_DATASETS } from '../constants';
import { FineTuneTask, TaskStatus } from '../types';
import { Info, Book, Cpu, Layers } from 'lucide-react';

interface CreateTaskFormProps {
  onSubmit: (task: FineTuneTask) => void;
  onCancel: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmit, onCancel }) => {
  const [jobName, setJobName] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  
  // Advanced configs
  const [epochs, setEpochs] = useState(3);
  const [learningRate, setLearningRate] = useState(0.0001);
  const [batchSize, setBatchSize] = useState(32);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobName || !selectedModel || !selectedDataset) {
      alert('请填写所有必填项');
      return;
    }

    const newTask: FineTuneTask = {
      id: `job-${Date.now()}`,
      name: jobName,
      baseModelId: selectedModel,
      datasetId: selectedDataset,
      creator: 'current_user',
      createdAt: new Date().toLocaleString(),
      status: TaskStatus.PENDING,
      progress: 0,
      config: {
        epochs,
        learningRate,
        batchSize,
      },
    };

    onSubmit(newTask);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          创建微调任务
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          通过选择基础模型和数据集来配置您的 SFT（监督微调）作业。
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">1. 基本信息</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                作业名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="例如：金融助手-SFT-V1"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">支持中文、英文、数字和下划线。</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                选择基础模型 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_MODELS.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 relative overflow-hidden group
                      ${selectedModel === model.id 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md bg-white'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{model.icon}</span>
                      {selectedModel === model.id && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">{model.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{model.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {model.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Data Config */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">2. 数据配置</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  选择数据集 (反馈库) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedDataset}
                    onChange={(e) => setSelectedDataset(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option value="">-- 请选择数据集 --</option>
                    {MOCK_DATASETS.map((ds) => (
                      <option key={ds.id} value={ds.id}>
                        {ds.name} ({ds.type} - {ds.size})
                      </option>
                    ))}
                  </select>
                  <Book className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="mt-2 text-xs text-blue-600 cursor-pointer hover:underline">
                  + 创建新数据集
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-100 text-sm text-gray-600 flex flex-col justify-center">
                 <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <p>选定的数据集将自动拆分为训练集和验证集（默认 95% / 5%）。请确保您的反馈库数据清洗干净，以获得最佳效果。</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Section 3: Advanced (Collapsible) */}
          <div className="border rounded-md overflow-hidden">
             <button
               type="button"
               onClick={() => setShowAdvanced(!showAdvanced)}
               className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition text-sm font-medium text-gray-700"
             >
               <span className="flex items-center gap-2"><Cpu className="w-4 h-4" /> 超参数配置 (高级)</span>
               <span>{showAdvanced ? '收起' : '展开'}</span>
             </button>
             
             {showAdvanced && (
               <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">轮数 (Epochs)</label>
                    <input 
                      type="number" 
                      value={epochs} 
                      onChange={(e) => setEpochs(Number(e.target.value))}
                      className="w-full border rounded p-2 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">学习率 (Learning Rate)</label>
                    <input 
                      type="number" 
                      step="0.000001"
                      value={learningRate} 
                      onChange={(e) => setLearningRate(Number(e.target.value))}
                      className="w-full border rounded p-2 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">批次大小 (Batch Size)</label>
                    <select 
                      value={batchSize} 
                      onChange={(e) => setBatchSize(Number(e.target.value))}
                      className="w-full border rounded p-2 text-sm"
                    >
                      <option value={8}>8</option>
                      <option value={16}>16</option>
                      <option value={32}>32</option>
                      <option value={64}>64</option>
                    </select>
                  </div>
               </div>
             )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition font-medium"
            >
              确定并开始任务
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;