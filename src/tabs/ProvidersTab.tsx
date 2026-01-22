import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Provider } from "../types";
import { SvgIcon } from "../components/common";

interface ProvidersTabProps {
  providers: Provider[];
}

const CATEGORY_LABELS: Record<string, string> = {
  "neo-cloud": "Neo Cloud",
  "big-cloud": "Big Cloud",
  inference: "Inference Hardware",
  platform: "ML Platforms",
  "gpu-cloud": "GPU Cloud",
  router: "API Routers",
  search: "Search APIs",
  local: "Local Inference",
};

const CATEGORIES = [
  "neo-cloud",
  "big-cloud",
  "inference",
  "platform",
  "gpu-cloud",
  "router",
  "search",
  "local",
] as const;

export const ProvidersTab: React.FC<ProvidersTabProps> = ({ providers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProviders = useMemo<Provider[]>(() => {
    if (!searchTerm) return providers;
    const term = searchTerm.toLowerCase();
    return providers.filter(
      (provider) =>
        provider.name.toLowerCase().includes(term) ||
        provider.description.toLowerCase().includes(term) ||
        provider.features.some((f) => f.toLowerCase().includes(term))
    );
  }, [providers, searchTerm]);

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
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 mt-3 uppercase tracking-wider">
          {filteredProviders.length} of {providers.length} providers
        </p>
      </div>

      {/* Providers Grid - Grouped by Category */}
      {CATEGORIES.map((category) => {
        const categoryProviders = filteredProviders.filter(
          (provider) => provider.category === category
        );
        if (categoryProviders.length === 0) return null;
        return (
          <div
            key={category}
            className="bg-zinc-900 border border-zinc-800 p-6 mb-6"
          >
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
              {CATEGORY_LABELS[category]}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
              {categoryProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="bg-zinc-900 p-4 hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {provider.icon && (
                        <div className="w-8 h-8 bg-zinc-800 p-1.5 shrink-0 flex items-center justify-center">
                          <SvgIcon name={provider.icon} size={20} whiteFilter={provider.whiteFilter} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-zinc-100 text-sm flex items-center gap-2">
                          {provider.name}
                          {provider.status === "alive" && (
                            <span className="px-1.5 py-0.5 bg-green-900/50 text-green-400 text-[9px] uppercase tracking-wider">
                              Active
                            </span>
                          )}
                          {provider.status === "dead" && (
                            <span className="px-1.5 py-0.5 bg-red-900/50 text-red-400 text-[9px] uppercase tracking-wider">
                              Dead
                            </span>
                          )}
                          {provider.status === "beta" && (
                            <span className="px-1.5 py-0.5 bg-yellow-900/50 text-yellow-400 text-[9px] uppercase tracking-wider">
                              Beta
                            </span>
                          )}
                          {provider.status === "merged" && (
                            <span className="px-1.5 py-0.5 bg-purple-900/50 text-purple-400 text-[9px] uppercase tracking-wider">
                              Merged
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                          {provider.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs">
                      {provider.modelsAvailable && (
                        <div>
                          <p className="text-zinc-600 uppercase tracking-wider text-[10px]">
                            Models
                          </p>
                          <p className="text-zinc-300 mt-0.5">
                            {provider.modelsAvailable.toLocaleString()}+
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-zinc-600 uppercase tracking-wider text-[10px]">
                          Pricing
                        </p>
                        <p className="text-zinc-300 mt-0.5 capitalize">
                          {provider.pricing.replace(/-/g, " ")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {provider.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="px-1.5 py-0.5 bg-zinc-800 text-zinc-400 text-[10px]"
                        >
                          {f.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-medium uppercase tracking-wider transition-colors"
                      >
                        Website
                      </a>
                      <a
                        href={provider.apiDocs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-2 py-1.5 bg-zinc-100 hover:bg-white text-zinc-900 text-[10px] font-medium uppercase tracking-wider transition-colors"
                      >
                        API Docs
                      </a>
                    </div>
                  </div>
                ))}

            </div>
          </div>
        );
      })}
    </>
  );
};
