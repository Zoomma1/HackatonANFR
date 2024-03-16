import React from "react";

interface SearchBarProps {
  value: string;
  onValueChange: (newValue: string) => void;
}

export function SearchBar({ value, onValueChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
}
