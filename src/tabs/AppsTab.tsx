import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { App } from "../types";
import { APP_ICON_FILES } from "../constants/icons";
import { SvgIcon } from "../components/common";

interface AppsTabProps {
  apps: App[];
}

const CATEGORY_LABELS: Record<string, string> = {
  ide: "IDEs & Code Editors",
  cli: "CLI Tools",
  browser: "Browsers",
  plugin: "Plugins & Extensions",
  physical: "Physical Devices",
  agent: "AI Agents",
  extension: "IDE Extensions",
  terminal: "Terminals",
  desktop: "Desktop Apps",
  web: "Web Apps",
  productivity: "Productivity",
};

const CATEGORIES = [
  "ide",
  "cli",
  "browser",
  "plugin",
  "physical",
  "agent",
  "extension",
  "terminal",
  "desktop",
  "web",
  "productivity",
] as const;

export const AppsTab: React.FC<AppsTabProps> = ({ apps }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = useMemo<App[]>(() => {
    if (!searchTerm) return apps;
    const term = searchTerm.toLowerCase();
    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(term) ||
        app.description.toLowerCase().includes(term) ||
        app.features.some((f) => f.toLowerCase().includes(term))
    );
  }, [apps, searchTerm]);

  return (
    <>
      {/* Search */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 mt-3 uppercase tracking-wider">
          {filteredApps.length} of {apps.length} apps
        </p>
      </div>

      {/* Apps by Category */}
      {CATEGORIES.map((category) => {
        const categoryApps = filteredApps.filter(
          (app) => app.category === category
        );
        if (categoryApps.length === 0) return null;
        return (
          <div
            key={category}
            className="bg-zinc-900 border border-zinc-800 p-6 mb-6"
          >
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
              {CATEGORY_LABELS[category]}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
              {categoryApps.map((app) => {
                const iconFile = APP_ICON_FILES[app.id];
                return (
                  <div
                    key={app.id}
                    className="bg-zinc-900 p-4 hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {iconFile && (
                        <div className="w-8 h-8 bg-zinc-800 p-1.5 shrink-0 flex items-center justify-center">
                          <SvgIcon name={iconFile} size={20} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-zinc-100 text-sm flex items-center gap-2">
                          {app.name}
                          {app.status === "alive" && (
                            <span className="px-1.5 py-0.5 bg-green-900/50 text-green-400 text-[9px] uppercase tracking-wider">
                              Active
                            </span>
                          )}
                          {app.status === "dead" && (
                            <span className="px-1.5 py-0.5 bg-red-900/50 text-red-400 text-[9px] uppercase tracking-wider">
                              Dead
                            </span>
                          )}
                          {app.status === "beta" && (
                            <span className="px-1.5 py-0.5 bg-yellow-900/50 text-yellow-400 text-[9px] uppercase tracking-wider">
                              Beta
                            </span>
                          )}
                          {app.status === "merged" && (
                            <span className="px-1.5 py-0.5 bg-purple-900/50 text-purple-400 text-[9px] uppercase tracking-wider">
                              Merged
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                          {app.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs">
                      <div>
                        <p className="text-zinc-600 uppercase tracking-wider text-[10px]">
                          Platform
                        </p>
                        <p className="text-zinc-300 mt-0.5">
                          {app.platform.join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-600 uppercase tracking-wider text-[10px]">
                          Pricing
                        </p>
                        <p className="text-zinc-300 mt-0.5 capitalize">
                          {app.pricing}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {app.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="px-1.5 py-0.5 bg-zinc-800 text-zinc-400 text-[10px]"
                        >
                          {f.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <a
                        href={app.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center px-2 py-1.5 bg-zinc-100 hover:bg-white text-zinc-900 text-[10px] font-medium uppercase tracking-wider transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
