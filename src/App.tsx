import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { ProjectsDashboard } from './components/ProjectsDashboard';
import { CreateProject } from './components/CreateProject';
import { GitManager } from './components/GitManager';
import {
  FavoritesDashboard,
  DatabasesDashboard,
  CloudDashboard,
  APIsDashboard,
  PackagesDashboard,
  DockerDashboard,
  SettingsDashboard,
} from './components/Placeholders';

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

const initialProjects: Project[] = [
  {
    id: 'astra-core',
    name: 'Astra Cloud Core',
    framework: 'React',
    version: 'v2.4.0',
    description: 'Next-gen infrastructure management dashboard with real-time analytics.',
    lastOpened: '2m ago',
    active: true,
    favorite: true,
  },
  {
    id: 'pyforge-engine',
    name: 'PyForge Engine',
    framework: 'Python',
    version: 'v1.12.0',
    description: 'High-performance data processing pipeline for ML model training.',
    lastOpened: '2h ago',
    active: false,
    favorite: false,
  },
  {
    id: 'oxide-runtime',
    name: 'Oxide Runtime',
    framework: 'Rust',
    version: 'v0.8.2-alpha',
    description: 'Safe and blazing fast WASM execution environment for edge computing.',
    lastOpened: 'Yesterday',
    active: true,
    favorite: false,
  },
  {
    id: 'swift-pulse',
    name: 'Swift Pulse',
    framework: 'Mobile',
    version: 'v4.0.1',
    description: 'Mobile companion app for health tracking and live diagnostics.',
    lastOpened: '3 days ago',
    active: false,
    favorite: true,
  },
  {
    id: 'vector-store',
    name: 'Vector Store Pro',
    framework: 'SQL',
    version: 'v1.0.0',
    description: 'Relational database wrapper for high-concurrency enterprise apps.',
    lastOpened: 'Oct 12',
    active: false,
    favorite: false,
  },
];

function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [mergeConflictResolved, setMergeConflictResolved] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Handlers
  const addProject = (newProj: Omit<Project, 'id' | 'lastOpened'>) => {
    const project: Project = {
      ...newProj,
      id: `proj-${Date.now()}`,
      lastOpened: 'Just now',
    };
    setProjects(prev => [project, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === id) {
          return { ...p, favorite: !p.favorite };
        }
        return p;
      })
    );
  };

  // Render correct dashboard component
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeDashboard 
            setCurrentTab={setCurrentTab} 
            projects={projects} 
          />
        );
      case 'projects':
        return (
          <ProjectsDashboard
            projects={projects}
            toggleFavorite={toggleFavorite}
            deleteProject={deleteProject}
            setCurrentTab={setCurrentTab}
            searchQuery={searchQuery}
          />
        );
      case 'create-project':
        return (
          <CreateProject 
            addProject={addProject} 
            setCurrentTab={setCurrentTab} 
          />
        );
      case 'git':
        return (
          <GitManager
            mergeConflictResolved={mergeConflictResolved}
            setMergeConflictResolved={setMergeConflictResolved}
          />
        );
      case 'favorites':
        return (
          <FavoritesDashboard
            projects={projects}
            toggleFavorite={toggleFavorite}
            setCurrentTab={setCurrentTab}
          />
        );
      case 'databases':
        return <DatabasesDashboard />;
      case 'cloud':
        return <CloudDashboard />;
      case 'apis':
        return <APIsDashboard />;
      case 'packages':
        return <PackagesDashboard />;
      case 'docker':
        return <DockerDashboard />;
      case 'settings':
        return <SettingsDashboard />;
      default:
        return <HomeDashboard setCurrentTab={setCurrentTab} projects={projects} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface select-none">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
      />

      {/* Main Panel Content Canvas */}
      <div className="ml-[var(--spacing-sidebar-width)] flex flex-col min-h-screen">
        
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentTab={setCurrentTab}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Content Body */}
        <main className="flex-1 pt-16 pb-12">
          {renderTabContent()}
        </main>

        {/* Fixed Footer Status Bar (Only render standard footer if stepper controls are not displaying in wizard) */}
        {currentTab !== 'create-project' && (
          <footer className="fixed bottom-0 right-0 w-[calc(100%-var(--sidebar-width))] h-8 bg-surface-container-lowest border-t border-outline-variant/20 flex items-center justify-between px-md z-40">
            <div className="flex items-center gap-md">
              <span className="font-label-caps text-secondary flex items-center gap-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                System Healthy
              </span>
              <span className="font-label-caps text-outline">v1.0.4 • main</span>
            </div>
            <div className="flex items-center gap-md">
              <a 
                onClick={(e) => { e.preventDefault(); alert("Refer to local repository documentation."); }}
                className="font-label-caps text-outline hover:text-on-surface transition-colors cursor-pointer"
                href="#docs"
              >
                Docs
              </a>
              <a 
                onClick={(e) => { e.preventDefault(); alert("Contacting Developace premium support..."); }}
                className="font-label-caps text-outline hover:text-on-surface transition-colors cursor-pointer"
                href="#support"
              >
                Support
              </a>
              <a 
                onClick={(e) => { e.preventDefault(); alert("Developace v1.0.4 Changelog: - Tailwind v4 integration - Bento grids widgets"); }}
                className="font-label-caps text-outline hover:text-on-surface transition-colors cursor-pointer"
                href="#changelog"
              >
                Changelog
              </a>
            </div>
          </footer>
        )}

      </div>
    </div>
  );
}

export default App;
