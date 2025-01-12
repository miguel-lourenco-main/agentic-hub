"use client";

import * as React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  readOnly = false,
  onRatingChange,
  className,
  ...props
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const renderStar = (index: number) => {
    const starNumber = index + 1;
    const isHalf = rating - index > 0 && rating - index < 1;
    const isFilled = (hoverRating ?? rating) >= starNumber;
    const starClass = cn(
      sizeClasses[size],
      "transition-colors",
      isFilled ? "text-yellow-400" : "text-muted stroke-muted-foreground",
      !readOnly && "cursor-pointer hover:text-yellow-400"
    );

    return (
      <div
        key={index}
        className="relative"
        onMouseEnter={() => !readOnly && setHoverRating(starNumber)}
        onMouseLeave={() => !readOnly && setHoverRating(null)}
        onClick={() => !readOnly && onRatingChange?.(starNumber)}
      >
        <Star className={starClass} />
        {isHalf && !isFilled && (
          <StarHalf
            className={cn(starClass, "absolute top-0 left-0 text-yellow-400")}
          />
        )}
      </div>
    );
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)} {...props}>
      {Array.from({ length: maxRating }, (_, i) => renderStar(i))}
    </div>
  );
}
