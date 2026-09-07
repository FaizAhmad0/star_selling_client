import { apiGet } from "@/lib/axios";
import type { PlatformListResponse, PlatformQueryParams } from "@/features/platforms/types";

export async function getPlatforms(params: PlatformQueryParams = {}): Promise<PlatformListResponse> {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  const str = query.toString();
  return apiGet<PlatformListResponse>(`/platforms${str ? `?${str}` : ""}`);
}
