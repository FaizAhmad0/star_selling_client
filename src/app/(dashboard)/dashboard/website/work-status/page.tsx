"use client";

import { useMemo } from "react";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Globe,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/shared/error-state";
import { Loading } from "@/components/shared/loading";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import type { AuthUser } from "@/features/auth/types";
import { cn } from "@/lib/utils";

type StatusValue = string | number | boolean | null | undefined;

type WebsiteWorkStatusUser = AuthUser & {
  primaryContact?: string | null;
  batchWebsite?: StatusValue;
  dateWebsite?: StatusValue;
  websiteManager?: StatusValue;
  amazonEnrolled?: StatusValue;
  callStatus?: StatusValue;
  websiteFurtherProcess?: StatusValue;
  personalInformationsForm?: StatusValue;
  clientInformationForm?: StatusValue;
  gstNumber?: StatusValue;
  furtherProcedureRecoding?: StatusValue;
  domainName?: StatusValue;
  domainStatus?: StatusValue;
  idCard?: StatusValue;
  leegality?: StatusValue;
  performaInvoice?: StatusValue;
  ovc?: StatusValue;
  theme3?: StatusValue;
  socialMedia1?: StatusValue;
  banner50?: StatusValue;
  supportPortal?: StatusValue;
  gallery?: StatusValue;
  logo?: StatusValue;
  banner100?: StatusValue;
  serverEmail?: StatusValue;
  socialMediaPart2?: StatusValue;
  categorySelection?: StatusValue;
  domainReconfirmations?: StatusValue;
  serverMailConfirmations?: StatusValue;
  serverPurchase?: StatusValue;
  websiteLive?: StatusValue;
  paymentsStatus?: StatusValue;
  handover?: StatusValue;
  indianPgStatus?: StatusValue;
  paypal?: StatusValue;
  backendTransferred?: StatusValue;
  gstInvoice?: StatusValue;
  leegalityPdf?: StatusValue;
  websiteRemark?: StatusValue;
  aadharCard?: StatusValue;
};

type SectionField = {
  label: string;
  key: keyof WebsiteWorkStatusUser;
};

type SectionConfig = {
  title: string;
  description: string;
  icon: typeof UserRound;
  fields: SectionField[];
};

const STATUS_STYLES: Record<string, string> = {
  yes: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20",
  no: "bg-rose-500/12 text-rose-700 ring-rose-500/20",
  pending: "bg-amber-500/12 text-amber-700 ring-amber-500/20",
  "not sent": "bg-slate-500/12 text-slate-700 ring-slate-500/20",
  "not done": "bg-slate-500/12 text-slate-700 ring-slate-500/20",
  "not yet": "bg-slate-500/12 text-slate-700 ring-slate-500/20",
  done: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20",
  completed: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20",
  active: "bg-blue-500/12 text-blue-700 ring-blue-500/20",
  inactive: "bg-slate-500/12 text-slate-700 ring-slate-500/20",
  live: "bg-indigo-500/12 text-indigo-700 ring-indigo-500/20",
  "in progress": "bg-amber-500/12 text-amber-700 ring-amber-500/20",
  submitted: "bg-blue-500/12 text-blue-700 ring-blue-500/20",
  approved: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20",
  rejected: "bg-rose-500/12 text-rose-700 ring-rose-500/20",
  sent: "bg-blue-500/12 text-blue-700 ring-blue-500/20",
  received: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20",
  paid: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20",
  unpaid: "bg-rose-500/12 text-rose-700 ring-rose-500/20",
};

const SECTION_CONFIGS: SectionConfig[] = [
  {
    title: "Enrollment",
    description: "Core profile and website enrollment details.",
    icon: BadgeCheck,
    fields: [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Primary Contact", key: "primaryContact" },
      { label: "Website Enrollment ID", key: "enrollmentIdWebsite" },
      { label: "Website Batch", key: "batchWebsite" },
      { label: "Website Enrollment Date", key: "dateWebsite" },
      { label: "Website Manager", key: "websiteManager" },
      { label: "Amazon Enrolled", key: "amazonEnrolled" },
    ],
  },
  {
    title: "Initial Process",
    description: "Early onboarding and form completion status.",
    icon: CalendarDays,
    fields: [
      { label: "Call Status", key: "callStatus" },
      { label: "Website Further Process", key: "websiteFurtherProcess" },
      { label: "Personal Informations Form", key: "personalInformationsForm" },
      { label: "Client Information Form", key: "clientInformationForm" },
      { label: "GST Number", key: "gstNumber" },
      { label: "Further Procedure Recoding", key: "furtherProcedureRecoding" },
    ],
  },
  {
    title: "Business & Documentation",
    description: "Identity and documentation checkpoints.",
    icon: ShieldCheck,
    fields: [
      { label: "ID Card", key: "idCard" },
      { label: "Aadhar Card", key: "aadharCard" },
      { label: "Leegality", key: "leegality" },
      { label: "Performa Invoice", key: "performaInvoice" },
      { label: "GST Invoice", key: "gstInvoice" },
      { label: "Leegality PDF", key: "leegalityPdf" },
      { label: "Remark", key: "websiteRemark" },
    ],
  },
  {
    title: "Domain & Server",
    description: "Domain registration and server setup progress.",
    icon: Globe,
    fields: [
      { label: "Domain Name", key: "domainName" },
      { label: "Domain Status", key: "domainStatus" },
      { label: "Domain Reconfirmations", key: "domainReconfirmations" },
      { label: "Server Email", key: "serverEmail" },
      { label: "Server Mail Confirmations", key: "serverMailConfirmations" },
      { label: "Server Purchase", key: "serverPurchase" },
    ],
  },
  {
    title: "Design & Content",
    description: "Creative, layout, and content assets.",
    icon: Building2,
    fields: [
      { label: "Theme 3", key: "theme3" },
      { label: "Social Media 1", key: "socialMedia1" },
      { label: "Banner 50", key: "banner50" },
      { label: "Support Portal", key: "supportPortal" },
      { label: "Gallery", key: "gallery" },
      { label: "Logo", key: "logo" },
      { label: "Banner 100", key: "banner100" },
      { label: "Social Media Part 2", key: "socialMediaPart2" },
      { label: "Category Selection", key: "categorySelection" },
    ],
  },
  {
    title: "Website & Payment",
    description: "Launch readiness and payment integrations.",
    icon: Mail,
    fields: [
      { label: "OVC", key: "ovc" },
      { label: "Payments Status", key: "paymentsStatus" },
      { label: "Indian PG Status", key: "indianPgStatus" },
      { label: "PayPal", key: "paypal" },
      { label: "Backend Transferred", key: "backendTransferred" },
    ],
  },
  {
    title: "Completion",
    description: "Final handoff and go-live stage.",
    icon: UserRound,
    fields: [
      { label: "Website Live", key: "websiteLive" },
      { label: "Handover", key: "handover" },
    ],
  },
];

