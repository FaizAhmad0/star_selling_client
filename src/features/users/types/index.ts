export interface ManagerRef {
  _id: string;
  name: string;
  email: string;
}

export interface PlatformRef {
  _id: string;
  name: string;
  status: string;
}

export interface User {
  _id: string;
  uid: number;
  name: string;
  email: string;
  primaryContact?: string;
  gst?: string;
  role: "user";
  amazonManager?: ManagerRef | string;
  websiteManager?: ManagerRef | string;
  etsyManager?: ManagerRef | string;
  enrollmentIdAmazon?: string;
  enrollmentIdWebsite?: string;
  enrollmentIdEtsy?: string;
  batchAmazon?: string;
  batchWebsite?: string;
  batchEtsy?: string;
  dateAmazon?: string;
  dateWebsite?: string;
  dateEtsy?: string;
  platforms?: PlatformRef[];
  password?: string;
  enrolledBy?: string;
  tokenVersion: number;
  createdAt: string;
  updatedAt: string;

  amazonEnrolled?: string;
  callStatus?: string;
  websiteFurtherProcess?: string;
  personalInformationsForm?: string;
  clientInformationForm?: string;
  haveGst?: string;
  furtherProcedureRecoding?: string;

  domainName?: string;
  domainStatus?: string;
  idCard?: string;
  leegality?: string;
  performaInvoice?: string;

  ovc?: string;
  theme3?: string;
  socialMedia1?: string;
  banner50?: string;
  supportPortal?: string;
  gallery?: string;
  logo?: string;
  banner100?: string;
  serverEmail?: string;

  socialMediaPart2?: string;
  categorySelection?: string;
  domainReconfirmations?: string;
  serverMailConfirmations?: string;

  serverPurchase?: string;
  websiteLive?: string;
  paymentsStatus?: string;
  handover?: string;
  indianPgStatus?: string;
  paypal?: string;

  backendTransferred?: string;
  gstInvoice?: string;
  leegalityPdf?: string;
  websiteRemark?: string;
  aadharCard?: string;
}

export interface UserListResponse {
  success: boolean;
  message: string;
  data: {
    data: User[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface UserSingleResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface CreateUserInput {
  name: string;
  email: string;
  enrollment: string;
  primaryContact: string;
  date: string;
  batch: string;
  manager: string;
  enrolledBy?: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  primaryContact?: string;
  platforms?: string[];
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  manager?: string;
  batch?: string;
  joiningDateFrom?: string;
  joiningDateTo?: string;
  platform?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface BulkUploadResult {
  created: User[];
  updated: User[];
  skipped: { enrollment: string; primaryContact: string; reason: string }[];
}
