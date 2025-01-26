"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";

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
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationFrameRef = useRef<number>();

  const checkScrollIndicators = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
    const isAtStart = scrollLeft <= 0;
    
    setShowRightIndicator(!isAtEnd);
    setShowLeftIndicator(!isAtStart);
  };

  // Easing function that starts slow, accelerates, then decelerates
  const easeInOutSine = (x: number): number => {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  };

  const scrollTo = (targetPosition: number) => {
    if (!containerRef.current || isScrolling) return;

    setIsScrolling(true);
    const container = containerRef.current;
    const startPosition = container.scrollLeft;
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

  const scrollToStart = () => {
    scrollTo(0);
  };

  const scrollToEnd = () => {
    if (!containerRef.current) return;
    const targetPosition = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    scrollTo(targetPosition);
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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
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
      {/* Fade overlays */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[4rem] bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[4rem] bg-gradient-to-l from-background to-transparent z-10" />
      
      <div 
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className={cn(
          "relative overflow-x-scroll scrollbar-none cursor-grab active:cursor-grabbing pt-1 [&>div>*:first-child]:ml-[1.5rem]",
          className
        )}
      >
        <div className="flex gap-6">
          {children}
          {/* Empty spacer element - assuming agent cards are 300px wide */}
          <div className="w-[50px] shrink-0" aria-hidden="true" />
        </div>
      </div>
      
      {showLeftIndicator && (
        <button
          onClick={scrollToStart}
          disabled={isScrolling}
          className="absolute -left-[2rem] top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/80 shadow-md hover:bg-background/90 transition-colors z-20"
        >
          <ChevronLeft className="w-5 h-5 text-foreground/60" />
        </button>
      )}
      {showRightIndicator && (
        <button
          onClick={scrollToEnd}
          disabled={isScrolling}
          className="absolute -right-[2rem] top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/80 shadow-md hover:bg-background/90 transition-colors z-20"
        >
          <ChevronRight className="w-5 h-5 text-foreground/60" />
        </button>
      )}
    </div>
  );
} 