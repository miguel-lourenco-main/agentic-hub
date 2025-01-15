"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // If we're on the homepage, show a single breadcrumb
  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:inline-flex">
          <BreadcrumbLink
            href="/"
            className="hover:text-foreground transition-colors"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const shouldShow = isLast || index >= segments.length - 2;

          // Format the segment for display (e.g., "agent-details" -> "Agent Details")
          const formattedSegment = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          if (!shouldShow && index === 0) {
            return (
              <React.Fragment key={path}>
                <BreadcrumbSeparator className="hidden md:inline-flex" />
                <BreadcrumbItem className="md:hidden">
                  <BreadcrumbLink
                    href="/"
                    className="hover:text-foreground transition-colors"
                  >
                    ...
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          }

          if (!shouldShow) return null;

          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={path}
                    className="hover:text-foreground transition-colors"
                  >
                    {formattedSegment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
