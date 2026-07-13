import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  framework: string;
  version: string;
  description: string;
  lastOpened: string;
  active?: boolean;
  favorite?: boolean;
}

interface HomeDashboardProps {
  setCurrentTab: (tab: string) => void;
  projects: Project[];
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ setCurrentTab, projects }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "developace-cli v1.0.4 initialized.",
    "Type 'help' for available commands.",
    "developace-engine ~ $ "
  ]);
  const [cmdInput, setCmdInput] = useState('');

  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cmdInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    if (cmd === 'help') {
      response = "Available commands: help, status, list, clear";
    } else if (cmd === 'status') {
      response = "System: HEALTHY | Active Node: v20.11.0 | Containers: 2 running";
    } else if (cmd === 'list') {
      response = "Projects: " + projects.map(p => p.name).join(', ');
    } else if (cmd === 'clear') {
      setTerminalLogs(["developace-engine ~ $ "]);
      setCmdInput('');
      return;
    } else {
      response = `Command not found: '${cmd}'. Type 'help' for options.`;
    }

    setTerminalLogs(prev => [
      ...prev.slice(0, -1),
      `developace-engine ~ $ ${cmdInput}`,
      response,
      "developace-engine ~ $ "
    ]);
    setCmdInput('');
  };

  return (
    <div className="p-container-padding text-left relative overflow-hidden">
      {/* Welcome Section with Glow */}
      <section className="relative py-xl">
        <div className="glow-effect -top-10 -left-10 opacity-60"></div>
        <div className="relative z-10">
          <h2 className="font-display text-display text-on-surface mb-xs">Good morning, Developer</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Your workspace is ready. You have 3 pending pull requests and 1 failing CI/CD pipeline in the{' '}
            <span className="text-primary font-bold">nebula-core</span> repository.
          </p>
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-12 gap-lg mt-md">
        
        {/* Quick Actions Section */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-md">
          <button 
            onClick={() => setCurrentTab('create-project')}
            className="glass-panel group p-lg rounded-xl flex flex-col items-center justify-center gap-md hover:border-primary transition-all duration-250 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">add_box</span>
            </div>
            <span className="font-headline-md text-lg text-on-surface">Create Project</span>
          </button>
          
          <button 
            onClick={() => alert("Cloning repositories feature: Enter a git URL in CLI terminal window or use the quick settings.")}
            className="glass-panel group p-lg rounded-xl flex flex-col items-center justify-center gap-md hover:border-primary transition-all duration-250 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">cloud_download</span>
            </div>
            <span className="font-headline-md text-lg text-on-surface">Clone Repo</span>
          </button>
          
          <button 
            onClick={() => setTerminalOpen(!terminalOpen)}
            className={`glass-panel group p-lg rounded-xl flex flex-col items-center justify-center gap-md transition-all duration-250 cursor-pointer ${terminalOpen ? 'border-primary bg-primary/5' : 'hover:border-primary'}`}
          >
            <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">terminal</span>
            </div>
            <span className="font-headline-md text-lg text-on-surface">Open Terminal</span>
          </button>
        </div>

        {/* Status Cards Column */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-md rounded-xl flex flex-col justify-center">
          <h3 className="font-label-caps text-label-caps text-outline mb-md px-sm">Environment Status</h3>
          <div className="grid grid-cols-1 gap-sm">
            <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-green-400">developer_board</span>
                <span className="font-body-md text-on-surface">Node.js</span>
              </div>
              <span className="font-code-md text-outline">v20.11.0</span>
            </div>
            
            <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-orange-400">history</span>
                <span className="font-body-md text-on-surface">Git</span>
              </div>
              <span className="font-code-md text-outline">v2.43.0</span>
            </div>
            
            <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-blue-400">dock</span>
                <span className="font-body-md text-on-surface">Docker</span>
              </div>
              <span className="font-code-md text-outline">v24.0.7</span>
            </div>
            
            <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-yellow-400">terminal</span>
                <span className="font-body-md text-on-surface">Python</span>
              </div>
              <span className="font-code-md text-outline">v3.12.1</span>
            </div>
          </div>
        </div>

        {/* Terminal Drawer (Conditional) */}
        {terminalOpen && (
          <div className="col-span-12 glass-panel rounded-xl p-md bg-[#010f1f]/95 border-primary/40 transition-all duration-300">
            <div className="flex justify-between items-center pb-xs border-b border-outline-variant/30 mb-sm">
              <div className="flex items-center gap-xs">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="font-code-md text-xs ml-sm text-outline">Interactive Dev Shell</span>
              </div>
              <button onClick={() => setTerminalOpen(false)} className="text-outline hover:text-white cursor-pointer">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="h-44 overflow-y-auto font-code-md text-xs text-primary leading-relaxed p-xs scrollbar-thin">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap">{log}</div>
              ))}
            </div>
            <form onSubmit={executeCommand} className="flex border-t border-outline-variant/20 pt-sm mt-sm">
              <span className="font-code-md text-xs text-primary mr-xs select-none">developace-engine ~ $</span>
              <input
                type="text"
                value={cmdInput}
                onChange={e => setCmdInput(e.target.value)}
                className="flex-1 bg-transparent outline-none border-none font-code-md text-xs text-white"
                placeholder="type help, status, list, clear..."
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Activity Timeline */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-lg rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-lg">
              <h3 className="font-headline-md text-lg text-on-surface">Activity</h3>
              <button onClick={() => alert("Activity history is up to date.")} className="text-primary font-label-caps hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-lg relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-outline-variant/30">
              <div className="relative pl-8 flex flex-col gap-xs">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="font-body-md text-on-surface">Created <span className="font-bold">React Project</span></p>
                <p className="font-body-sm text-outline">Just now • nebula-dashboard</p>
              </div>
              
              <div className="relative pl-8 flex flex-col gap-xs">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                </div>
                <p className="font-body-md text-on-surface">Git Commit <span className="font-bold">feat: auth overhaul</span></p>
                <p className="font-body-sm text-outline">2 hours ago • api-gateway</p>
              </div>
              
              <div className="relative pl-8 flex flex-col gap-xs">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-tertiary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                </div>
                <p className="font-body-md text-on-surface">Merged PR <span className="font-bold">#412</span></p>
                <p className="font-body-sm text-outline">Yesterday • documentation</p>
              </div>
              
              <div className="relative pl-8 flex flex-col gap-xs opacity-50">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-outline/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-outline"></div>
                </div>
                <p className="font-body-md text-on-surface">Deployed to <span className="font-bold">Staging</span></p>
                <p className="font-body-sm text-outline">Oct 12, 11:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Projects Grid */}
        <div className="col-span-12 lg:col-span-8 space-y-md">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-lg text-on-surface">Pinned Projects</h3>
            <div className="flex gap-sm">
              <button 
                onClick={() => setCurrentTab('projects')}
                className="p-1 hover:bg-surface-container-high rounded transition-colors text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {projects.slice(0, 4).map((project, idx) => {
              // Custom tags matching the mockups
              const statusTags = [
                { text: 'Active', classes: 'bg-green-500/10 text-green-400 border border-green-500/20' },
                { text: 'Idle', classes: 'bg-outline-variant/30 text-outline border border-outline-variant/20' },
                { text: 'Deploying', classes: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' },
                { text: 'Critical', classes: 'bg-red-500/10 text-red-400 border border-red-500/20' },
              ];
              const tag = statusTags[idx % statusTags.length];
              const symbolIcons = ['polymer', 'data_object', 'auto_awesome', 'storage'];
              const icon = symbolIcons[idx % symbolIcons.length];
              const colorClasses = ['text-primary', 'text-secondary', 'text-tertiary', 'text-error'];
              const colorClass = colorClasses[idx % colorClasses.length];

              return (
                <div 
                  key={project.id} 
                  onClick={() => setCurrentTab('projects')}
                  className="glass-panel p-md rounded-xl hover:border-primary transition-all duration-250 cursor-pointer group text-left"
                >
                  <div className="flex items-start justify-between mb-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className={`material-symbols-outlined ${colorClass}`}>{icon}</span>
                    </div>
                    <span className={`font-label-caps text-[10px] px-2 py-0.5 rounded ${tag.classes}`}>
                      {tag.text}
                    </span>
                  </div>
                  <h4 className="font-headline-md text-md mb-xs text-on-surface group-hover:text-primary transition-all">
                    {project.name}
                  </h4>
                  <p className="font-body-sm text-outline mb-md line-clamp-1">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-md">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-surface bg-surface-container-high overflow-hidden">
                        <img className="w-full h-full object-cover" alt="user" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnJMA-5qZG8gjlJLYmaMIGZnNpWdyxPa6rsSuRt_uoy0UiB9Laqw9cwdqguFV5-UZmTLUWqlKn4RdJzbo7aLQtIf4scl1E2r_g-2oCYnwkWnBBHqsq39-gI2Gj7v2vFhc_2G_shq4l91uzcHQEoCQ9NrqZCQakyPyUgZ5KAxgIjEI6iOKmMgMHafuWlbflV0Yndh7BRTkAXTI6mRtP9McXM1X4D_5At4Ot_3tgAHK4UGKV5wlpWh2ISlatfRSyvMdVA398X5_XHA" />
                      </div>
                    </div>
                    <span className="font-body-sm text-outline text-xs">Updated {project.lastOpened}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
