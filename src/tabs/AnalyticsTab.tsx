import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Lab, Stats, ChartDataItem, FocusDataItem } from "../types";
import { COUNTRY_COLORS } from "../constants/colors";
import { CustomTooltip } from "../components/charts";

interface AnalyticsTabProps {
  stats: Stats;
  labs: Lab[];
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ stats, labs }) => {
  const countryData: ChartDataItem[] = Object.entries(stats.countryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([country, count]) => ({
      name: country,
      value: count,
      fill: COUNTRY_COLORS[country] || "#27272a",
    }));

  const focusData: FocusDataItem[] = Object.entries(stats.focusAreas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([focus, count]) => ({ name: focus, count }));

  return (
    <>
      {/* Focus Areas */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
          Focus Areas
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={focusData} margin={{ bottom: 60 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#71717a" }}
              angle={-45}
              textAnchor="end"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#52525b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#fafafa" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
          Geographic Distribution
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={countryData}
            layout="vertical"
            margin={{ left: 10 }}
          >
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: "#52525b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{ fontSize: 11, fill: "#71717a" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" barSize={14}>
              {countryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Breakdown */}
      <div className="grid md:grid-cols-2 gap-px bg-zinc-800">
        <div className="bg-zinc-900 p-6">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
            API Availability
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-xs">Available</span>
                <span className="text-zinc-200 text-xs font-medium">
                  {stats.apiCounts["true"]}
                </span>
              </div>
              <div className="h-1 bg-zinc-800">
                <div
                  className="h-full bg-zinc-100"
                  style={{
                    width: `${(stats.apiCounts["true"] / labs.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-xs">Not Available</span>
                <span className="text-zinc-200 text-xs font-medium">
                  {stats.apiCounts["false"]}
                </span>
              </div>
              <div className="h-1 bg-zinc-800">
                <div
                  className="h-full bg-zinc-600"
                  style={{
                    width: `${(stats.apiCounts["false"] / labs.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-6">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-6">
            Open Source Breakdown
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-xs">Open Source</span>
                <span className="text-zinc-200 text-xs font-medium">
                  {stats.openSourceCounts["true"]}
                </span>
              </div>
              <div className="h-1 bg-zinc-800">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${(stats.openSourceCounts["true"] / labs.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-xs">Partial</span>
                <span className="text-zinc-200 text-xs font-medium">
                  {stats.openSourceCounts["partial"]}
                </span>
              </div>
              <div className="h-1 bg-zinc-800">
                <div
                  className="h-full bg-amber-500"
                  style={{
                    width: `${(stats.openSourceCounts["partial"] / labs.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 text-xs">Closed</span>
                <span className="text-zinc-200 text-xs font-medium">
                  {stats.openSourceCounts["false"]}
                </span>
              </div>
              <div className="h-1 bg-zinc-800">
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${(stats.openSourceCounts["false"] / labs.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
