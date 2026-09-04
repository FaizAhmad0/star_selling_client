import { useQuery } from "@tanstack/react-query";
import { getManagers, getManagerById } from "@/features/managers/api/managers.api";
import type { ManagerQueryParams } from "@/features/managers/types";

export function useManagers(params: ManagerQueryParams = {}) {
  return useQuery({
    queryKey: ["managers", params],
    queryFn: () => getManagers(params),
    staleTime: 30_000,
  });
}

export function useManager(id: string) {
  return useQuery({
    queryKey: ["managers", id],
    queryFn: () => getManagerById(id),
    staleTime: 30_000,
    enabled: !!id,
  });
}
