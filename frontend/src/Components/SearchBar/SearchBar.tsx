import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SearchBar.css";
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Localisation } from "../../Models/Localisation";

interface SearchBarProps {
  value: string;
  onValueChange: (newValue: string) => void;
}

export function filterLocalisation(
  localisation: Localisation | undefined,
  names: string[],
  searchValue: string,
  delta: number
): Localisation {
  let filteredLocalisation: Localisation = { Services: [] };
  if (localisation) {
    for (let name of names) {
      if (localisation[name]) {
        for (let freq of localisation[name]) {
          if (Math.abs(parseFloat(freq) - parseFloat(searchValue)) <= delta) {
            filteredLocalisation[name] = localisation[name];
            break;
          }
        }
      }
    }
  }
  return filteredLocalisation;
}

export function SearchBar({ value, onValueChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Load more items here
      }
    });
    if (node) observer.current.observe(node);
  }, []);

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
      {/* Render your items here */}
      <div ref={lastItemRef}></div>
    </div>
  );
}