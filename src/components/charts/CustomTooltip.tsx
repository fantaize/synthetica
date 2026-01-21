interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 px-3 py-2">
        <p className="text-zinc-200 text-xs font-medium">
          {payload[0].name || payload[0].payload.name}
        </p>
        <p className="text-zinc-400 text-xs">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};
