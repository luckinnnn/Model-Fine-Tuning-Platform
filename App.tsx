import React, { useState } from 'react';
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';
import TaskDetail from './components/TaskDetail';
import { FineTuneTask } from './types';
import { INITIAL_TASKS } from './constants';
import { LayoutDashboard, PlusCircle, Settings, Box } from 'lucide-react';

// Simple router state
type ViewState = 'LIST' | 'CREATE' | 'DETAIL';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LIST');
  const [tasks, setTasks] = useState<FineTuneTask[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<FineTuneTask | null>(null);

  const handleCreateTask = (newTask: FineTuneTask) => {
    setTasks([newTask, ...tasks]);
    setView('LIST');
  };

  const handleSelectTask = (task: FineTuneTask) => {
    setSelectedTask(task);
    setView('DETAIL');
  };

  const renderContent = () => {
    switch (view) {
      case 'CREATE':
        return <CreateTaskForm onSubmit={handleCreateTask} onCancel={() => setView('LIST')} />;
      case 'DETAIL':
        return selectedTask ? (
          <TaskDetail task={selectedTask} onBack={() => setView('LIST')} />
        ) : (
          <div>错误：未选择任务</div>
        );
      case 'LIST':
      default:
        return (
          <TaskList 
            tasks={tasks} 
            onSelectTask={handleSelectTask} 
            onCreateNew={() => setView('CREATE')} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">FT</div>
             <span className="font-bold text-lg tracking-tight">大模型微调平台</span>
           </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setView('LIST')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${view === 'LIST' || view === 'DETAIL' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            任务列表
          </button>
          <button 
            onClick={() => setView('CREATE')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition ${view === 'CREATE' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <PlusCircle className="w-5 h-5" />
            创建任务
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 transition">
            <Box className="w-5 h-5" />
            模型库
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-slate-800 transition">
            <Settings className="w-5 h-5" />
            设置
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700"></div>
              <div className="text-sm">
                <div className="text-white">管理员</div>
                <div className="text-slate-500 text-xs">admin@finetune.ai</div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (only visible on small screens) */}
        <header className="bg-white border-b border-gray-200 p-4 md:hidden flex items-center justify-between">
           <span className="font-bold text-gray-800">微调平台</span>
           <button onClick={() => setView('LIST')} className="p-2 text-gray-600">
             <LayoutDashboard />
           </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;