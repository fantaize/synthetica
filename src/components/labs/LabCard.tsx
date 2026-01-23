import { Globe, MessageCircle } from "lucide-react";
import type { LabCardProps } from "../../types";
import { COLORS } from "../../constants/colors";
import { SvgIcon } from "../common/SvgIcon";

export const LabCard: React.FC<LabCardProps> = ({ lab, onClick }) => {
  const openSourceLabel =
    lab.openSource === true
      ? "Open"
      : lab.openSource === "partial"
        ? "Partial"
        : "Closed";
  const openSourceColor =
    lab.openSource === true
      ? COLORS.openSource
      : lab.openSource === "partial"
        ? COLORS.partial
        : COLORS.closed;

  return (
    <div
      className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {lab.icon && (
              <div className="w-8 h-8 bg-zinc-800 p-1.5 shrink-0 text-zinc-300 flex items-center justify-center">
                <SvgIcon name={lab.icon} size={20} whiteFilter={lab.whiteFilter} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-zinc-100 truncate">
                  {lab.name}
                </h3>
                <span className="text-[10px] font-medium px-1.5 py-0.5 bg-zinc-800 text-zinc-400 uppercase tracking-wider shrink-0">
                  T{lab.tier}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {lab.headquarters.city ? `${lab.headquarters.city}, ` : ""}
                {lab.headquarters.country}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 uppercase tracking-wider"
              style={{
                backgroundColor: `${openSourceColor}15`,
                color: openSourceColor,
              }}
            >
              {openSourceLabel}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <div className="min-w-0">
            <p className="text-zinc-600 uppercase tracking-wider text-[10px]">
              Flagship
            </p>
            <p className="text-zinc-300 mt-0.5 truncate">{lab.flagship}</p>
          </div>
          {lab.founded && (
            <div>
              <p className="text-zinc-600 uppercase tracking-wider text-[10px]">
                Founded
              </p>
              <p className="text-zinc-300 mt-0.5">{lab.founded}</p>
            </div>
          )}
          <div>
            <p className="text-zinc-600 uppercase tracking-wider text-[10px]">
              API
            </p>
            <p
              className="mt-0.5"
              style={{ color: lab.apiAvailable ? COLORS.api : COLORS.noApi }}
            >
              {lab.apiAvailable ? "Yes" : "No"}
            </p>
          </div>
          {lab.chat && (
            <a
              href={lab.chat}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="sm:ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-900 text-[11px] font-medium uppercase tracking-wider transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              Try it
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
