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

interface ProjectsDashboardProps {
  projects: Project[];
  toggleFavorite: (id: string) => void;
  deleteProject: (id: string) => void;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
}

export const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({
  projects,
  toggleFavorite,
  deleteProject,
  setCurrentTab,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'REACT', 'PYTHON', 'NODE', 'RUST', 'MOBILE', 'SQL'];

  // Filter projects by category & search query
  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'ALL' || p.framework.toUpperCase() === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.framework.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFrameworkDetails = (framework: string) => {
    switch (framework.toUpperCase()) {
      case 'REACT':
        return { icon: 'architecture', colorClass: 'text-[#00D8FF] bg-[#00D8FF]/10 border-[#00D8FF]/20' };
      case 'PYTHON':
        return { icon: 'science', colorClass: 'text-[#ffd343] bg-[#ffd343]/10 border-[#ffd343]/20' };
      case 'RUST':
        return { icon: 'deployed_code', colorClass: 'text-error bg-error/10 border-error/20' };
      case 'NODE':
      case 'NODE.JS':
        return { icon: 'dns', colorClass: 'text-[#68A063] bg-[#68A063]/10 border-[#68A063]/20' };
      case 'MOBILE':
        return { icon: 'smartphone', colorClass: 'text-[#7bd0ff] bg-[#7bd0ff]/10 border-[#7bd0ff]/20' };
      default:
        return { icon: 'database', colorClass: 'text-outline bg-outline-variant/20 border-outline-variant/30' };
    }
  };

  return (
    <div className="p-lg text-left">
      {/* Dashboard Header */}
      <div className="py-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-display text-display text-on-surface">Your Projects</h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mt-unit">
            Manage and deploy your high-performance applications from a single dashboard.
          </p>
        </div>
        <div className="flex gap-sm items-center flex-wrap">
          <div className="flex bg-surface-container p-unit rounded-lg border border-outline-variant/20 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-sm py-xs rounded font-label-caps text-[10px] uppercase cursor-pointer transition-colors ${selectedCategory === cat ? 'bg-primary-container text-white' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setCurrentTab('create-project')}
            className="primary-gradient text-white px-md py-2 rounded-lg font-label-caps text-xs flex items-center gap-xs hover:shadow-lg hover:shadow-primary/20 transition-all font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Project
          </button>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
        {filteredProjects.map(project => {
          const details = getFrameworkDetails(project.framework);
          return (
            <div key={project.id} className="glass-card rounded-xl p-md flex flex-col group h-full relative">
              
              {/* Star toggle top right */}
              <button 
                onClick={() => toggleFavorite(project.id)}
                className={`absolute top-4 right-16 cursor-pointer hover:scale-115 transition-transform ${project.favorite ? 'text-yellow-400' : 'text-outline-variant hover:text-primary'}`}
              >
                <span className="material-symbols-outlined text-[20px]" style={project.favorite ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  star
                </span>
              </button>

              <div className="flex justify-between items-start mb-lg">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${details.colorClass}`}>
                  <span className="material-symbols-outlined text-[32px]">{details.icon}</span>
                </div>
                <div className="flex gap-xs">
                  <button 
                    onClick={() => alert(`Starting terminal for: ${project.name}`)}
                    className="p-xs text-outline hover:text-primary transition-colors cursor-pointer"
                    title="Open terminal"
                  >
                    <span className="material-symbols-outlined text-[20px]">terminal</span>
                  </button>
                  <button 
                    onClick={() => alert(`Configuring: ${project.name}`)}
                    className="p-xs text-outline hover:text-primary transition-colors cursor-pointer"
                    title="Configure settings"
                  >
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${project.name}?`)) {
                        deleteProject(project.id);
                      }
                    }}
                    className="p-xs text-outline hover:text-error transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-headline-md text-[18px] text-on-surface group-hover:text-primary transition-colors truncate">
                  {project.name}
                </h3>
                <div className="flex items-center gap-sm mt-unit">
                  <span className="font-label-caps text-[10px] bg-primary/10 text-primary px-xs rounded">
                    {project.framework}
                  </span>
                  <span className="font-label-caps text-[10px] text-outline">
                    {project.version}
                  </span>
                </div>
                <p className="mt-md font-body-sm text-on-surface-variant line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="mt-lg pt-md border-t border-outline-variant/10 flex justify-between items-center text-[11px] text-outline">
                <span>Last opened: {project.lastOpened}</span>
                {project.active && <span className="text-green-400 font-bold">● Active</span>}
              </div>

            </div>
          );
        })}

        {/* Create new project card shortcut */}
        <div 
          onClick={() => setCurrentTab('create-project')}
          className="glass-card rounded-xl p-md flex flex-col group h-full border-dashed border-outline-variant/50 bg-transparent hover:bg-surface-container-low cursor-pointer min-h-[190px]"
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center py-xl">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-outline-variant/50 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-outline group-hover:text-primary">add_circle</span>
            </div>
            <div className="font-headline-md text-[16px] text-on-surface-variant">Bootstrap New Project</div>
            <p className="font-body-sm text-[12px] text-outline mt-unit">Quickly spin up a template</p>
          </div>
        </div>
      </div>
    </div>
  );
};
