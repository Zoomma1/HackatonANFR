import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

interface SearchBarProps {
  value: string;
  onValueChange: (newValue: string) => void;
}

export function SearchBar({ value, onValueChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const subscription = fromEvent(inputRef.current, 'input').pipe(
        map((e: any) => e.target.value),
        debounceTime(500)
      ).subscribe(onValueChange);

      return () => subscription.unsubscribe();
    }
  }, [onValueChange]);

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}