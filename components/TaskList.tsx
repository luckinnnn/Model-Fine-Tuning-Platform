import React from 'react';
import { FineTuneTask, TaskStatus } from '../types';
import { Play, CheckCircle, XCircle, Clock, ChevronRight, MoreHorizontal } from 'lucide-react';

interface TaskListProps {
  tasks: FineTuneTask[];
  onSelectTask: (task: FineTuneTask) => void;
  onCreateNew: () => void;
}

const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3" /> 已完成
        </span>
      );
    case TaskStatus.RUNNING:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Play className="w-3 h-3 animate-pulse" /> 训练中
        </span>
      );
    case TaskStatus.FAILED:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3" /> 失败
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <Clock className="w-3 h-3" /> 排队中
        </span>
      );
  }
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onSelectTask, onCreateNew }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-lg font-bold text-gray-800">任务管理</h2>
           <p className="text-sm text-gray-500">查看并管理您的微调任务。</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm flex items-center gap-2"
        >
          + 新建任务
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作业名称 / ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基础模型</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建人</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">操作</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr 
                key={task.id} 
                className="hover:bg-gray-50 cursor-pointer transition"
                onClick={() => onSelectTask(task)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-blue-600 hover:underline">{task.name}</span>
                    <span className="text-xs text-gray-400">{task.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">{task.baseModelId}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={task.status} />
                  {task.status === TaskStatus.RUNNING && (
                    <div className="w-24 mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${task.progress}%` }}></div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.creator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {tasks.length === 0 && (
        <div className="text-center py-12">
           <p className="text-gray-500">暂无任务。请点击新建任务开始！</p>
        </div>
      )}
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">显示 {tasks.length} 个任务</span>
          <div className="flex gap-2">
            <button className="p-1 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-50" disabled>&lt;</button>
            <button className="p-1 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-50" disabled>&gt;</button>
          </div>
      </div>
    </div>
  );
};

export default TaskList;