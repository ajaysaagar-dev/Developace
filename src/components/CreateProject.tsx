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

interface CreateProjectProps {
  addProject: (project: Omit<Project, 'id' | 'lastOpened'>) => void;
  setCurrentTab: (tab: string) => void;
}

interface Framework {
  name: string;
  arch: string;
  env: string;
  port: string;
  icon: string;
  color: string;
  description: string;
  recommended?: boolean;
}

const frameworks: Framework[] = [
  { name: 'React', arch: 'Vite/SPA', env: 'Browser', port: '5173', icon: 'architecture', color: '#00D8FF', description: 'Industry standard for building interactive UIs. Comes pre-configured with Vite & Tailwind.', recommended: true },
  { name: 'Next.js', arch: 'SSR/Static', env: 'Node/Edge', port: '3000', icon: 'bolt', color: '#FFFFFF', description: 'The React Framework for the Web. Optimized for SEO, speed, and developer experience.', recommended: true },
  { name: 'Electron', arch: 'Chromium/Node', env: 'Native', port: 'Variable', icon: 'desktop_windows', color: '#9FEAF9', description: 'Build cross-platform desktop apps with web technologies. Integrated with Forge.' },
  { name: 'Node.js', arch: 'Backend', env: 'Runtime', port: '8080', icon: 'dns', color: '#68A063', description: 'Scalable server-side applications. Pre-built templates for Express and Fastify.' },
  { name: 'Flutter', arch: 'Skia/Dart', env: 'Native/Web', port: 'Any', icon: 'smartphone', color: '#47C5FB', description: 'Google’s UI toolkit for building natively compiled mobile, web, and desktop apps.' },
  { name: 'Unity', arch: 'Mono/IL2CPP', env: 'Engine', port: 'N/A', icon: 'sports_esports', color: '#EAEAEA', description: 'Comprehensive platform for creating 2D, 3D, VR, and AR interactive experiences.' }
];

