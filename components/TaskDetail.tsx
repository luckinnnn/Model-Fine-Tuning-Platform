import React, { useState } from 'react';
import { FineTuneTask, TaskStatus } from '../types';
import { MOCK_METRICS } from '../constants';
import { ArrowLeft, CheckCircle, Download, Activity, MessageSquare, Database, Share2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TaskDetailProps {
  task: FineTuneTask;
  onBack: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verification'>('overview');
  
  // Mock chat state for verification
  const [inputPrompt, setInputPrompt] = useState('怎么重置我的密码？');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<{before: string, after: string} | null>(null);

  const handleTestRun = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setGenerationResult({
        before: "你可以去设置里重置密码。点击那个按钮。",
        after: "您好！要重置密码，请前往‘账户设置’->‘安全’->‘修改密码’。我们会发送一个安全链接到您的注册邮箱。如果需要更多帮助，请随时告知！"
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {task.name}
              {task.status === TaskStatus.COMPLETED && <CheckCircle className="w-5 h-5 text-green-500" />}
            </h1>
            <p className="text-sm text-gray-500">ID: {task.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
             <Download className="w-4 h-4" /> 导出模型
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
             <Share2 className="w-4 h-4" /> 部署服务
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            概览与指标
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'verification'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            验证结果
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Left Column: Config */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-500" /> 任务配置
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">基础模型:</dt>
                    <dd className="font-medium">{task.baseModelId}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">数据集:</dt>
                    <dd className="font-medium text-blue-600 cursor-pointer hover:underline">{task.datasetId}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">轮数 (Epochs):</dt>
                    <dd className="font-medium">{task.config.epochs}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">批次大小 (Batch Size):</dt>
                    <dd className="font-medium">{task.config.batchSize}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">学习率 (Learning Rate):</dt>
                    <dd className="font-medium">{task.config.learningRate}</dd>
                  </div>
                  <div className="pt-3 border-t flex justify-between">
                    <dt className="text-gray-500">状态:</dt>
                    <dd className="font-medium">{task.status}</dd>
                  </div>
                </dl>
              </div>
           </div>

           {/* Right Column: Charts */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                   <Activity className="w-4 h-4 text-green-500" /> 训练 Loss 曲线
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_METRICS}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="step" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend />
                      <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} dot={false} name="Loss" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-md text-sm text-blue-800">
            <strong>验证环境：</strong> 此演练场使用选定的验证集或自定义输入，对比基础模型与微调后模型的输出效果。
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
             <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-2">测试提示词</label>
               <div className="flex gap-2">
                 <input 
                    type="text" 
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="输入提示词进行测试..."
                 />
                 <button 
                   onClick={handleTestRun}
                   disabled={isGenerating}
                   className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2"
                 >
                   {isGenerating ? '生成中...' : '运行对比'}
                   {!isGenerating && <MessageSquare className="w-4 h-4" />}
                 </button>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Before */}
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">基础模型 ({task.baseModelId})</span>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-48 overflow-y-auto text-gray-700 text-sm leading-relaxed">
                    {generationResult ? generationResult.before : <span className="text-gray-400 italic">等待输入...</span>}
                 </div>
               </div>

               {/* After */}
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">微调模型</span>
                    {generationResult && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">已优化</span>}
                 </div>
                 <div className="bg-green-50 p-4 rounded-lg border border-green-200 h-48 overflow-y-auto text-gray-800 text-sm leading-relaxed">
                    {generationResult ? generationResult.after : <span className="text-gray-400 italic">等待输入...</span>}
                 </div>
               </div>
             </div>
          </div>
          
          {/* Automated Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                <div className="text-gray-500 text-xs uppercase font-bold mb-1">Rouge-L 分数</div>
                <div className="text-2xl font-bold text-gray-800">0.58 <span className="text-green-500 text-sm">(+12%)</span></div>
             </div>
             <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                <div className="text-gray-500 text-xs uppercase font-bold mb-1">BLEU 分数</div>
                <div className="text-2xl font-bold text-gray-800">0.42 <span className="text-green-500 text-sm">(+8%)</span></div>
             </div>
             <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                <div className="text-gray-500 text-xs uppercase font-bold mb-1">人工评估 (Human Eval)</div>
                <div className="text-2xl font-bold text-gray-800">4.5/5.0</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;