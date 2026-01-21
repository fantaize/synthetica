import { Globe, MessageCircle, X } from "lucide-react";
import type { LabModalProps } from "../../types";
import { LAB_ICON_FILES } from "../../constants/icons";
import { SvgIcon } from "../common/SvgIcon";

export const LabModal: React.FC<LabModalProps> = ({ lab, onClose }) => {
  if (!lab) return null;

  const iconFile = LAB_ICON_FILES[lab.id];

  const openSourceLabel =
    lab.openSource === true
      ? "Open Source"
      : lab.openSource === "partial"
        ? "Partially Open"
        : "Closed Source";
  const openSourceColor =
    lab.openSource === true
      ? "#22c55e"
      : lab.openSource === "partial"
        ? "#f59e0b"
        : "#ef4444";

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with logo */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-start gap-4">
            {iconFile && (
              <div className="w-16 h-16 bg-zinc-800 p-3 shrink-0 flex items-center justify-center">
                <SvgIcon name={iconFile} size={40} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-medium text-zinc-100 truncate">
                  {lab.name}
                </h2>
                <span className="text-[10px] font-medium px-1.5 py-0.5 bg-zinc-800 text-zinc-400 uppercase tracking-wider shrink-0">
                  Tier {lab.tier}
                </span>
              </div>
              <p className="text-sm text-zinc-500 mt-1 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {lab.headquarters.city ? `${lab.headquarters.city}, ` : ""}
                {lab.headquarters.country}
              </p>
              {lab.founded && (
                <p className="text-xs text-zinc-600 mt-1">
                  Founded {lab.founded}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Flagship */}
          <div>
            <p className="text-zinc-600 uppercase tracking-wider text-[10px] mb-2">
              Flagship Model
            </p>
            <p className="text-zinc-200 text-lg font-medium">{lab.flagship}</p>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className="text-xs font-medium px-2 py-1 uppercase tracking-wider"
              style={{
                backgroundColor: `${openSourceColor}15`,
                color: openSourceColor,
              }}
            >
              {openSourceLabel}
            </span>
            <span
              className="text-xs font-medium px-2 py-1 uppercase tracking-wider"
              style={{
                backgroundColor: lab.apiAvailable ? "#3b82f615" : "#3f3f4615",
                color: lab.apiAvailable ? "#3b82f6" : "#71717a",
              }}
            >
              {lab.apiAvailable ? "API Available" : "No API"}
            </span>
          </div>

          {/* Model Families */}
          <div>
            <p className="text-zinc-600 uppercase tracking-wider text-[10px] mb-2">
              Model Families
            </p>
            <div className="flex flex-wrap gap-1">
              {lab.modelFamilies.map((m) => (
                <span
                  key={m}
                  className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <p className="text-zinc-600 uppercase tracking-wider text-[10px] mb-2">
              Focus Areas
            </p>
            <div className="flex flex-wrap gap-1">
              {lab.focus.map((f) => (
                <span
                  key={f}
                  className="px-2 py-1 bg-zinc-800/50 text-zinc-400 text-xs"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Chat Link */}
          {lab.chat && (
            <a
              href={lab.chat}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-medium uppercase tracking-wider transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Try {lab.name}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
