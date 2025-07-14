import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Search, 
  Target, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Network,
  Globe,
  Eye,
  Download
} from 'lucide-react';

const VulnScanningLab = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const labSteps = [
    {
      id: 1,
      title: "Environment Setup",
      description: "Configure your scanning environment and target systems",
      commands: [
        "# Update Kali Linux",
        "sudo apt update && sudo apt upgrade -y",
        "# Install additional tools",
        "sudo apt install nmap burpsuite-community -y"
      ]
    },
    {
      id: 2,
      title: "Target Discovery",
      description: "Identify live hosts and services on the network",
      commands: [
        "# Network discovery scan",
        "nmap -sn 192.168.1.0/24",
        "# Quick port scan",
        "nmap -F 192.168.1.100",
        "# Service version detection",
        "nmap -sV 192.168.1.100"
      ]
    },
    {
      id: 3,
      title: "Port Scanning",
      description: "Comprehensive port scanning and service enumeration",
      commands: [
        "# TCP SYN scan (stealth)",
        "nmap -sS 192.168.1.100",
        "# UDP scan (top ports)",
        "nmap -sU --top-ports 1000 192.168.1.100",
        "# Aggressive scan with scripts",
        "nmap -A 192.168.1.100"
      ]
    },
    {
      id: 4,
      title: "Vulnerability Detection",
      description: "Use Nmap scripts to identify potential vulnerabilities",
      commands: [
        "# Run vulnerability scripts",
        "nmap --script vuln 192.168.1.100",
        "# Check for specific CVEs",
        "nmap --script cve-* 192.168.1.100",
        "# SMB vulnerability check",
        "nmap --script smb-vuln-* 192.168.1.100"
      ]
    },
    {
      id: 5,
      title: "Web Application Scanning",
      description: "Configure Burp Suite for web application testing",
      commands: [
        "# Start Burp Suite",
        "burpsuite &",
        "# Configure browser proxy (127.0.0.1:8080)",
        "# Import Burp CA certificate",
        "# Enable intercept and start scanning"
      ]
    }
  ];

  const targetSystems = [
    {
      name: "Metasploitable 2",
      description: "Intentionally vulnerable Linux system",
      downloadUrl: "https://sourceforge.net/projects/metasploitable/",
      difficulty: "Beginner",
      services: ["SSH", "FTP", "HTTP", "MySQL", "Samba"]
    },
    {
      name: "DVWA",
      description: "Damn Vulnerable Web Application",
      downloadUrl: "https://github.com/digininja/DVWA",
      difficulty: "Beginner",
      services: ["HTTP", "MySQL", "PHP"]
    },
    {
      name: "VulnHub VMs",
      description: "Collection of vulnerable VMs",
      downloadUrl: "https://www.vulnhub.com/",
      difficulty: "Various",
      services: ["Multiple"]
    }
  ];

  const nmapScripts = [
    {
      category: "Discovery",
      scripts: ["broadcast-*", "discovery", "safe"],
      description: "Host and service discovery"
    },
    {
      category: "Vulnerability",
      scripts: ["vuln", "exploit", "dos"],
      description: "Vulnerability detection and exploitation"
    },
    {
      category: "Authentication",
      scripts: ["auth", "brute", "default"],
      description: "Authentication testing and brute force"
    },
    {
      category: "Malware",
      scripts: ["malware", "backdoor", "trojan"],
      description: "Malware and backdoor detection"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-600/20 rounded-xl border border-red-500/30">
              <Search className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Vulnerability Scanning Lab</h1>
              <p className="text-slate-300 text-lg">Nmap & Burp Suite Penetration Testing</p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-4 flex-wrap">
            {['overview', 'setup', 'targets', 'scripts', 'methodology'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-red-600/30 text-red-400 border border-red-500/50'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/30'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold">Project Objectives</h3>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Learn network reconnaissance techniques
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Master Nmap scanning methodologies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Configure and use Burp Suite effectively
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Identify and document vulnerabilities
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">Tools & Technologies</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="font-medium text-red-400">Nmap</div>
                    <div className="text-sm text-slate-400">Network Scanner</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="font-medium text-orange-400">Burp Suite</div>
                    <div className="text-sm text-slate-400">Web App Scanner</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="font-medium text-green-400">Kali Linux</div>
                    <div className="text-sm text-slate-400">Penetration OS</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="font-medium text-purple-400">VirtualBox</div>
                    <div className="text-sm text-slate-400">Virtualization</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Steps */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-green-400" />
                Lab Progression
              </h3>
              <div className="space-y-4">
                {labSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`border rounded-xl p-4 transition-all duration-200 ${
                      completedSteps.includes(step.id)
                        ? 'border-green-500/50 bg-green-500/10'
                        : 'border-slate-600/50 bg-slate-700/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStep(step.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            completedSteps.includes(step.id)
                              ? 'border-green-500 bg-green-500'
                              : 'border-slate-500 hover:border-green-500'
                          }`}
                        >
                          {completedSteps.includes(step.id) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </button>
                        <h4 className="text-lg font-semibold">{step.title}</h4>
                      </div>
                      <span className="text-sm text-slate-400">Step {step.id}</span>
                    </div>
                    <p className="text-slate-300 mb-3">{step.description}</p>
                    <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                      {step.commands.map((cmd, idx) => (
                        <div key={idx} className="text-green-400 mb-1">{cmd}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Setup Tab */}
        {activeTab === 'setup' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Download className="w-6 h-6 text-blue-400" />
                Environment Setup
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-blue-400">Required Software</h4>
                  <div className="space-y-3">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="font-medium">Kali Linux</div>
                      <div className="text-sm text-slate-400 mb-2">Primary penetration testing OS</div>
                      <a href="https://www.kali.org/get-kali/" className="text-blue-400 hover:text-blue-300 text-sm">
                        Download Kali Linux →
                      </a>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="font-medium">VirtualBox/VMware</div>
                      <div className="text-sm text-slate-400 mb-2">Virtualization platform</div>
                      <a href="https://www.virtualbox.org/" className="text-blue-400 hover:text-blue-300 text-sm">
                        Download VirtualBox →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-400">Installation Commands</h4>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm space-y-2">
                    <div className="text-green-400"># Update system</div>
                    <div className="text-slate-300">sudo apt update && sudo apt upgrade -y</div>
                    <div className="text-green-400"># Install tools</div>
                    <div className="text-slate-300">sudo apt install nmap burpsuite-community -y</div>
                    <div className="text-green-400"># Install additional utilities</div>
                    <div className="text-slate-300">sudo apt install masscan nikto dirb -y</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Network className="w-5 h-5 text-purple-400" />
                Network Configuration
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-purple-400">Lab Network Setup</h4>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-purple-400"># Create isolated network</div>
                    <div className="text-slate-300">Network: 192.168.100.0/24</div>
                    <div className="text-slate-300">Attacker: 192.168.100.10</div>
                    <div className="text-slate-300">Target: 192.168.100.20</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-orange-400">Safety Guidelines</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      Only scan systems you own or have permission to test
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      Use isolated lab environments
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      Document all activities for learning purposes
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Targets Tab */}
        {activeTab === 'targets' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-red-400" />
                Practice Target Systems
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {targetSystems.map((target, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-red-500/50 transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">{target.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        target.difficulty === 'Beginner' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {target.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-4">{target.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-slate-400 mb-2">Services:</div>
                      <div className="flex flex-wrap gap-1">
                        {target.services.map((service, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a 
                      href={target.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                Target Setup Instructions
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-blue-400">1. Download and Import</h4>
                  <div className="font-mono text-sm text-slate-300">
                    # Import OVA file into VirtualBox<br/>
                    VBoxManage import metasploitable.ova
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-green-400">2. Network Configuration</h4>
                  <div className="font-mono text-sm text-slate-300">
                    # Set network adapter to Host-Only or Internal<br/>
                    # Ensure both attacker and target are on same network
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-purple-400">3. Start and Verify</h4>
                  <div className="font-mono text-sm text-slate-300">
                    # Start target VM and note IP address<br/>
                    # Test connectivity: ping [target-ip]
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scripts Tab */}
        {activeTab === 'scripts' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-green-400" />
                Nmap Script Categories
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {nmapScripts.map((category, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                    <h4 className="text-lg font-semibold mb-3 text-green-400">{category.category}</h4>
                    <p className="text-slate-300 text-sm mb-4">{category.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-400">Example Scripts:</div>
                      <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                        {category.scripts.map((script, idx) => (
                          <div key={idx} className="text-green-400">--script {script}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Terminal className="w-5 h-5 text-orange-400" />
                Common Nmap Commands
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-orange-400 font-medium mb-2">Basic Host Discovery</div>
                  <div className="font-mono text-sm text-green-400">nmap -sn 192.168.1.0/24</div>
                  <div className="text-slate-400 text-sm mt-1">Ping scan to discover live hosts</div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-orange-400 font-medium mb-2">Port Scanning</div>
                  <div className="font-mono text-sm text-green-400">nmap -sS -p- 192.168.1.100</div>
                  <div className="text-slate-400 text-sm mt-1">TCP SYN scan of all ports</div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-orange-400 font-medium mb-2">Service Detection</div>
                  <div className="font-mono text-sm text-green-400">nmap -sV -sC 192.168.1.100</div>
                  <div className="text-slate-400 text-sm mt-1">Version detection with default scripts</div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-orange-400 font-medium mb-2">Vulnerability Scanning</div>
                  <div className="font-mono text-sm text-green-400">nmap --script vuln 192.168.1.100</div>
                  <div className="text-slate-400 text-sm mt-1">Run vulnerability detection scripts</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Methodology Tab */}
        {activeTab === 'methodology' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Eye className="w-6 h-6 text-purple-400" />
                Scanning Methodology
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-lg font-semibold mb-2 text-purple-400">Phase 1: Reconnaissance</h4>
                  <p className="text-slate-300 mb-3">Gather information about the target without direct interaction</p>
                  <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                    <div className="text-green-400"># Passive information gathering</div>
                    <div className="text-slate-300">whois domain.com</div>
                    <div className="text-slate-300">nslookup domain.com</div>
                    <div className="text-slate-300">dig domain.com</div>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold mb-2 text-blue-400">Phase 2: Scanning</h4>
                  <p className="text-slate-300 mb-3">Active probing to identify live hosts and open ports</p>
                  <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                    <div className="text-green-400"># Host discovery</div>
                    <div className="text-slate-300">nmap -sn target_range</div>
                    <div className="text-green-400"># Port scanning</div>
                    <div className="text-slate-300">nmap -sS -p- target_ip</div>
                  </div>
                </div>
                
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-lg font-semibold mb-2 text-green-400">Phase 3: Enumeration</h4>
                  <p className="text-slate-300 mb-3">Detailed service and version identification</p>
                  <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                    <div className="text-green-400"># Service enumeration</div>
                    <div className="text-slate-300">nmap -sV -sC target_ip</div>
                    <div className="text-green-400"># OS detection</div>
                    <div className="text-slate-300">nmap -O target_ip</div>
                  </div>
                </div>
                
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="text-lg font-semibold mb-2 text-red-400">Phase 4: Vulnerability Assessment</h4>
                  <p className="text-slate-300 mb-3">Identify potential security weaknesses</p>
                  <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm">
                    <div className="text-green-400"># Vulnerability scripts</div>
                    <div className="text-slate-300">nmap --script vuln target_ip</div>
                    <div className="text-green-400"># Web application scanning</div>
                    <div className="text-slate-300">burpsuite # Manual proxy testing</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-yellow-400" />
                Documentation Template
              </h3>
              
              <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-yellow-400"># Vulnerability Scan Report</div>
                <div className="text-slate-300">Date: [DATE]</div>
                <div className="text-slate-300">Target: [IP/DOMAIN]</div>
                <div className="text-slate-300">Scanner: [TOOL USED]</div>
                <div className="text-slate-300"></div>
                <div className="text-yellow-400">## Executive Summary</div>
                <div className="text-slate-300">[Brief overview of findings]</div>
                <div className="text-slate-300"></div>
                <div className="text-yellow-400">## Methodology</div>
                <div className="text-slate-300">[Scanning approach and tools used]</div>
                <div className="text-slate-300"></div>
                <div className="text-yellow-400">## Findings</div>
                <div className="text-slate-300">### High Risk</div>
                <div className="text-slate-300">- [Vulnerability details]</div>
                <div className="text-slate-300">### Medium Risk</div>
                <div className="text-slate-300">- [Vulnerability details]</div>
                <div className="text-slate-300">### Low Risk</div>
                <div className="text-slate-300">- [Vulnerability details]</div>
                <div className="text-slate-300"></div>
                <div className="text-yellow-400">## Recommendations</div>
                <div className="text-slate-300">[Remediation steps]</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VulnScanningLab;