"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { ChevronRight } from "lucide-react";

interface ScrollableListProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollableList({ children, className }: ScrollableListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationFrameRef = useRef<number>();

  const checkScrollIndicators = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
    setShowRightIndicator(!isAtEnd);
  };

  // Easing function that starts slow, accelerates, then decelerates
  const easeInOutSine = (x: number): number => {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  };

  const scrollToEnd = () => {
    if (!containerRef.current || isScrolling) return;

    setIsScrolling(true);
    const container = containerRef.current;
    const startPosition = container.scrollLeft;
    const targetPosition = container.scrollWidth - container.clientWidth;
    const distance = targetPosition - startPosition;
    const duration = 800; // Animation duration in ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing to the progress
      const easedProgress = easeInOutSine(progress);
      
      // Calculate new scroll position
      const newPosition = startPosition + (distance * easedProgress);
      container.scrollLeft = newPosition;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsScrolling(false);
        checkScrollIndicators();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    checkScrollIndicators();
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollIndicators);
      window.addEventListener('resize', checkScrollIndicators);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (container) {
        container.removeEventListener('scroll', checkScrollIndicators);
        window.removeEventListener('resize', checkScrollIndicators);
      }
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || isScrolling) return;
    
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setLastX(e.pageX);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current || isScrolling) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const delta = x - startX;
    containerRef.current.scrollLeft = scrollLeft - delta;
    
    // Calculate velocity
    const currentVelocity = e.pageX - lastX;
    setVelocity(currentVelocity);
    setLastX(e.pageX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
    
    if (!containerRef.current || isScrolling) return;
    
    let currentVelocity = velocity;
    const decayRate = 0.95;
    
    const animate = () => {
      if (!containerRef.current || Math.abs(currentVelocity) < 0.1) return;
      
      currentVelocity *= decayRate;
      containerRef.current.scrollBy(-currentVelocity, 0);
      checkScrollIndicators();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  const onMouseLeave = () => {
    if (isDragging) {
      onMouseUp();
    }
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className={cn(
          "relative overflow-x-scroll scrollbar-none cursor-grab active:cursor-grabbing pt-1",
          className
        )}
      >
        <div className="flex gap-6">
          {children}
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent" />
      {showRightIndicator && (
        <button
          onClick={scrollToEnd}
          disabled={isScrolling}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/80 shadow-md hover:bg-background/90 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-foreground/60" />
        </button>
      )}
    </div>
  );
} 