function isEmptyValue(value: StatusValue) {
  return value === null || value === undefined || value === "";
}

function formatDateValue(value: StatusValue) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatLabel(value: string) {
  return value.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function getStatusStyle(value: string) {
  return STATUS_STYLES[value.toLowerCase()] ?? "bg-slate-500/12 text-slate-700 ring-slate-500/20";
}

function renderValue(value: StatusValue, key: keyof WebsiteWorkStatusUser) {
  if (isEmptyValue(value)) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  if (typeof value === "boolean") {
    const label = value ? "Yes" : "No";
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
          getStatusStyle(label),
        )}
      >
        {label}
      </span>
    );
  }

  if (typeof value === "number") {
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  }

  const normalized = value.trim();
  if (!normalized) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  if (key === "dateWebsite") {
    const formatted = formatDateValue(normalized);
    if (formatted) {
      return <span className="text-sm font-medium text-foreground">{formatted}</span>;
    }
  }

  const statusStyle = getStatusStyle(normalized);
  const isStatusLike = Object.prototype.hasOwnProperty.call(
    STATUS_STYLES,
    normalized.toLowerCase(),
  );

  if (isStatusLike) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
          statusStyle,
        )}
      >
        {formatLabel(normalized)}
      </span>
    );
  }

  return <span className="text-sm font-medium text-foreground">{formatLabel(normalized)}</span>;
}

function FieldItem({
  label,
  value,
  fieldKey,
}: {
  label: string;
  value: StatusValue;
  fieldKey: keyof WebsiteWorkStatusUser;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/60 p-4 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 break-words">{renderValue(value, fieldKey)}</div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  icon: Icon,
  fields,
  user,
}: SectionConfig & { user: WebsiteWorkStatusUser }) {
  return (
    <Card className="border-border/60 bg-card/80 shadow-sm backdrop-blur-sm">
      <CardHeader className="border-b border-border/50 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/50 p-3 text-muted-foreground">
            <Icon className="size-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {fields.map((field) => (
            <FieldItem
              key={field.label}
              label={field.label}
              fieldKey={field.key}
              value={user[field.key]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function WebsiteWorkStatusPage() {
  const { data, error, isLoading, refetch, isFetching } = useCurrentUser();

  const user = data as WebsiteWorkStatusUser | undefined;

  const summaryItems = useMemo(
    () => [
      { label: "Website Enrollment ID", value: user?.enrollmentIdWebsite ?? "—", key: "enrollmentIdWebsite" },
      { label: "Website Batch", value: user?.batchWebsite ?? "—", key: "batchWebsite" },
      { label: "Website Manager", value: user?.websiteManager ?? "—", key: "websiteManager" },
      { label: "Amazon Enrolled", value: user?.amazonEnrolled ?? "—", key: "amazonEnrolled" },
    ],
    [user],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <Loading text="Loading work status..." />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <ErrorState
          title="Unable to load work status"
          message="We couldn't fetch the authenticated user's website work-status details."
          onRetry={() => refetch()}
          className="w-full max-w-xl"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/40 p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Globe className="size-3.5" />
              Website Work Status
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                {user.name}
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                View-only website enrollment and workflow progress for the currently logged-in user.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {item.label}
                </p>
                <div className="mt-2">
                  {renderValue(item.value as StatusValue, item.key as keyof WebsiteWorkStatusUser)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-muted-foreground">Name</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{user.name || "—"}</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-muted-foreground">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="break-words text-lg font-semibold">{user.email || "—"}</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Primary Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{user.primaryContact || user.phone || "—"}</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Website Enrollment Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {renderValue(user.dateWebsite, "dateWebsite")}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={cn("space-y-4", isFetching && "opacity-90")}>
        {SECTION_CONFIGS.map((section) => (
          <SectionCard key={section.title} {...section} user={user} />
        ))}
      </div>
    </div>
  );
}
