export interface PlatformRef {
  _id: string;
  name: string;
  status: string;
}

export interface Manager {
  _id: string;
  uid: number;
  name: string;
  email: string;
  primaryContact?: string;
  role: "manager";
  platform?: PlatformRef;
  assignedUsers: number;
  createdAt: string;
  updatedAt: string;
}

export interface ManagerListResponse {
  success: boolean;
  message: string;
  data: {
    data: Manager[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ManagerSingleResponse {
  success: boolean;
  message: string;
  data: Manager;
}

export interface ManagerQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  platform?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
