import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle,
  XCircle,
  Eye,
  Phone,
  Mail,
  Server,
  Database,
  Wifi,
  Lock,
  Unlock,
  Activity,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';

const IncidentResponseDashboard = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    totalIncidents: 0,
    activeIncidents: 0,
    resolvedIncidents: 0,
    avgResponseTime: '2.3h'
  });

  // Initialize with sample incidents
  useEffect(() => {
    const sampleIncidents = [
      {
        id: 'INC-2024-001',
        title: 'Suspicious Network Activity Detected',
        severity: 'HIGH',
        status: 'INVESTIGATING',
        category: 'Network Security',
        reportedBy: 'Security Monitoring System',
        assignedTo: 'John Smith',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        description: 'Unusual outbound traffic patterns detected from internal servers',
        affectedSystems: ['Web Server 01', 'Database Server 02'],
        timeline: [
          { time: '14:30', action: 'Incident detected by SIEM', user: 'System' },
          { time: '14:35', action: 'Assigned to security team', user: 'Auto-Assignment' },
          { time: '14:45', action: 'Initial investigation started', user: 'John Smith' }
        ]
      },
      {
        id: 'INC-2024-002',
        title: 'Failed Login Attempts - Brute Force Attack',
        severity: 'MEDIUM',
        status: 'CONTAINED',
        category: 'Authentication',
        reportedBy: 'Sarah Johnson',
        assignedTo: 'Mike Davis',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        description: 'Multiple failed login attempts detected from external IP addresses',
        affectedSystems: ['Login Portal', 'User Database'],
        timeline: [
          { time: '12:15', action: 'Brute force attack detected', user: 'System' },
          { time: '12:20', action: 'IP addresses blocked', user: 'Mike Davis' },
          { time: '12:30', action: 'Additional monitoring enabled', user: 'Mike Davis' },
          { time: '13:00', action: 'Threat contained', user: 'Mike Davis' }
        ]
      },
      {
        id: 'INC-2024-003',
        title: 'Malware Detection on Workstation',
        severity: 'CRITICAL',
        status: 'RESOLVED',
        category: 'Malware',
        reportedBy: 'Emily Chen',
        assignedTo: 'Alex Rodriguez',
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        description: 'Trojan malware detected on employee workstation in Finance department',
        affectedSystems: ['WS-FIN-045', 'Shared Network Drive'],
        timeline: [
          { time: '08:30', action: 'Malware detected by antivirus', user: 'System' },
          { time: '08:35', action: 'Workstation isolated', user: 'Alex Rodriguez' },
          { time: '09:15', action: 'Malware removed and system cleaned', user: 'Alex Rodriguez' },
          { time: '10:30', action: 'System restored and monitoring enabled', user: 'Alex Rodriguez' },
          { time: '11:00', action: 'Incident resolved', user: 'Alex Rodriguez' }
        ]
      }
    ];

    setIncidents(sampleIncidents);
    setStats({
      totalIncidents: sampleIncidents.length,
      activeIncidents: sampleIncidents.filter(i => i.status !== 'RESOLVED').length,
      resolvedIncidents: sampleIncidents.filter(i => i.status === 'RESOLVED').length,
      avgResponseTime: '2.3h'
    });
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'HIGH': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'LOW': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RESOLVED': return 'text-green-400 bg-green-500/20';
      case 'INVESTIGATING': return 'text-blue-400 bg-blue-500/20';
      case 'CONTAINED': return 'text-orange-400 bg-orange-500/20';
      case 'ESCALATED': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filterStatus === 'all') return true;
    return incident.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const exportIncidentReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: stats,
      incidents: incidents,
      recommendations: [
        'Implement automated incident response workflows',
        'Enhance monitoring capabilities for early detection',
        'Conduct regular incident response training',
        'Review and update incident response procedures'
      ]
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incident-response-report-${Date.now()}.json`;
    a.click();
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600/20 rounded-xl border border-red-500/30">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Incident Response Dashboard</h1>
                <p className="text-slate-300">Centralized security incident management and response</p>
              </div>
            </div>
            
            <button
              onClick={exportIncidentReport}
              className="flex items-center gap-2 px-4 py-3 bg-purple-600/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-600/30 transition-all duration-200"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-blue-400" />
              <span className="text-slate-400">Total Incidents</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{stats.totalIncidents}</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-orange-400" />
              <span className="text-slate-400">Active Incidents</span>
            </div>
            <div className="text-3xl font-bold text-orange-400">{stats.activeIncidents}</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-slate-400">Resolved</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{stats.resolvedIncidents}</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-purple-400" />
              <span className="text-slate-400">Avg Response Time</span>
            </div>
            <div className="text-3xl font-bold text-purple-400">{stats.avgResponseTime}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Incidents List */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-400" />
                Security Incidents
              </h2>
              
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="investigating">Investigating</option>
                  <option value="contained">Contained</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredIncidents.map((incident) => (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50 hover:border-blue-500/50 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                      <span className="font-medium">{incident.id}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{incident.title}</h3>
                  <p className="text-slate-300 text-sm mb-3">{incident.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Assigned to: {incident.assignedTo}</span>
                    <span>{formatTimeAgo(incident.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incident Details */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-green-400" />
              Incident Details
            </h2>
            
            {selectedIncident ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(selectedIncident.severity)}`}>
                      {selectedIncident.severity}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                      {selectedIncident.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{selectedIncident.title}</h3>
                  <p className="text-slate-300 text-sm">{selectedIncident.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-blue-400">Incident Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">ID:</span>
                      <span>{selectedIncident.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span>{selectedIncident.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reported by:</span>
                      <span>{selectedIncident.reportedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assigned to:</span>
                      <span>{selectedIncident.assignedTo}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-orange-400">Affected Systems</h4>
                  <div className="space-y-1">
                    {selectedIncident.affectedSystems.map((system: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Server className="w-4 h-4 text-orange-400" />
                        <span>{system}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-green-400">Timeline</h4>
                  <div className="space-y-2">
                    {selectedIncident.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">{event.time}</div>
                          <div className="text-slate-300">{event.action}</div>
                          <div className="text-slate-400 text-xs">by {event.user}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select an incident to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Response Procedures */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-purple-400" />
            Incident Response Procedures
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400">1. Identification</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-400" />
                  Detect and analyze potential incidents
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-400" />
                  Determine scope and impact
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-400" />
                  Document initial findings
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">2. Containment</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  Isolate affected systems
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  Prevent further damage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  Preserve evidence
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">3. Recovery</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Restore systems and services
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Implement additional monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Conduct lessons learned review
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentResponseDashboard;