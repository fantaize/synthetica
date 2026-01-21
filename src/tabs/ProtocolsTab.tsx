import type { Protocol } from "../types";

interface ProtocolsTabProps {
  protocols: Protocol[];
}

export const ProtocolsTab: React.FC<ProtocolsTabProps> = ({ protocols }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
      <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
        AI Protocols & Standards
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
        {protocols.map((protocol) => (
          <div
            key={protocol.id}
            className="bg-zinc-900 p-4 hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-zinc-100 text-sm">
                {protocol.name}
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                {protocol.description}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-zinc-600 uppercase tracking-wider text-[10px]">
                Organization
              </p>
              <p className="text-zinc-300 mt-0.5 text-xs">
                {protocol.organization}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {protocol.features.map((f) => (
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
                href={protocol.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-medium uppercase tracking-wider transition-colors"
              >
                Website
              </a>
              <a
                href={protocol.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-2 py-1.5 bg-zinc-100 hover:bg-white text-zinc-900 text-[10px] font-medium uppercase tracking-wider transition-colors"
              >
                Docs
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
