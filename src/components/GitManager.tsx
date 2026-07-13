import React, { useState } from 'react';

interface Commit {
  sha: string;
  msg: string;
  author: string;
  avatar: string;
  time: string;
  icon: string;
  iconClass: string;
  diffs: {
    filepath: string;
    additions: number;
    deletions: number;
    lines: Array<{ num: string; text: string; type: 'added' | 'deleted' | 'normal' }>;
  }[];
}

interface GitManagerProps {
  mergeConflictResolved: boolean;
  setMergeConflictResolved: (resolved: boolean) => void;
}

const mockCommits: Commit[] = [
  {
    sha: 'f2a8c1e',
    msg: 'feat: implement bento grid layout',
    author: 'Alex Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCogJqxbu1GeifRUywbA073NYvdvNuJM0v8IktIVI5i3UFs2leUxEVEwOYp7BOPWlJkmetoTGpoN05-fImb5k8-kuEBqtLGh9--vWZkcpMJMI7-PCYbcHMdA65L8JQuzqd4yKxXwM3Hg5t740DnaOXI8bJQgDHBta9sr58ZdAVRVq_8cjX2mrU0iwQgKtq9XBTM3jgXK_ARfIwKm_-E1x_y6IPnVL6feAwt6BAbLQqZPbpnvKS67ZaNRY0C5PcWvAd84gL3okayQ',
    time: '8m ago',
    icon: 'commit',
    iconClass: 'bg-primary text-on-primary',
    diffs: [
      {
        filepath: 'src/components/Navigation.tsx',
        additions: 12,
        deletions: 4,
        lines: [
          { num: '12', text: "import { useSidebar } from '@/hooks/use-sidebar';", type: 'normal' },
          { num: '13', text: "import { Button } from './ui/button';", type: 'normal' },
          { num: '-14', text: "const oldLayout = \"flex flex-row\";", type: 'deleted' },
          { num: '+14', text: "const currentLayout = \"grid grid-cols-12 gap-lg\";", type: 'added' },
          { num: '+15', text: "const isActive = useActivePath();", type: 'added' },
          { num: '16', text: " ", type: 'normal' },
          { num: '17', text: "export function Navigation() {", type: 'normal' },
          { num: '18', text: "  return (", type: 'normal' },
          { num: '+19', text: "    <div className={currentLayout}>", type: 'added' },
          { num: '+20', text: "      {isActive && <ActiveIndicator />}", type: 'added' },
          { num: '21', text: "      <SideNav items={NAV_ITEMS} />", type: 'normal' },
        ]
      }
    ]
  },
  {
    sha: '99d211b',
    msg: 'fix: resolved hydration mismatch in header',
    author: 'Sarah Jin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANB3UBnfxcMcYItmPGu3ZaOvuClS1Jey5NUrDgpbMEN_PYoBA8LmT83cZqVgoS6B2ou6oeyIcLRNVNB9jbxe1N5Mkp2Jk616Qklv7LD1DNcBMgtztiQbigVkEhyxUbdws92THnCt660cYksURRGtObFvUvpaCVpY00X6b3yiFrNKnjSURo2mEq0wpKK4SiV3RREKr73oa6PcuIsc7xtA54sGXWxahOt0nZJidKC1Aw4t02Pwz1tEnLaNG_bGhwdI_wObXjeL_mew',
    time: '2h ago',
    icon: 'bug_report',
    iconClass: 'bg-tertiary text-on-tertiary',
    diffs: [
      {
        filepath: 'src/components/Header.tsx',
        additions: 3,
        deletions: 1,
        lines: [
          { num: '45', text: "export function Header() {", type: 'normal' },
          { num: '-46', text: "  const [render, setRender] = useState(false);", type: 'deleted' },
          { num: '+46', text: "  const [render, setRender] = useState(true); // hydrate immediately", type: 'added' },
          { num: '+47', text: "  const hasMounted = useHasMounted();", type: 'added' },
          { num: '+48', text: "  if (!hasMounted) return null;", type: 'added' },
          { num: '49', text: "  return <header>...</header>;", type: 'normal' },
        ]
      }
    ]
  },
  {
    sha: '45bc221',
    msg: 'chore: update dependencies and toolchains',
    author: 'Marco Rossi',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHAWt5z9p-woO_za6pa8rgdjciZLqx6Iq8tBmzcx8jdnSon3sQXOwpiIPmP20bCB6_TKp9P-qh3-52JJkNtmxiJRUR0z9s7dTPs0BneEF_cHlnvMtr9w-EcvH3LEinFqYQMSYXoRFDppKpT6G-MXOYeHMl4tDoajn2GeIwSDk4yEKpbx-w88_2dXQ7tRduChXqxq_sa8omufxsEZ_FPT2gb2e87vlbDfe6dC7bowrTczbb-miAbjDtuFjY7nl7aXL5jBA6b2ILIA',
    time: '5h ago',
    icon: 'sync',
    iconClass: 'bg-surface-variant text-outline',
    diffs: [
      {
        filepath: 'package.json',
        additions: 4,
        deletions: 2,
        lines: [
          { num: '4', text: "  \"dependencies\": {", type: 'normal' },
          { num: '-5', text: "    \"vite\": \"^5.0.0\",", type: 'deleted' },
          { num: '-6', text: "    \"react\": \"^18.2.0\"", type: 'deleted' },
          { num: '+5', text: "    \"vite\": \"^8.1.0\",", type: 'added' },
          { num: '+6', text: "    \"react\": \"^19.2.7\",", type: 'added' },
          { num: '+7', text: "    \"react-dom\": \"^19.2.7\"", type: 'added' },
        ]
      }
    ]
  }
];

