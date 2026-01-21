import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Database, Cpu, MessageCircle, Unlock } from "lucide-react";
import type { Lab, Stats, ChartDataItem } from "../types";
import { COLORS, COUNTRY_COLORS } from "../constants/colors";
import { LAB_ICON_FILES } from "../constants/icons";
import { StatCard, SvgIcon } from "../components/common";
import { CustomTooltip } from "../components/charts";

interface OverviewTabProps {
  labs: Lab[];
  stats: Stats;
  onLabClick: (lab: Lab) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  labs,
  stats,
  onLabClick,
}) => {
  const tierData: ChartDataItem[] = [
    { name: "Tier 1", value: stats.tierCounts[1], fill: COLORS.tier1 },
    { name: "Tier 2", value: stats.tierCounts[2], fill: COLORS.tier2 },
    { name: "Tier 3", value: stats.tierCounts[3], fill: COLORS.tier3 },
  ];

  const countryData: ChartDataItem[] = Object.entries(stats.countryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([country, count]) => ({
      name: country,
      value: count,
      fill: COUNTRY_COLORS[country] || "#27272a",
    }));

  const openSourceData: ChartDataItem[] = [
    {
      name: "Open",
      value: stats.openSourceCounts["true"],
      fill: COLORS.openSource,
    },
    {
      name: "Partial",
      value: stats.openSourceCounts["partial"],
      fill: COLORS.partial,
    },
    {
      name: "Closed",
      value: stats.openSourceCounts["false"],
      fill: COLORS.closed,
    },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 mb-8">
        <StatCard
          title="Total Labs"
          value={labs.length}
          icon={<Database className="w-4 h-4" />}
        />
        <StatCard
          title="Tier 1"
          value={stats.tierCounts[1]}
          icon={<Cpu className="w-4 h-4" />}
        />
        <StatCard
          title="Chat Available"
          value={stats.chatCounts["true"]}
          icon={<MessageCircle className="w-4 h-4" />}
        />
        <StatCard
          title="Open Source"
          value={stats.openSourceCounts["true"]}
          icon={<Unlock className="w-4 h-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-3 gap-px bg-zinc-800 mb-8">
        <div className="bg-zinc-900 p-6">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
            Distribution by Tier
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={tierData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                strokeWidth={0}
              >
                {tierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {tierData.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 text-xs"
              >
                <div
                  className="w-2 h-2"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-zinc-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 p-6">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
            Open Source Status
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={openSourceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                strokeWidth={0}
              >
                {openSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {openSourceData.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 text-xs"
              >
                <div
                  className="w-2 h-2"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-zinc-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 p-6">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
            By Country
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={countryData.slice(0, 5)}
              layout="vertical"
              margin={{ left: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={70}
                tick={{ fontSize: 10, fill: "#71717a" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" barSize={12}>
                {countryData.slice(0, 5).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tier 1 Labs */}
      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
          Tier 1 — Frontier Labs
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-800">
          {labs
            .filter((l) => l.tier === 1)
            .map((lab) => (
              <div
                key={lab.id}
                className="bg-zinc-900 p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer"
                onClick={() => onLabClick(lab)}
              >
                <div className="flex items-start gap-2">
                  {LAB_ICON_FILES[lab.id] && (
                    <div className="w-6 h-6 text-zinc-400 shrink-0 flex items-center justify-center">
                      <SvgIcon name={LAB_ICON_FILES[lab.id]} size={20} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-zinc-100 text-sm">
                      {lab.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      {lab.flagship}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-600 mt-2 uppercase tracking-wider">
                  {lab.headquarters.country}
                </p>
                {lab.chat && (
                  <a
                    href={lab.chat}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 mt-3 px-2 py-1 bg-zinc-100 hover:bg-white text-zinc-900 text-[10px] font-medium uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-2.5 h-2.5" />
                    Try it
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
