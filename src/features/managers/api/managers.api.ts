import { apiGet } from "@/lib/axios";
import type { ManagerListResponse, ManagerSingleResponse, ManagerQueryParams } from "@/features/managers/types";

function buildQueryString(params: ManagerQueryParams): string {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.platform) query.set("platform", params.platform);
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.sortOrder) query.set("sortOrder", params.sortOrder);
  const str = query.toString();
  return str ? `?${str}` : "";
}

export async function getManagers(params: ManagerQueryParams = {}): Promise<ManagerListResponse> {
  const queryString = buildQueryString(params);
  return apiGet<ManagerListResponse>(`/managers${queryString}`);
}

export async function getManagerById(id: string): Promise<ManagerSingleResponse> {
  return apiGet<ManagerSingleResponse>(`/managers/${id}`);
}
