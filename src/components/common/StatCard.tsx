import type { StatCardProps } from "../../types";

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6">
    <div className="flex items-center justify-between mb-4">
      <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
        {title}
      </span>
      <span className="text-zinc-600">{icon}</span>
    </div>
    <p className="text-4xl font-light text-zinc-100 tracking-tight">{value}</p>
  </div>
);
