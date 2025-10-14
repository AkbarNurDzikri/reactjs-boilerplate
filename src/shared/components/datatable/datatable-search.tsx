import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function DataTableSearch({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 500,
}: DataTableSearchProps) {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, onChange, debounceMs]);

  const handleClear = () => {
    setSearchValue("");
    onChange("");
  };

  return (
    <div className="relative w-full sm:w-96">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full h-8 pl-9 pr-9 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
