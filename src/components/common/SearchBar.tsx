import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  resultCount: number;
  totalCount: number;
  itemLabel: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
  resultCount,
  totalCount,
  itemLabel,
}) => (
  <div className="bg-zinc-900 border border-zinc-800 p-4 mb-6">
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-zinc-800 border border-zinc-700 pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <span className="text-zinc-500 text-sm">
        {resultCount} of {totalCount} {itemLabel}
      </span>
    </div>
  </div>
);
