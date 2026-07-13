import React, { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentTab: (tab: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  setCurrentTab,
  theme,
  setTheme,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Merge Conflict detected in developace-engine", read: false },
    { id: 2, text: "3 pull requests pending review", read: false },
    { id: 3, text: "Build #1042 successfully deployed to staging", read: true },
  ]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('dark');
      setTheme('light');
    } else {
      root.classList.add('dark');
      setTheme('dark');
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-var(--sidebar-width))] h-16 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/20 flex items-center justify-between px-lg z-40">
      <div className="flex items-center gap-lg flex-1">
        <div className="relative w-full max-w-md group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-2 pl-10 pr-4 text-body-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all outline-none text-on-surface placeholder:text-outline-variant"
            placeholder="Search projects, repositories, or tabs..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-md">
        <button 
          onClick={() => setCurrentTab('projects')}
          className="flex items-center gap-sm px-md py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary transition-all text-body-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          Quick Actions
        </button>

        <div className="flex items-center gap-sm px-2 border-l border-outline-variant/20 ml-2 relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-on-surface-variant hover:text-primary transition-all relative cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 glass-panel rounded-xl shadow-2xl p-md z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex justify-between items-center mb-sm pb-xs border-b border-outline-variant/20">
                <span className="font-label-caps text-label-caps text-on-surface">Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] text-primary hover:underline font-bold"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div className="space-y-sm max-h-60 overflow-y-auto">
                {notifications.map(n => (
                  <div 
                    key={n.id} 
                    className={`p-xs rounded text-body-sm text-left transition-colors ${n.read ? 'opacity-60 hover:bg-white/5' : 'bg-primary/5 border-l-2 border-primary'}`}
                  >
                    {n.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={toggleTheme}
            className="p-2 text-on-surface-variant hover:text-primary transition-all cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            <span className="material-symbols-outlined">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