export const GitManager: React.FC<GitManagerProps> = ({
  mergeConflictResolved,
  setMergeConflictResolved
}) => {
  const [activeCommit, setActiveCommit] = useState<Commit>(mockCommits[0]);
  const [showResolver, setShowResolver] = useState(false);
  const [syncedState, setSyncedState] = useState('Sync Pending');

  // Conflict Resolution form states
  const [conflictFiles, setConflictFiles] = useState([
    {
      filepath: 'src/components/Navigation.tsx',
      resolved: false,
      choice: '',
      headContent: 'const currentLayout = "grid grid-cols-12 gap-lg";',
      incomingContent: 'const oldLayout = "flex flex-row";'
    },
    {
      filepath: 'src/App.tsx',
      resolved: false,
      choice: '',
      headContent: 'const activeTab = useActiveTabState("home");',
      incomingContent: 'const activeTab = useState("home");'
    },
    {
      filepath: 'src/index.css',
      resolved: false,
      choice: '',
      headContent: '--sidebar-width: 260px;',
      incomingContent: '--sidebar-width: 300px;'
    }
  ]);

  const selectConflictChoice = (index: number, choice: 'current' | 'incoming') => {
    setConflictFiles(prev => prev.map((file, idx) => {
      if (idx === index) {
        return { ...file, choice, resolved: true };
      }
      return file;
    }));
  };

  const handleResolveConflictsSubmit = () => {
    const allResolved = conflictFiles.every(f => f.resolved);
    if (!allResolved) {
      alert('Please select a resolution branch option for all files.');
      return;
    }
    setMergeConflictResolved(true);
    setSyncedState('Fully Synced');
    setShowResolver(false);
    alert('All merge conflicts resolved successfully on branch develop.');
  };

  const handleGitAction = (action: string) => {
    if (!mergeConflictResolved) {
      alert(`Cannot perform Git ${action} action. Please resolve merge conflicts first!`);
      return;
    }
    alert(`Git ${action} executed successfully.`);
  };

  const activeDiff = activeCommit.diffs[0];

  return (
    <div className="p-lg text-left select-none relative pb-16">
      
      {/* Conflict Warning Banner */}
      {!mergeConflictResolved ? (
        <div className="mb-lg p-md bg-error-container/20 border border-error/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-md animate-pulse">
          <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <div className="flex-1">
            <p className="text-body-md font-bold text-error">Merge Conflict Detected</p>
            <p className="text-body-sm text-on-error-container/80">
              3 files are in conflict on branch 'develop'. Please resolve before pushing commits.
            </p>
          </div>
          <button 
            onClick={() => setShowResolver(true)}
            className="px-md py-1 bg-error text-on-error rounded-lg text-label-caps hover:bg-error/90 transition-all font-bold cursor-pointer"
          >
            Resolve Now
          </button>
        </div>
      ) : (
        <div className="mb-lg p-md bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-md">
          <span className="material-symbols-outlined text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <div className="flex-1">
            <p className="text-body-md font-bold text-green-400">Environment Clear</p>
            <p className="text-body-sm text-on-surface-variant/80">
              All conflicts resolved. Ready to push local directories upstream.
            </p>
          </div>
        </div>
      )}

      {/* Dashboard Header: Repo Status & Actions */}
      <div className="grid grid-cols-12 gap-lg mb-lg">
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl p-lg flex flex-col md:flex-row md:items-center justify-between gap-lg">
          <div>
            <div className="flex items-center gap-sm mb-1">
              <span className="material-symbols-outlined text-primary">account_tree</span>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">developace-engine</h2>
            </div>
            <div className="flex items-center gap-md">
              <span className="flex items-center gap-xs text-body-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full font-code-md">
                <span className="material-symbols-outlined text-[16px]">alt_route</span>
                develop
              </span>
              <span className="flex items-center gap-xs text-body-sm text-on-surface-variant">
                <span className={`material-symbols-outlined text-[16px] ${mergeConflictResolved ? 'text-green-400' : 'text-yellow-400 animate-pulse'}`}>
                  {mergeConflictResolved ? 'check_circle' : 'pending'}
                </span>
                {syncedState}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-sm">
            <button 
              onClick={() => handleGitAction('Push')}
              className="primary-gradient text-white px-md py-2 rounded-lg text-body-sm font-bold flex items-center gap-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer animate-none"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              Push
            </button>
            <button 
              onClick={() => handleGitAction('Pull')}
              className="bg-surface-container border border-outline-variant/30 px-md py-2 rounded-lg text-body-sm font-bold flex items-center gap-sm hover:border-primary transition-all text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Pull
            </button>
            <button 
              onClick={() => handleGitAction('Fetch')}
              className="bg-surface-container border border-outline-variant/30 px-md py-2 rounded-lg text-body-sm font-bold flex items-center gap-sm hover:border-primary transition-all text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
              Fetch
            </button>
            <button 
              onClick={() => handleGitAction('Branch')}
              className="bg-surface-container border border-outline-variant/30 px-md py-2 rounded-lg text-body-sm font-bold flex items-center gap-sm hover:border-primary transition-all text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Branch
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 glass-panel rounded-xl p-lg flex flex-col justify-center text-left">
          <p className="text-label-caps text-on-surface-variant mb-2">LAST SYNCED</p>
          <div className="flex items-baseline gap-sm">
            <p className="font-display text-[32px] text-primary">02</p>
            <p className="text-body-md text-on-surface">minutes ago</p>
          </div>
          <div className="mt-4 flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high overflow-hidden">
              <img className="w-full h-full object-cover" alt="User 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnJMA-5qZG8gjlJLYmaMIGZnNpWdyxPa6rsSuRt_uoy0UiB9Laqw9cwdqguFV5-UZmTLUWqlKn4RdJzbo7aLQtIf4scl1E2r_g-2oCYnwkWnBBHqsq39-gI2Gj7v2vFhc_2G_shq4l91uzcHQEoCQ9NrqZCQakyPyUgZ5KAxgIjEI6iOKmMgMHafuWlbflV0Yndh7BRTkAXTI6mRtP9McXM1X4D_5At4Ot_3tgAHK4UGKV5wlpWh2ISlatfRSyvMdVA398X5_XHA" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high overflow-hidden">
              <img className="w-full h-full object-cover" alt="User 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRn3Mk7X3ZukE7oSV6vN1PiMgdn78nrWkAdD4_r1NF_WfX43mmx_eRNQuIBZLSxxOUa4QhEGO5ncwmPmyFjOsIvOAIPZyfgvi9t1tB6hODvDLjHdJNbwfytzVBX1jgN3VuxEmil_AZV3T5ILxXMp41vrf_PtKvti0Te0lFROX7BhDpZRaHv-19KXEhY8xiuEdWhyjc5vjA897uMD-T-l03-5LzaVTnSNRiEydb_k9tjkcMbkvFmbxuzggRbw3x8IguPQ8XBxAIfA" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high overflow-hidden">
              <img className="w-full h-full object-cover" alt="User 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo4j8ap0-rir_w8yYWsTZ27xd_SgEd5_V5Ok6o6_kjAQQ5urvP7mrFzPpY4PKSilWqW7Av4xQ8H4co7SrQPAKfCqvX5BIukIzmOzP6Us2E0jXG91-M1Z1-MHBpvjXu4p_ztXYYAugsHDvBWlqrRWL0xEt_Dczg8qka6atvEvaMRXpDOz5M0PQTLCVddgBDpU0NEVF8lLnAD-vevkowfYq6HrqBWQr2yAz2VzNPWBBT7ETRnihQsOHEk_y3sjYrfRnVLs1-m6aNmQ" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-low flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
              +4
            </div>
          </div>
        </div>
      </div>

      {/* Commit History & Diff Bento Grid */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Commits List */}
        <div className="col-span-12 xl:col-span-5 flex flex-col gap-lg text-left">
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
            <div className="px-lg py-md border-b border-outline-variant/20 flex items-center justify-between">
              <h3 className="font-headline-md text-body-lg font-bold text-on-surface">Commit History</h3>
              <span className="text-label-caps text-on-surface-variant">2,482 Commits</span>
            </div>
            
            <div className="divide-y divide-outline-variant/10 max-h-[500px] overflow-y-auto">
              {mockCommits.map(commit => {
                const isActive = activeCommit.sha === commit.sha;
                return (
                  <div
                    key={commit.sha}
                    onClick={() => setActiveCommit(commit)}
                    className={`p-md hover:bg-white/5 transition-all cursor-pointer group flex gap-md ${isActive ? 'bg-primary/10 border-l-2 border-primary' : ''}`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container-high">
                        <img className="w-full h-full object-cover" alt="Author" src={commit.avatar} />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border-2 border-surface ${commit.iconClass}`}>
                        <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {commit.icon}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-sm mb-0.5">
                        <p className="text-body-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                          {commit.msg}
                        </p>
                        <span className="text-label-caps text-on-surface-variant opacity-60 whitespace-nowrap">
                          {commit.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-sm">
                        <span className="code-font text-[12px] bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded border border-outline-variant/20">
                          {commit.sha}
                        </span>
                        <span className="text-label-caps text-on-surface-variant">
                          {commit.author}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diff Preview Panel */}
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-lg text-left">
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="px-lg py-md border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">description</span>
                <h3 className="font-body-md font-bold text-on-surface">{activeDiff.filepath}</h3>
              </div>
              <div className="flex items-center gap-sm font-code-md">
                <span className="text-[12px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded">+{activeDiff.additions}</span>
                <span className="text-[12px] text-error bg-error/10 px-2 py-0.5 rounded">-{activeDiff.deletions}</span>
              </div>
            </div>

            {/* Code lines block */}
            <div className="flex-1 p-lg code-font text-[13px] leading-relaxed overflow-auto bg-[#0b1120] text-left">
              {activeDiff.lines.map((line, idx) => {
                let rowClass = "flex gap-lg";
                if (line.type === 'added') {
                  rowClass += " bg-green-900/20 text-green-400 -mx-lg px-lg border-l-4 border-green-500";
                } else if (line.type === 'deleted') {
                  rowClass += " bg-red-900/20 text-red-400 -mx-lg px-lg border-l-4 border-red-500";
                } else {
                  rowClass += " opacity-40 text-on-surface";
                }
                return (
                  <div key={idx} className={rowClass}>
                    <span className="text-right w-8 select-none border-r border-outline-variant/10 pr-2">{line.num}</span>
                    <span className="whitespace-pre">{line.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-md bg-surface-container-low border-t border-outline-variant/20 flex justify-between items-center text-body-sm text-on-surface-variant">
              <span>Showing changes from <span className="code-font text-primary">{activeCommit.sha}</span></span>
              <button 
                onClick={() => alert(`Opening ${activeDiff.filepath} in IDE...`)}
                className="text-label-caps text-primary hover:underline font-bold cursor-pointer"
              >
                Open in Editor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conflict Resolver Modal */}
      {showResolver && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-md">
          <div className="glass-panel rounded-xl max-w-2xl w-full bg-[#051424]/95 border-error/30 p-lg flex flex-col max-h-[85vh] text-left">
            
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-sm mb-md">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                  alt_route
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Merge Conflict Resolver</h3>
              </div>
              <button 
                onClick={() => setShowResolver(false)} 
                className="text-outline hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-body-sm text-outline mb-lg">
              Resolve conflicts in each file by accepting current HEAD commits or incoming develop branches.
            </p>

            <div className="flex-1 overflow-y-auto space-y-lg pr-xs">
              {conflictFiles.map((file, idx) => (
                <div key={file.filepath} className="border border-outline-variant/20 rounded-xl p-md bg-surface-container-low">
                  <div className="flex justify-between items-center mb-sm">
                    <span className="font-code-md text-sm text-primary font-bold">{file.filepath}</span>
                    {file.resolved ? (
                      <span className="text-[11px] bg-green-500/10 text-green-400 font-label-caps border border-green-500/20 px-2 py-0.5 rounded">
                        Resolved: {file.choice.toUpperCase()}
                      </span>
                    ) : (
                      <span className="text-[11px] bg-red-500/10 text-red-400 font-label-caps border border-red-500/20 px-2 py-0.5 rounded animate-pulse">
                        Conflict
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-sm mt-md font-code-md text-xs">
                    {/* HEAD Option */}
                    <div 
                      onClick={() => selectConflictChoice(idx, 'current')}
                      className={`p-sm rounded-lg border cursor-pointer transition-all ${
                        file.choice === 'current'
                          ? 'border-green-500 bg-green-500/5'
                          : 'border-outline-variant/30 hover:border-primary bg-surface'
                      }`}
                    >
                      <p className="text-[10px] text-green-400 font-bold uppercase mb-xs">{"<<<<<<< HEAD (Current)"}</p>
                      <p className="text-on-surface line-clamp-2 italic">{file.headContent}</p>
                    </div>

                    {/* INCOMING Option */}
                    <div 
                      onClick={() => selectConflictChoice(idx, 'incoming')}
                      className={`p-sm rounded-lg border cursor-pointer transition-all ${
                        file.choice === 'incoming'
                          ? 'border-green-500 bg-green-500/5'
                          : 'border-outline-variant/30 hover:border-primary bg-surface'
                      }`}
                    >
                      <p className="text-[10px] text-blue-400 font-bold uppercase mb-xs">======= develop (Incoming)</p>
                      <p className="text-on-surface line-clamp-2 italic">{file.incomingContent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-outline-variant/20 pt-md mt-lg flex justify-end gap-sm">
              <button 
                onClick={() => setShowResolver(false)} 
                className="px-lg py-2 border border-outline-variant/30 text-on-surface hover:text-primary rounded-lg text-body-sm font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleResolveConflictsSubmit} 
                className="px-xl py-2 primary-gradient text-white rounded-lg text-body-sm font-bold hover:opacity-90 shadow-lg cursor-pointer"
              >
                Apply Resolutions
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
