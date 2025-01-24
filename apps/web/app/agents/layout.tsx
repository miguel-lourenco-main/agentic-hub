"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function AgentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFromHome = searchParams.get('from') === 'home';

  useEffect(() => {
    if (isFromHome) {
      
      // Replace the current state with the clean URL
      window.history.replaceState(null, '', '/agents');
      
      // Go back and modify the previous entry
      window.history.back();
      
      // Wait for the back navigation to complete
      const handlePop = () => {
        window.history.replaceState(null, '', '/?to=agents');
        window.history.forward();
        window.removeEventListener('popstate', handlePop);
      };
      
      window.addEventListener('popstate', handlePop);
    }

    const handlePopState = () => {
      const url = window.location.pathname + window.location.search;
      if (url.includes('to=agents')) {
        router.push('/');
      } else if (url.includes('from=home')) {
        router.push('/agents');
      } else {
        router.push(url);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isFromHome, router]);

  return (
    <motion.div
      className="flex-1"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
} 