export const CreateProject: React.FC<CreateProjectProps> = ({ addProject, setCurrentTab }) => {
  const [step, setStep] = useState(1);
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);
  
  // Step 2 Form States
  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projVersion, setProjVersion] = useState('1.0.0');

  // Step 3 Form States
  const [installTailwind, setInstallTailwind] = useState(true);
  const [useTypeScript, setUseTypeScript] = useState(true);
  const [initGit, setInitGit] = useState(true);

  // Step 4 Simulation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleNext = () => {
    if (step === 1 && selectedFramework) {
      // Default project name based on framework
      if (!projName) {
        setProjName(`${selectedFramework.name.toLowerCase()}-app-core`);
      }
      setStep(2);
    } else if (step === 2) {
      if (!projName.trim()) {
        alert('Please enter a project name.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
      simulateGeneration();
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 4) {
      setStep(step - 1);
    }
  };

  const simulateGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleFinish = () => {
    if (selectedFramework) {
      addProject({
        name: projName,
        framework: selectedFramework.name,
        version: `v${projVersion}`,
        description: projDesc || `Production-ready ${selectedFramework.name} application template.`,
        active: false,
        favorite: false,
      });
      setCurrentTab('projects');
    }
  };

  return (
    <div className="p-xl text-left select-none pb-28">
      <div className="flex flex-col lg:flex-row gap-xl relative">
        {/* Main interactive form card */}
        <div className="flex-1">
          <div className="mb-xl">
            <h1 className="font-display text-display text-on-surface">Create New Project</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm">
              Generate production-ready projects with just a few clicks. Select, customize, and deploy.
            </p>
          </div>

          {/* STEP 1: SELECT FRAMEWORK */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              {frameworks.map(fw => {
                const isSelected = selectedFramework?.name === fw.name;
                return (
                  <div
                    key={fw.name}
                    onClick={() => setSelectedFramework(fw)}
                    className={`framework-card glass-panel p-lg rounded-xl cursor-pointer group relative overflow-hidden transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/15 scale-[1.02]' 
                        : 'hover:border-primary/50'
                    }`}
                  >
                    {fw.recommended && (
                      <div className="absolute top-4 right-4">
                        <span className="px-sm py-0.5 bg-primary/20 text-primary font-label-caps text-[10px] rounded-full border border-primary/30">
                          RECOMMENDED
                        </span>
                      </div>
                    )}
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-md group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${fw.color}15` }}
                    >
                      <span className="material-symbols-outlined !text-3xl" style={{ color: fw.color }}>
                        {fw.icon}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{fw.name}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {fw.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 2: PROJECT DETAILS */}
          {step === 2 && (
            <div className="glass-panel p-lg rounded-xl space-y-lg max-w-xl animate-in fade-in slide-in-from-left-4 duration-300">
              <h3 className="font-headline-md text-headline-md text-primary mb-md">Project Metadata</h3>
              
              <div className="flex flex-col gap-xs">
                <label className="font-label-caps text-label-caps text-outline uppercase">Project Name *</label>
                <input
                  type="text"
                  value={projName}
                  onChange={e => setProjName(e.target.value)}
                  className="bg-surface-container border border-outline-variant/30 rounded-lg p-md font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g. nebula-frontend"
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-caps text-label-caps text-outline uppercase">Description</label>
                <textarea
                  value={projDesc}
                  onChange={e => setProjDesc(e.target.value)}
                  className="bg-surface-container border border-outline-variant/30 rounded-lg p-md font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all h-24"
                  placeholder="Describe your workspace project..."
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-caps text-label-caps text-outline uppercase">Initial Version</label>
                <input
                  type="text"
                  value={projVersion}
                  onChange={e => setProjVersion(e.target.value)}
                  className="bg-surface-container border border-outline-variant/30 rounded-lg p-md font-code-md text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all max-w-[150px]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: OPTIONS & PRESETS */}
          {step === 3 && (
            <div className="glass-panel p-lg rounded-xl space-y-lg max-w-xl animate-in fade-in slide-in-from-left-4 duration-300">
              <h3 className="font-headline-md text-headline-md text-primary mb-md">Tailwind & Tooling presets</h3>
              
              <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
                <div>
                  <p className="font-body-md text-on-surface font-bold">Use TypeScript</p>
                  <p className="font-body-sm text-outline text-xs">Enable static type checking and compile validations.</p>
                </div>
                <input
                  type="checkbox"
                  checked={useTypeScript}
                  onChange={() => setUseTypeScript(!useTypeScript)}
                  className="w-10 h-5 bg-surface-container rounded-full appearance-none border border-outline-variant checked:bg-primary relative transition-colors cursor-pointer before:absolute before:content-[''] before:w-4 before:h-4 before:bg-white before:rounded-full before:top-[1px] before:left-[1px] checked:before:translate-x-5 before:transition-transform"
                />
              </div>

              <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
                <div>
                  <p className="font-body-md text-on-surface font-bold">Install Tailwind CSS</p>
                  <p className="font-body-sm text-outline text-xs">Inject modern utility styling presets directly.</p>
                </div>
                <input
                  type="checkbox"
                  checked={installTailwind}
                  onChange={() => setInstallTailwind(!installTailwind)}
                  className="w-10 h-5 bg-surface-container rounded-full appearance-none border border-outline-variant checked:bg-primary relative transition-colors cursor-pointer before:absolute before:content-[''] before:w-4 before:h-4 before:bg-white before:rounded-full before:top-[1px] before:left-[1px] checked:before:translate-x-5 before:transition-transform"
                />
              </div>

              <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
                <div>
                  <p className="font-body-md text-on-surface font-bold">Initialize Git Repository</p>
                  <p className="font-body-sm text-outline text-xs">Set up a local git hub directory with basic branch configuration.</p>
                </div>
                <input
                  type="checkbox"
                  checked={initGit}
                  onChange={() => setInitGit(!initGit)}
                  className="w-10 h-5 bg-surface-container rounded-full appearance-none border border-outline-variant checked:bg-primary relative transition-colors cursor-pointer before:absolute before:content-[''] before:w-4 before:h-4 before:bg-white before:rounded-full before:top-[1px] before:left-[1px] checked:before:translate-x-5 before:transition-transform"
                />
              </div>
            </div>
          )}

          {/* STEP 4: PROGRESS SIMULATOR & COMPLETE SUCCESS SCREEN */}
          {step === 4 && (
            <div className="glass-panel p-xl rounded-xl max-w-xl text-center flex flex-col items-center justify-center min-h-[350px] animate-in zoom-in duration-300">
              {isGenerating ? (
                <>
                  <div className="w-16 h-16 rounded-full border-4 border-outline-variant/30 border-t-primary animate-spin mb-md"></div>
                  <h3 className="font-headline-md text-xl mb-xs">Generating project resources...</h3>
                  <p className="font-body-sm text-outline mb-md">Wiring packages, configuring typescript formats</p>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden max-w-xs">
                    <div className="bg-primary h-full transition-all duration-300" style={{ width: `${generationProgress}%` }}></div>
                  </div>
                  <span className="font-code-md text-[12px] text-primary mt-sm">{generationProgress}%</span>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-md scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <h3 className="font-headline-md text-[24px] text-on-surface mb-xs font-bold">Project Initialized!</h3>
                  <p className="font-body-sm text-outline max-w-sm mb-lg">
                    Workspace folder <span className="text-primary font-bold">{projName}</span> successfully created on local device node.
                  </p>

                  <div className="w-full text-left bg-surface-container-low border border-outline-variant/20 rounded-xl p-md space-y-xs max-w-sm mb-xl">
                    <div className="flex items-center gap-sm text-body-sm text-outline">
                      <span className="material-symbols-outlined text-green-400 text-sm">done</span>
                      <span>TypeScript template compiled</span>
                    </div>
                    {installTailwind && (
                      <div className="flex items-center gap-sm text-body-sm text-outline">
                        <span className="material-symbols-outlined text-green-400 text-sm">done</span>
                        <span>Tailwind CSS configuration ready</span>
                      </div>
                    )}
                    {initGit && (
                      <div className="flex items-center gap-sm text-body-sm text-outline">
                        <span className="material-symbols-outlined text-green-400 text-sm">done</span>
                        <span>Git repo initialized (main branch)</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleFinish}
                    className="primary-gradient text-white font-label-caps text-xs px-xl py-3 rounded-lg font-bold hover:opacity-90 shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    Go to Projects Dashboard
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Project Summary sidebar card */}
        <div className="w-80 shrink-0">
          <div className="sticky top-24 glass-panel p-lg rounded-xl">
            <h4 className="font-headline-md text-headline-md text-on-surface mb-md">Project Summary</h4>
            <div className="space-y-lg">
              {selectedFramework ? (
                <div className="flex items-center gap-md p-md rounded-lg bg-primary/10 border border-primary/20 animate-in fade-in duration-300">
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center" 
                    style={{ backgroundColor: `${selectedFramework.color}20` }}
                  >
                    <span className="material-symbols-outlined !text-xl" style={{ color: selectedFramework.color }}>
                      {selectedFramework.icon}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md font-bold text-primary">{selectedFramework.name}</span>
                    <span className="text-[10px] text-outline uppercase tracking-wider">Framework Selected</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-md p-md rounded-lg bg-surface-container-low border border-dashed border-outline-variant/30">
                  <span className="material-symbols-outlined text-outline">help_outline</span>
                  <span className="font-body-sm text-body-sm text-outline">No framework selected</span>
                </div>
              )}

              <div className="pt-lg border-t border-outline-variant/20 space-y-md">
                <div className="flex justify-between items-center text-body-sm">
                  <span className="text-on-surface-variant">Architecture</span>
                  <span className="font-code-md text-code-md text-primary">
                    {selectedFramework ? selectedFramework.arch : '--'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-body-sm">
                  <span className="text-on-surface-variant">Environment</span>
                  <span className="font-code-md text-code-md text-primary">
                    {selectedFramework ? selectedFramework.env : '--'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-body-sm">
                  <span className="text-on-surface-variant">Default Port</span>
                  <span className="font-code-md text-code-md text-primary">
                    {selectedFramework ? selectedFramework.port : '--'}
                  </span>
                </div>
                {projName && (
                  <div className="flex justify-between items-center text-body-sm border-t border-outline-variant/10 pt-md">
                    <span className="text-on-surface-variant">Project Name</span>
                    <span className="font-code-md text-xs text-secondary truncate max-w-[150px]">
                      {projName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-xl">
              <div className="flex items-center gap-xs mb-md">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="font-label-caps text-[10px] text-tertiary">
                  STEP {step} OF 4
                </span>
              </div>
              <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                <div 
                  className="h-full primary-gradient transition-all duration-300" 
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Footer Controls */}
      {step < 4 && (
        <footer className="fixed bottom-0 right-0 w-[calc(100%-var(--sidebar-width))] h-16 glass-panel border-t border-outline-variant/20 flex items-center justify-between px-lg z-40">
          <div className="flex items-center gap-md">
            <span className="font-label-caps text-label-caps text-secondary">
              v1.0.4 • System Healthy • main
            </span>
          </div>
          <div className="flex items-center gap-md">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-lg py-1.5 rounded-lg font-body-md text-body-md text-on-surface hover:text-primary transition-colors cursor-pointer border border-outline-variant/30"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (confirm('Cancel project wizard configuration?')) {
                  setCurrentTab('projects');
                }
              }}
              className="px-lg py-1.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              disabled={step === 1 && !selectedFramework}
              className={`px-xl py-2 primary-gradient rounded-lg font-body-md text-body-md text-white font-bold transition-all shadow-lg cursor-pointer ${
                step === 1 && !selectedFramework 
                  ? 'opacity-40 cursor-not-allowed shadow-none' 
                  : 'hover:shadow-primary/40 hover:-translate-y-0.5'
              }`}
            >
              {step === 3 ? 'Generate Workspace' : 'Next'}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};
