import React, { useState } from 'react';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  const tasks = [
    { id: 1, title: 'Design REST API architecture', project: 'Backend V2', status: 'IN_PROGRESS', priority: 'High' },
    { id: 2, title: 'Implement database models', project: 'Database Layer', status: 'TODO', priority: 'Medium' },
    { id: 3, title: 'Deploy frontend to Vercel', project: 'Platform Launch', status: 'DONE', priority: 'Low' },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block p-6">
        <h1 className="text-xl font-bold text-indigo-600 mb-8">Innovation Hacks</h1>
        <nav className="space-y-4 text-gray-600">
          <a href="#" className="block font-medium text-indigo-600">Dashboard</a>
          <a href="#" className="block hover:text-indigo-600">Projects</a>
          <a href="#" className="block hover:text-indigo-600">Tasks</a>
          <a href="#" className="block hover:text-indigo-600">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Developer Productivity Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back, Developer</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">IH</div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Projects</p>
            <p className="text-3xl font-bold text-gray-800">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Active Tasks</p>
            <p className="text-3xl font-bold text-indigo-600">2</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-3xl font-bold text-green-600">33%</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex space-x-2 w-full md:w-auto">
            {['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${filterStatus === status ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-600'}`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full">{task.project}</span>
                  <h3 className="text-lg font-bold text-gray-800 mt-3">{task.title}</h3>
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50 text-sm">
                  <span className="text-gray-500">Priority: {task.priority}</span>
                  <span className={`font-semibold ${task.status === 'DONE' ? 'text-green-600' : 'text-amber-600'}`}>{task.status}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">No tasks found matching your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
}