"use client";

import { useCallback, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useManagers } from "@/features/managers/hooks/use-managers";
import { ManagersTable } from "@/features/managers/components/managers-data-table";
import { ManagersFilter } from "@/features/managers/components/managers-filter";

const LIMIT = 10;

export default function ManagersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const basePath = pathname.replace(/\/managers.*$/, "");

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const platform = searchParams.get("platform") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        updateParams({ search: value, page: "1" });
      }, 400);
    },
    [updateParams]
  );

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => updateParams({ page: String(newPage) }),
    [updateParams]
  );

  const handleFilterChange = useCallback(
    (key: string, value: string) => updateParams({ [key]: value, page: "1" }),
    [updateParams]
  );

  const handleApplyFilters = useCallback(() => updateParams({ page: "1" }), [updateParams]);

  const handleClearFilters = useCallback(
    () => updateParams({ platform: "", page: "1" }),
    [updateParams]
  );

  const { data, isLoading, isError, refetch } = useManagers({
    page,
    limit: LIMIT,
    search: search || undefined,
    platform: (platform as "amazon" | "website" | "etsy") || undefined,
    sortBy: sortBy || undefined,
    sortOrder: (sortOrder as "asc" | "desc") || undefined,
  });

  const managers = data?.data?.data ?? [];
  const meta = data?.data?.meta ?? { page: 1, limit: LIMIT, total: 0, totalPages: 0 };

  const filterGroups = [
    {
      label: "Platform",
      key: "platform",
      type: "platform-select" as const,
      options: [
        { label: "Amazon", value: "amazon" },
        { label: "Website", value: "website" },
        { label: "Etsy", value: "etsy" },
      ],
    },
  ];

  const activeFilters: Record<string, string> = {};
  if (platform) activeFilters.platform = platform;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <svg className="size-6 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Failed to load managers</p>
          <p className="mt-1 text-xs text-muted-foreground">Please check your connection and try again.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Users className="size-4 text-primary" />
            </div>
            <h1 className="font-heading text-xl font-semibold text-foreground">Managers</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage and monitor all managers, their platforms and assigned users.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            key={search}
            placeholder="Search managers..."
            defaultValue={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
        <ManagersFilter
          filters={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </div>

      <ManagersTable
        managers={managers}
        meta={meta}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onView={(manager) => router.push(`${basePath}/managers/${manager._id}`)}
        onEdit={(manager) => router.push(`${basePath}/managers/${manager._id}`)}
      />
    </div>
  );
}
