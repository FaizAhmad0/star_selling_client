"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers, useDeleteUser } from "@/features/users/hooks/use-users";
import { UsersTable } from "@/features/users/components/users-data-table";
import { UsersFilter } from "@/features/users/components/users-filter";
import type { User } from "@/features/users/types";

const LIMIT = 10;

export default function UsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const basePath = pathname.replace(/\/users.*$/, "");

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const manager = searchParams.get("manager") || "";
  const batch = searchParams.get("batch") || "";
  const platform = searchParams.get("platform") || "";
  const joiningDateFrom = searchParams.get("joiningDateFrom") || "";
  const joiningDateTo = searchParams.get("joiningDateTo") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const deleteMutation = useDeleteUser();
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
    (newPage: number) => {
      updateParams({ page: String(newPage) });
    },
    [updateParams]
  );

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      updateParams({ [key]: value, page: "1" });
    },
    [updateParams]
  );

  const handleApplyFilters = useCallback(() => {
    updateParams({ page: "1" });
  }, [updateParams]);

  const handleClearFilters = useCallback(() => {
    updateParams({
      status: "",
      manager: "",
      batch: "",
      platform: "",
      joiningDateFrom: "",
      joiningDateTo: "",
      page: "1",
    });
  }, [updateParams]);

  const { data, isLoading, isError, refetch } = useUsers({
    page,
    limit: LIMIT,
    search: search || undefined,
    status: (status as "active" | "inactive") || undefined,
    manager: manager || undefined,
    batch: batch || undefined,
    platform: (platform as "amazon" | "website" | "etsy") || undefined,
    joiningDateFrom: joiningDateFrom || undefined,
    joiningDateTo: joiningDateTo || undefined,
    sortBy: sortBy || undefined,
    sortOrder: (sortOrder as "asc" | "desc") || undefined,
  });

  const users = data?.data?.data ?? [];
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
    { label: "Manager", key: "manager", type: "manager-select" as const },
    { label: "Batch", key: "batch", type: "text" as const },
    {
      label: "Status",
      key: "status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    { label: "Joining Date", key: "joiningDate", type: "date" as const },
  ];

  const activeFilters: Record<string, string> = {};
  if (status) activeFilters.status = status;
  if (manager) activeFilters.manager = manager;
  if (batch) activeFilters.batch = batch;
  if (platform) activeFilters.platform = platform;
  if (joiningDateFrom) activeFilters.joiningDateFrom = joiningDateFrom;
  if (joiningDateTo) activeFilters.joiningDateTo = joiningDateTo;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <svg
            className="size-6 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Failed to load users
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Users className="size-4 text-primary" />
            </div>
            <h1 className="font-heading text-xl font-semibold text-foreground">
              User Details
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage, search and monitor users across managers, batches and platforms.
          </p>
        </div>
      </div>

      {/* Search + Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            key={search}
            placeholder="Search users..."
            defaultValue={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
        <UsersFilter
          filters={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Data Table */}
      <UsersTable
        users={users}
        meta={meta}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onView={(user) => router.push(`${basePath}/users/${user._id}`)}
        onEdit={(user) => setEditingUser(user)}
        onDelete={(user) => deleteMutation.mutate(user._id)}
      />
    </div>
  );
}
