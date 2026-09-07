import { useQuery } from "@tanstack/react-query";
import { getPlatforms } from "@/features/platforms/api/platforms.api";
import type { PlatformQueryParams } from "@/features/platforms/types";

export function usePlatforms(params: PlatformQueryParams = {}) {
  return useQuery({
    queryKey: ["platforms", params],
    queryFn: () => getPlatforms(params),
    staleTime: 60_000,
  });
}
