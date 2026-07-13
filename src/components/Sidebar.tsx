import React from 'react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  category?: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'projects', label: 'Projects', icon: 'folder_open' },
  { id: 'favorites', label: 'Favorites', icon: 'star' },
  
  { id: 'databases', label: 'Databases', icon: 'database', category: 'RESOURCES' },
  { id: 'cloud', label: 'Cloud', icon: 'cloud', category: 'RESOURCES' },
  { id: 'apis', label: 'APIs', icon: 'api', category: 'RESOURCES' },
  { id: 'packages', label: 'Packages', icon: 'package_2', category: 'RESOURCES' },
  
  { id: 'docker', label: 'Docker', icon: 'dock', category: 'INFRASTRUCTURE' },
  { id: 'git', label: 'Git', icon: 'alt_route', category: 'INFRASTRUCTURE' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  // Render items grouped by categories
  const renderNavItems = () => {
    let lastCategory = '';
    return navItems.map((item) => {
      const isCategoryChange = item.category && item.category !== lastCategory;
      if (item.category) {
        lastCategory = item.category;
      }

      const isActive = currentTab === item.id;
      const baseClass = "flex items-center gap-md px-md py-sm rounded-lg transition-all duration-250 ease-out cursor-pointer font-body-md text-left w-full";
      const activeClass = "text-primary font-bold border-l-2 border-primary bg-primary/10";
      const inactiveClass = "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high";

      return (
        <React.Fragment key={item.id}>
          {isCategoryChange && (
            <div className="pt-md pb-xs px-md font-label-caps text-label-caps text-outline uppercase tracking-wider select-none">
              {item.category}
            </div>
          )}
          <button
            onClick={() => setCurrentTab(item.id)}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
          >
            <span 
              className="material-symbols-outlined" 
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        </React.Fragment>
      );
    });
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width border-r border-outline-variant/20 flex flex-col py-md bg-surface z-50">
      <div className="px-lg mb-xl">
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white !text-[20px]">terminal</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Developace</h1>
        </div>
        <p className="text-on-surface-variant font-label-caps text-label-caps opacity-70 mt-unit">Premium Dev Hub</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-sm no-scrollbar">
        {renderNavItems()}
      </nav>

      <div className="mt-auto px-md pt-md border-t border-outline-variant/20 flex items-center gap-md">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden border border-outline-variant/30">
          <img 
            className="w-full h-full object-cover" 
            alt="Alex Chen Profile" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCogJqxbu1GeifRUywbA073NYvdvNuJM0v8IktIVI5i3UFs2leUxEVEwOYp7BOPWlJkmetoTGpoN05-fImb5k8-kuEBqtLGh9--vWZkcpMJMI7-PCYbcHMdA65L8JQuzqd4yKxXwM3Hg5t740DnaOXI8bJQgDHBta9sr58ZdAVRVq_8cjX2mrU0iwQgKtq9XBTM3jgXK_ARfIwKm_-E1x_y6IPnVL6feAwt6BAbLQqZPbpnvKS67ZaNRY0C5PcWvAd84gL3okayQ"
          />
        </div>
        <div>
          <p className="font-body-md font-bold text-on-surface">Alex Chen</p>
          <p className="text-label-caps text-on-surface-variant opacity-70">Sr. Architect • Pro Tier</p>
        </div>
      </div>
    </aside>
  );
};
