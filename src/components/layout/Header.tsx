import type { Meta } from "../../types";

export type TabType =
  | "overview"
  | "labs"
  | "providers"
  | "apps"
  | "protocols"
  | "analytics";

interface HeaderProps {
  meta: Meta;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  meta,
  activeTab,
  onTabChange,
}) => (
  <header className="border-b border-zinc-800 sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-medium tracking-tight">{meta.title}</h1>
          <p className="text-sm text-zinc-500 mt-1">{meta.description}</p>
        </div>
        <div className="text-right text-xs text-zinc-600">
          <p>v{meta.version}</p>
          <p>{meta.lastUpdated}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mt-6">
        {(
          [
            "overview",
            "labs",
            "providers",
            "apps",
            "protocols",
            "analytics",
          ] as const
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? "bg-zinc-100 text-zinc-900"
                : "bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  </header>
);
