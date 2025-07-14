import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Network, 
  Eye, 
  Lock,
  Wifi,
  Server,
  Activity,
  FileText,
  Download,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const NetworkSecurityAnalyzer = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [threats, setThreats] = useState<any[]>([]);
  const [networkStats, setNetworkStats] = useState({
    totalConnections: 0,
    suspiciousActivity: 0,
    blockedAttempts: 0,
    securityScore: 85
  });

  // Simulate real-time threat detection
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      interval = setInterval(() => {
        const newThreat = generateRandomThreat();
        setThreats(prev => [newThreat, ...prev.slice(0, 9)]);
        
        setNetworkStats(prev => ({
          totalConnections: prev.totalConnections + Math.floor(Math.random() * 5) + 1,
          suspiciousActivity: prev.suspiciousActivity + (newThreat.severity === 'HIGH' ? 1 : 0),
          blockedAttempts: prev.blockedAttempts + (newThreat.action === 'BLOCKED' ? 1 : 0),
          securityScore: Math.max(60, Math.min(100, prev.securityScore + (Math.random() - 0.5) * 10))
        }));
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const generateRandomThreat = () => {
    const threatTypes = [
      { type: 'Port Scan', severity: 'MEDIUM', description: 'Suspicious port scanning detected' },
      { type: 'Brute Force', severity: 'HIGH', description: 'Multiple failed login attempts' },
      { type: 'DDoS Attempt', severity: 'HIGH', description: 'Unusual traffic volume detected' },
      { type: 'Malware Communication', severity: 'CRITICAL', description: 'Suspicious outbound connections' },
      { type: 'SQL Injection', severity: 'HIGH', description: 'Malicious database queries detected' },
      { type: 'Unauthorized Access', severity: 'MEDIUM', description: 'Access from unknown location' }
    ];

    const sources = ['192.168.1.45', '10.0.0.23', '172.16.0.8', '203.0.113.5', '198.51.100.12'];
    const actions = ['BLOCKED', 'MONITORED', 'QUARANTINED'];
    
    const threat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    
    return {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      ...threat,
      sourceIP: sources[Math.floor(Math.random() * sources.length)],
      action: actions[Math.floor(Math.random() * actions.length)]
    };
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      monitoringPeriod: '24 hours',
      networkStats,
      threats: threats.slice(0, 20),
      recommendations: [
        'Update firewall rules to block suspicious IPs',
        'Implement rate limiting for login attempts',
        'Enable intrusion detection system alerts',
        'Review and update security policies'
      ]
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-analysis-report-${Date.now()}.json`;
    a.click();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'HIGH': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BLOCKED': return 'text-red-400 bg-red-500/20';
      case 'QUARANTINED': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Network Security Analyzer</h1>
                <p className="text-slate-300">Real-time threat detection and network monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isMonitoring 
                    ? 'bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-600/30'
                    : 'bg-green-600/20 text-green-400 border border-green-500/50 hover:bg-green-600/30'
                }`}
              >
                {isMonitoring ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
              </button>
              
              <button
                onClick={exportReport}
                className="flex items-center gap-2 px-4 py-3 bg-purple-600/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-600/30 transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Network className="w-6 h-6 text-blue-400" />
              <span className="text-slate-400">Total Connections</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{networkStats.totalConnections}</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <span className="text-slate-400">Suspicious Activity</span>
            </div>
            <div className="text-3xl font-bold text-orange-400">{networkStats.suspiciousActivity}</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-6 h-6 text-red-400" />
              <span className="text-slate-400">Blocked Attempts</span>
            </div>
            <div className="text-3xl font-bold text-red-400">{networkStats.blockedAttempts}</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-slate-400">Security Score</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{Math.round(networkStats.securityScore)}%</div>
          </div>
        </div>

        {/* Real-time Threat Feed */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Eye className="w-6 h-6 text-purple-400" />
              Live Threat Detection
            </h2>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-slate-400">
                {isMonitoring ? 'Monitoring Active' : 'Monitoring Stopped'}
              </span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {threats.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No threats detected. Start monitoring to see real-time activity.</p>
              </div>
            ) : (
              threats.map((threat) => (
                <div key={threat.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                      <span className="font-medium">{threat.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(threat.action)}`}>
                        {threat.action}
                      </span>
                      <span className="text-sm text-slate-400">{threat.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{threat.description}</p>
                  <div className="text-xs text-slate-400">
                    Source IP: <span className="font-mono text-slate-300">{threat.sourceIP}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-green-400" />
            Security Recommendations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Immediate Actions</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Update firewall rules to block suspicious IPs
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Implement rate limiting for authentication
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Enable multi-factor authentication
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Long-term Improvements</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  Deploy intrusion detection system
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  Conduct regular security audits
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  Implement network segmentation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSecurityAnalyzer;