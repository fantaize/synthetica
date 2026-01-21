import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Lab } from "../types";
import { LabCard } from "../components/labs";

interface LabsTabProps {
  labs: Lab[];
  onLabClick: (lab: Lab) => void;
}

export const LabsTab: React.FC<LabsTabProps> = ({ labs, onLabClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLabs = useMemo<Lab[]>(() => {
    if (!searchTerm) return labs;
    const term = searchTerm.toLowerCase();
    return labs.filter((lab) => {
      return (
        lab.name.toLowerCase().includes(term) ||
        lab.flagship.toLowerCase().includes(term) ||
        lab.modelFamilies.some((m) => m.toLowerCase().includes(term)) ||
        lab.headquarters.country.toLowerCase().includes(term)
      );
    });
  }, [labs, searchTerm]);

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
                placeholder="Search labs, models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 mt-3 uppercase tracking-wider">
          {filteredLabs.length} of {labs.length} labs
        </p>
      </div>

      {/* Tier 1 Labs */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
          Tier 1 — Frontier Labs
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {filteredLabs
            .filter((lab) => lab.tier === 1)
            .map((lab) => (
              <LabCard
                key={lab.id}
                lab={lab}
                onClick={() => onLabClick(lab)}
              />
            ))}
        </div>
      </div>

      {/* Tier 2 Labs */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
          Tier 2 — Major Labs
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {filteredLabs
            .filter((lab) => lab.tier === 2)
            .map((lab) => (
              <LabCard
                key={lab.id}
                lab={lab}
                onClick={() => onLabClick(lab)}
              />
            ))}
        </div>
      </div>

      {/* Tier 3 Labs */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
          Tier 3 — Emerging & Specialized Labs
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {filteredLabs
            .filter((lab) => lab.tier === 3)
            .map((lab) => (
              <LabCard
                key={lab.id}
                lab={lab}
                onClick={() => onLabClick(lab)}
              />
            ))}
        </div>
      </div>
    </>
  );
};
