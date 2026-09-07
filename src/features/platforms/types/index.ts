export interface Platform {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformListResponse {
  success: boolean;
  message: string;
  data: Platform[];
}

export interface PlatformQueryParams {
  search?: string;
  status?: string;
}
