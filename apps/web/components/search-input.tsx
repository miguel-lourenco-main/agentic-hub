"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Describe the task you need help with...",
  disabled,
  className,
}: SearchInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={cn("w-full", className)}
    >
      <div className="relative w-full">
        <Input
          placeholder={placeholder}
          className="h-12 pr-12"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          aria-label="Search"
          disabled={disabled}
        >
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}


