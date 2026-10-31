"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ProductSearch({
  value,
  onChange,
  placeholder = "Search products...",
}: ProductSearchProps) {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, onChange]);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const clearSearch = () => {
    setSearch("");
    onChange("");
  };

  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          py-3
          pl-11
          pr-11
          text-sm
          text-gray-700
          shadow-sm
          outline-none
          transition
          duration-200
          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-200
        "
      />

      {search && (
        <button
          onClick={clearSearch}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-red-500
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}