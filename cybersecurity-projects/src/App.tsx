import React from 'react';
import { useState } from 'react';
import NetworkSecurityAnalyzer from './components/NetworkSecurityAnalyzer';
import IncidentResponseDashboard from './components/IncidentResponseDashboard';
import { Shield, AlertTriangle, Network, Eye } from 'lucide-react';

function App() {
  const [activeProject, setActiveProject] = useState('network');

  const projects = [
    {
      id: 'network',
      title: 'Network Security Analyzer',
      description: 'Real-time threat detection and network monitoring system',
      icon: Shield,
      component: NetworkSecurityAnalyzer
    },
    {
      id: 'incident',
      title: 'Incident Response Dashboard',
      description: 'Centralized security incident management and response platform',
      icon: AlertTriangle,
      component: IncidentResponseDashboard
    }
  ];

  const ActiveComponent = projects.find(p => p.id === activeProject)?.component || NetworkSecurityAnalyzer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Project Selector */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
                <Network className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Cybersecurity Portfolio</h1>
                <p className="text-slate-400 text-sm">Professional security tools and dashboards</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeProject === project.id
                      ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{project.title}</div>
                    <div className="text-xs opacity-75">{project.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Active Project */}
      <ActiveComponent />
    </div>
  );
}

export default App;