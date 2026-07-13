import React, { useState } from 'react';

// Common panel helper
const Card: React.FC<{ title: string; icon: string; children: React.ReactNode; colorClass?: string }> = ({ title, icon, children, colorClass = "text-primary bg-primary/10" }) => (
  <div className="glass-panel p-md rounded-xl flex flex-col h-full">
    <div className="flex items-center gap-sm mb-md">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h4 className="font-headline-md text-md text-on-surface font-bold">{title}</h4>
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

/* FAVORITES VIEW */
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

export const FavoritesDashboard: React.FC<{ projects: Project[]; toggleFavorite: (id: string) => void; setCurrentTab: (tab: string) => void }> = ({ projects, toggleFavorite, setCurrentTab }) => {
  const favoriteProjects = projects.filter(p => p.favorite);

  return (
    <div className="p-lg">
      <h2 className="font-display text-display text-on-surface mb-xs text-left">Favorite Projects</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm text-left mb-xl">
        Quick access to your starred projects and active workspaces.
      </p>

      {favoriteProjects.length === 0 ? (
        <div className="glass-panel rounded-xl p-xl flex flex-col items-center justify-center text-center py-16">
          <span className="material-symbols-outlined text-[64px] text-outline-variant mb-md">star_rate</span>
          <h3 className="font-headline-md text-[20px] mb-xs">No starred projects</h3>
          <p className="font-body-sm text-outline max-w-md">
            Click the star icon on any project in the <button onClick={() => setCurrentTab('projects')} className="text-primary hover:underline font-bold">Projects tab</button> to pin it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg text-left">
          {favoriteProjects.map(project => (
            <div key={project.id} className="glass-card rounded-xl p-md flex flex-col group h-full relative">
              <button 
                onClick={() => toggleFavorite(project.id)}
                className="absolute top-4 right-4 text-yellow-400 hover:text-outline transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </button>
              <div className="flex justify-between items-start mb-lg">
                <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-[32px]">deployed_code</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-headline-md text-[18px] text-on-surface group-hover:text-primary transition-colors">{project.name}</h3>
                <div className="flex items-center gap-sm mt-unit">
                  <span className="font-label-caps text-[10px] bg-primary/10 text-primary px-xs rounded">{project.framework}</span>
                  <span className="font-label-caps text-[10px] text-outline">{project.version}</span>
                </div>
                <p className="mt-md font-body-sm text-on-surface-variant line-clamp-2">{project.description}</p>
              </div>
              <div className="mt-lg pt-md border-t border-outline-variant/10 flex justify-between items-center text-[11px] text-outline">
                <span>{project.lastOpened}</span>
                {project.active && <span className="text-primary font-bold">● Active</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* DATABASES VIEW */
export const DatabasesDashboard: React.FC = () => {
  const dbList = [
    { name: 'nebula_prod_replica', type: 'Postgres', status: 'Healthy', size: '14.2 GB', connections: 124 },
    { name: 'astra_vector_store', type: 'Pinecone', status: 'Healthy', size: '2.8 GB', connections: 42 },
    { name: 'user_session_cache', type: 'Redis', status: 'Healthy', size: '512 MB', connections: 1045 },
  ];

  return (
    <div className="p-lg text-left">
      <h2 className="font-display text-display text-on-surface mb-xs">Databases</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm mb-xl">
        Monitor, query, and manage connected databases and vector storages.
      </p>
      
      <div className="grid grid-cols-12 gap-lg">
        <div className="col-span-12 lg:col-span-8 space-y-md">
          {dbList.map((db, idx) => (
            <div key={idx} className="glass-panel p-md rounded-xl flex items-center justify-between hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">database</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-md text-on-surface">{db.name}</h4>
                  <p className="font-body-sm text-outline text-xs">{db.type} • {db.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-xl text-right">
                <div>
                  <p className="font-label-caps text-[10px] text-outline uppercase">Active Conns</p>
                  <p className="font-code-md text-sm text-primary font-bold">{db.connections}</p>
                </div>
                <span className="px-sm py-0.5 rounded bg-green-500/10 text-green-400 font-label-caps text-[10px] border border-green-500/20">
                  {db.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-span-12 lg:col-span-4 space-y-md">
          <Card title="Quick Queries" icon="search">
            <p className="font-body-sm text-on-surface-variant mb-md">Quickly inspect rows or documents across environments.</p>
            <textarea 
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-sm font-code-md text-xs focus:ring-1 focus:ring-primary outline-none h-24 mb-md text-on-surface placeholder:text-outline-variant"
              placeholder="SELECT * FROM users WHERE active = true LIMIT 5;"
            />
            <button className="primary-gradient w-full text-white font-label-caps text-xs py-2 rounded-lg font-bold hover:opacity-90 cursor-pointer">
              Run SQL Query
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* CLOUD VIEW */
export const CloudDashboard: React.FC = () => {
  return (
    <div className="p-lg text-left">
      <h2 className="font-display text-display text-on-surface mb-xs">Cloud Deployments</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm mb-xl">
        Manage cloud clusters, serverless endpoints, and compute nodes.
      </p>

      <div className="grid grid-cols-12 gap-lg">
        <div className="col-span-12 md:col-span-4">
          <Card title="AWS EKS Cluster" icon="dns" colorClass="text-secondary bg-secondary/10">
            <div className="flex items-baseline gap-xs mt-xs">
              <span className="text-[32px] text-secondary font-bold font-display">12</span>
              <span className="text-outline text-xs">Pods running</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-sm">Region: us-east-1 (N. Virginia)</p>
            <div className="mt-md w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="w-[78%] h-full bg-secondary"></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-outline mt-xs">
              <span>CPU: 78%</span>
              <span>Memory: 5.4GB / 8GB</span>
            </div>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4">
          <Card title="Vercel Project" icon="cloud" colorClass="text-primary bg-primary/10">
            <div className="flex items-baseline gap-xs mt-xs">
              <span className="text-[32px] text-primary font-bold font-display">3</span>
              <span className="text-outline text-xs">Active domains</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-sm">Repo: developace-engine</p>
            <div className="mt-md flex items-center gap-sm">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-code-md text-xs text-on-surface truncate">developace.vercel.app</span>
            </div>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4">
          <Card title="Global Edge CDN" icon="language" colorClass="text-tertiary bg-tertiary/10">
            <div className="flex items-baseline gap-xs mt-xs">
              <span className="text-[32px] text-tertiary font-bold font-display">99.98%</span>
              <span className="text-outline text-xs">Uptime</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-sm">24 Edge nodes active</p>
            <div className="mt-md flex justify-between text-[11px] text-on-surface-variant">
              <span>Requests (24h)</span>
              <span className="font-bold text-on-surface">1.2M</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* APIS VIEW */
export const APIsDashboard: React.FC = () => {
  return (
    <div className="p-lg text-left">
      <h2 className="font-display text-display text-on-surface mb-xs">APIs Manager</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm mb-xl">
        Mock, test, and trace microservice REST & GraphQL endpoints.
      </p>

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant/30 text-label-caps text-outline text-[11px]">
              <th className="p-md">ENDPOINT</th>
              <th className="p-md">METHOD</th>
              <th className="p-md">LATENCY</th>
              <th className="p-md">STATUS</th>
              <th className="p-md text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-body-sm">
            <tr>
              <td className="p-md font-code-md text-xs">/api/v2/auth/login</td>
              <td className="p-md"><span className="bg-green-500/10 text-green-400 border border-green-500/25 px-2 py-0.5 rounded text-[11px] font-bold">POST</span></td>
              <td className="p-md">45ms</td>
              <td className="p-md"><span className="text-green-400">● 200 OK</span></td>
              <td className="p-md text-right"><button className="text-primary hover:underline text-xs cursor-pointer">Test API</button></td>
            </tr>
            <tr>
              <td className="p-md font-code-md text-xs">/api/v2/projects/list</td>
              <td className="p-md"><span className="bg-blue-500/10 text-blue-400 border border-blue-500/25 px-2 py-0.5 rounded text-[11px] font-bold">GET</span></td>
              <td className="p-md">112ms</td>
              <td className="p-md"><span className="text-green-400">● 200 OK</span></td>
              <td className="p-md text-right"><button className="text-primary hover:underline text-xs cursor-pointer">Test API</button></td>
            </tr>
            <tr>
              <td className="p-md font-code-md text-xs">/api/v2/cloud/deploy</td>
              <td className="p-md"><span className="bg-purple-500/10 text-purple-400 border border-purple-500/25 px-2 py-0.5 rounded text-[11px] font-bold">PUT</span></td>
              <td className="p-md">410ms</td>
              <td className="p-md"><span className="text-yellow-400">● 202 Accepted</span></td>
              <td className="p-md text-right"><button className="text-primary hover:underline text-xs cursor-pointer">Test API</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* PACKAGES VIEW */
export const PackagesDashboard: React.FC = () => {
  return (
    <div className="p-lg text-left">
      <h2 className="font-display text-display text-on-surface mb-xs">Packages & registries</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm mb-xl">
        Integrate local modules, npm packages, and Cargo build dependencies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <Card title="NPM Registries" icon="package_2">
          <div className="space-y-sm">
            <div className="flex justify-between items-center text-body-sm">
              <span>developace-ui</span>
              <span className="font-code-md text-xs bg-surface-container px-2 py-0.5 rounded">v1.4.12</span>
            </div>
            <div className="flex justify-between items-center text-body-sm">
              <span>developace-engine-sdk</span>
              <span className="font-code-md text-xs bg-surface-container px-2 py-0.5 rounded">v0.9.8</span>
            </div>
          </div>
          <button className="primary-gradient text-white text-xs font-label-caps w-full py-2 rounded-lg font-bold mt-lg hover:opacity-90 cursor-pointer">
            Publish New package
          </button>
        </Card>
        <Card title="Security & Audits" icon="shield" colorClass="text-secondary bg-secondary/10">
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-[48px] text-green-400">check_circle</span>
            <div>
              <p className="font-headline-md text-sm font-bold text-on-surface">0 Vulnerabilities Detected</p>
              <p className="font-body-sm text-outline text-xs">All packages match safety limits. Last audit run 3 hours ago.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

/* DOCKER VIEW */
export const DockerDashboard: React.FC = () => {
  const [containers, setContainers] = useState([
    { name: 'dev-postgres-1', image: 'postgres:15-alpine', status: 'Running', ports: '5432:5432' },
    { name: 'dev-redis-cache', image: 'redis:7.2', status: 'Running', ports: '6379:6379' },
    { name: 'developace-server', image: 'node:20', status: 'Stopped', ports: '8080:8080' },
  ]);

  const toggleContainer = (index: number) => {
    setContainers(containers.map((c, idx) => {
      if (idx === index) {
        return {
          ...c,
          status: c.status === 'Running' ? 'Stopped' : 'Running'
        };
      }
      return c;
    }));
  };

  return (
    <div className="p-lg text-left">
      <h2 className="font-display text-display text-on-surface mb-xs">Docker containers</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm mb-xl">
        Manage containerized environments, monitor logs, and restart processes.
      </p>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="px-lg py-md border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
          <h3 className="font-headline-md text-sm font-bold">Containers ({containers.filter(c=>c.status==='Running').length} running)</h3>
          <button className="primary-gradient px-md py-1 rounded text-xs text-white font-bold cursor-pointer">Prune Idle</button>
        </div>
        <div className="divide-y divide-outline-variant/10">
          {containers.map((container, idx) => (
            <div key={idx} className="p-md flex items-center justify-between hover:bg-white/5 transition-all">
              <div className="flex items-center gap-md">
                <span className={`material-symbols-outlined text-[28px] ${container.status === 'Running' ? 'text-primary' : 'text-outline-variant'}`}>
                  dock
                </span>
                <div>
                  <p className="font-body-md font-bold text-on-surface">{container.name}</p>
                  <p className="font-code-md text-xs text-outline">{container.image} • Ports: {container.ports}</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <span className={`px-sm py-0.5 rounded text-[10px] font-label-caps border ${container.status === 'Running' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {container.status}
                </span>
                <button 
                  onClick={() => toggleContainer(idx)}
                  className="text-xs bg-surface-container hover:bg-surface-bright px-md py-1 border border-outline-variant/30 text-on-surface rounded font-bold cursor-pointer"
                >
                  {container.status === 'Running' ? 'Stop' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* SETTINGS VIEW */
export const SettingsDashboard: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [devMode, setDevMode] = useState(true);

  return (
    <div className="p-lg text-left">
      <h2 className="font-display text-display text-on-surface mb-xs">Settings</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-sm mb-xl">
        Configure workspace preferences, accounts, credentials, and dark/light systems.
      </p>

      <div className="grid grid-cols-12 gap-lg">
        <div className="col-span-12 lg:col-span-6 space-y-lg">
          <Card title="Workspace Settings" icon="settings">
            <div className="space-y-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-body-md text-on-surface">Telemetry & Alerts</p>
                  <p className="font-body-sm text-outline text-xs">Send debug telemetry back to central engine.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="w-10 h-5 bg-surface-container rounded-full appearance-none border border-outline-variant checked:bg-primary relative transition-colors cursor-pointer before:absolute before:content-[''] before:w-4 before:h-4 before:bg-white before:rounded-full before:top-[1px] before:left-[1px] checked:before:translate-x-5 before:transition-transform"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-body-md text-on-surface">Developer Mode</p>
                  <p className="font-body-sm text-outline text-xs">Expose local build networks on port 5173.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={devMode} 
                  onChange={() => setDevMode(!devMode)}
                  className="w-10 h-5 bg-surface-container rounded-full appearance-none border border-outline-variant checked:bg-primary relative transition-colors cursor-pointer before:absolute before:content-[''] before:w-4 before:h-4 before:bg-white before:rounded-full before:top-[1px] before:left-[1px] checked:before:translate-x-5 before:transition-transform"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <Card title="Developer Access Token" icon="key" colorClass="text-secondary bg-secondary/10">
            <p className="font-body-sm text-on-surface-variant mb-md">
              Your system access token allows you to push commits via the CLI.
            </p>
            <div className="flex gap-sm">
              <input 
                type="password" 
                value="dpe_secret_18342084920492" 
                disabled 
                className="flex-1 bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-sm font-code-md text-xs outline-none text-on-surface"
              />
              <button 
                onClick={() => alert('Access token copied to clipboard!')}
                className="bg-surface-container hover:bg-surface-bright px-md rounded-lg font-label-caps text-xs font-bold border border-outline-variant/30 cursor-pointer"
              >
                Copy
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
