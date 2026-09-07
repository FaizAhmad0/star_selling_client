"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Hash,
  Calendar,
  Building2,
  Check,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/features/users/hooks/use-users";
import { Loading } from "@/components/shared/loading";
import { ErrorState } from "@/components/shared/error-state";
import { cn } from "@/lib/utils";

type StatusValue = string | number | boolean | null | undefined;

const STATUS_STYLES: Record<string, string> = {
  yes: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  no: "bg-muted text-muted-foreground ring-border",
  pending:
    "bg-amber-500/10 text-amber-700 ring-amber-600/20 dark:text-amber-400",
  "not sent": "bg-muted text-muted-foreground ring-border",
  "not done": "bg-muted text-muted-foreground ring-border",
  "not yet": "bg-muted text-muted-foreground ring-border",
  done: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  completed:
    "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  active: "bg-primary/10 text-primary ring-primary/20",
  inactive: "bg-muted text-muted-foreground ring-border",
  live: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  sent: "bg-primary/10 text-primary ring-primary/20",
  received:
    "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
};

function normalizeValue(
  value: unknown,
): string | number | boolean | null | undefined {
  if (value !== null && typeof value === "object") {
    if (Array.isArray(value)) return null;
    const obj = value as { name?: unknown; id?: unknown; _id?: unknown };
    if (typeof obj.name === "string" && obj.name.trim()) return obj.name;
    const fallback = obj.id ?? obj._id;
    if (typeof fallback === "string") return fallback;
    return null;
  }
  return value as string | number | boolean | null | undefined;
}

function isEmptyValue(value: string | number | boolean | null | undefined) {
  return value === null || value === undefined || value === "";
}

function formatDateValue(value: string | number | boolean | null | undefined) {
  if (typeof value !== "string" || !value.trim()) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getStatusStyle(value: string) {
  return (
    STATUS_STYLES[value.toLowerCase()] ??
    "bg-muted text-muted-foreground ring-border"
  );
}

function formatLabel(value: string) {
  return value.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function renderValue(value: string | number | boolean | null | undefined) {
  if (isEmptyValue(value)) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  if (typeof value === "boolean") {
    const label = value ? "Yes" : "No";
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
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

  const isStatusLike = Object.prototype.hasOwnProperty.call(
    STATUS_STYLES,
    normalized.toLowerCase(),
  );
  if (isStatusLike) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
          getStatusStyle(normalized),
        )}
      >
        {formatLabel(normalized)}
      </span>
    );
  }

  return (
    <span className="text-sm font-medium text-foreground">
      {formatLabel(normalized)}
    </span>
  );
}

function DetailField({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-3">
      {Icon && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card">
      <header className="border-b border-border/60 px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </header>
      <div className="grid gap-3 p-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

type PlatformTab = "amazon" | "website";

export default function UserDetail() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { data, isLoading, isError, error, refetch } = useUser(userId);
  const [activeTab, setActiveTab] = useState<PlatformTab>("amazon");

  const user = data?.data;

  const amazonFields = useMemo(() => {
    if (!user) return [];
    return [
      {
        label: "Enrollment ID",
        value: normalizeValue(user.enrollmentIdAmazon),
      },
      { label: "Batch", value: normalizeValue(user.batchAmazon) },
      { label: "Joining Date", value: normalizeValue(user.dateAmazon) },
      { label: "Manager", value: normalizeValue(user.amazonManager) },
    ];
  }, [user]);

  const websiteFields = useMemo(() => {
    if (!user) return [];
    return [
      {
        label: "Enrollment ID",
        value: normalizeValue(user.enrollmentIdWebsite),
      },
      { label: "Batch", value: normalizeValue(user.batchWebsite) },
      { label: "Joining Date", value: normalizeValue(user.dateWebsite) },
      { label: "Manager", value: normalizeValue(user.websiteManager) },
      { label: "Amazon Enrolled", value: normalizeValue(user.amazonEnrolled) },
      { label: "Call Status", value: normalizeValue(user.callStatus) },
      {
        label: "Website Further Process",
        value: normalizeValue(user.websiteFurtherProcess),
      },
      {
        label: "Personal Info Form",
        value: normalizeValue(user.personalInformationsForm),
      },
      {
        label: "Client Info Form",
        value: normalizeValue(user.clientInformationForm),
      },
      { label: "GST", value: normalizeValue(user.haveGst) },
      {
        label: "Further Procedure Recording",
        value: normalizeValue(user.furtherProcedureRecoding),
      },
      { label: "Domain Name", value: normalizeValue(user.domainName) },
      { label: "Domain Status", value: normalizeValue(user.domainStatus) },
      { label: "ID Card", value: normalizeValue(user.idCard) },
      { label: "Leegality", value: normalizeValue(user.leegality) },
      {
        label: "Proforma Invoice",
        value: normalizeValue(user.performaInvoice),
      },
      { label: "OVC", value: normalizeValue(user.ovc) },
      { label: "Theme 3", value: normalizeValue(user.theme3) },
      { label: "Social Media 1", value: normalizeValue(user.socialMedia1) },
      { label: "Banner 50", value: normalizeValue(user.banner50) },
      { label: "Support Portal", value: normalizeValue(user.supportPortal) },
      { label: "Gallery", value: normalizeValue(user.gallery) },
      { label: "Logo", value: normalizeValue(user.logo) },
      { label: "Banner 100", value: normalizeValue(user.banner100) },
      { label: "Server Email", value: normalizeValue(user.serverEmail) },
      {
        label: "Social Media Part 2",
        value: normalizeValue(user.socialMediaPart2),
      },
      {
        label: "Category Selection",
        value: normalizeValue(user.categorySelection),
      },
      {
        label: "Domain Re-confirmations",
        value: normalizeValue(user.domainReconfirmations),
      },
      {
        label: "Server Mail Confirmations",
        value: normalizeValue(user.serverMailConfirmations),
      },
      { label: "Server Purchase", value: normalizeValue(user.serverPurchase) },
      { label: "Website Live", value: normalizeValue(user.websiteLive) },
      { label: "Payments Status", value: normalizeValue(user.paymentsStatus) },
      { label: "Handover", value: normalizeValue(user.handover) },
      { label: "Indian PG Status", value: normalizeValue(user.indianPgStatus) },
      { label: "PayPal", value: normalizeValue(user.paypal) },
      {
        label: "Backend Transferred",
        value: normalizeValue(user.backendTransferred),
      },
      { label: "GST Invoice", value: normalizeValue(user.gstInvoice) },
      { label: "Leegality PDF", value: normalizeValue(user.leegalityPdf) },
      { label: "Website Remark", value: normalizeValue(user.websiteRemark) },
      { label: "Aadhaar Card", value: normalizeValue(user.aadharCard) },
    ];
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <Loading text="Loading user details..." />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <ErrorState
          title="Unable to load user"
          message={error?.message || "User not found."}
          onRetry={() => refetch()}
          className="w-full max-w-xl"
        />
      </div>
    );
  }

  const hasAmazon = !!user.enrollmentIdAmazon;
  const hasWebsite = !!user.enrollmentIdWebsite;
  const activeFields = activeTab === "amazon" ? amazonFields : websiteFields;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="gap-1.5 text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Users
      </Button>

      {/* Header */}
      <div className="rounded-xl border border-border/70 bg-card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <User className="size-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {user.name}
                </h1>
                <p className="text-xs text-muted-foreground">UID{user.uid}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
                getStatusStyle(user.tokenVersion >= 0 ? "active" : "inactive"),
              )}
            >
              {user.tokenVersion >= 0 ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Basic Info Grid */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailField
            label="Email"
            value={
              <a
                href={`mailto:${user.email}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {user.email}
              </a>
            }
            icon={Mail}
          />
          <DetailField
            label="Phone"
            value={
              <span className="text-sm font-medium text-foreground">
                {user.primaryContact || "—"}
              </span>
            }
            icon={Phone}
          />
          <DetailField
            label="GST"
            value={
              <span className="text-sm font-medium text-foreground">
                {user.gst || "—"}
              </span>
            }
            icon={Hash}
          />
          <DetailField
            label="Enrolled By"
            value={
              <span className="text-sm font-medium text-foreground">
                {user.enrolledBy || "—"}
              </span>
            }
            icon={Building2}
          />
        </div>

        {/* Platforms */}
        {user.platforms && user.platforms.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">Platforms</p>
            <div className="flex flex-wrap gap-1.5">
              {user.platforms.map((p) => (
                <span
                  key={p._id}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Platform Toggle */}
      {(hasAmazon || hasWebsite) && (
        <div className="rounded-xl border border-border/70 bg-card">
          <div className="flex border-b border-border/60">
            {hasAmazon && (
              <button
                type="button"
                onClick={() => setActiveTab("amazon")}
                className={cn(
                  "flex-1 px-4 py-3 text-sm font-medium transition-colors",
                  activeTab === "amazon"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Amazon
              </button>
            )}
            {hasWebsite && (
              <button
                type="button"
                onClick={() => setActiveTab("website")}
                className={cn(
                  "flex-1 px-4 py-3 text-sm font-medium transition-colors",
                  activeTab === "website"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Website
              </button>
            )}
          </div>

          <div className="p-4">
            {activeTab === "amazon" && (
              <SectionCard title="Amazon Details">
                {amazonFields.map((field) => (
                  <DetailField
                    key={field.label}
                    label={field.label}
                    value={renderValue(field.value)}
                  />
                ))}
              </SectionCard>
            )}

            {activeTab === "website" && (
              <div className="space-y-4">
                {/* Enrollment & Contact */}
                <SectionCard title="Enrollment & Contact">
                  {websiteFields.slice(0, 4).map((field) => (
                    <DetailField
                      key={field.label}
                      label={field.label}
                      value={renderValue(field.value)}
                    />
                  ))}
                </SectionCard>

                {/* Onboarding */}
                <SectionCard title="Onboarding">
                  {websiteFields.slice(4, 11).map((field) => (
                    <DetailField
                      key={field.label}
                      label={field.label}
                      value={renderValue(field.value)}
                    />
                  ))}
                </SectionCard>

                {/* Domain */}
                <SectionCard title="Domain Setup">
                  {websiteFields.slice(11, 13).map((field) => (
                    <DetailField
                      key={field.label}
                      label={field.label}
                      value={renderValue(field.value)}
                    />
                  ))}
                </SectionCard>

                {/* Documents */}
                <SectionCard title="Documents">
                  {websiteFields.slice(13, 17).map((field) => (
                    <DetailField
                      key={field.label}
                      label={field.label}
                      value={renderValue(field.value)}
                    />
                  ))}
                </SectionCard>

                {/* Design Assets */}
                <SectionCard title="Design & Assets">
                  {websiteFields.slice(17, 25).map((field) => (
                    <DetailField
                      key={field.label}
                      label={field.label}
                      value={renderValue(field.value)}
                    />
                  ))}
                </SectionCard>

                {/* Server & Domain */}
                <SectionCard title="Server & Domain">
                  {websiteFields.slice(25, 30).map((field) => (
                    <DetailField
                      key={field.label}
                      label={field.label}
                      value={renderValue(field.value)}
                    />
                  ))}
                </SectionCard>

                {/* Launch & Payment */}
                <SectionCard title="Launch & Payment">
                  {websiteFields.slice(30, 36).map((field) => (
                    <DetailField
                      key={field.label}
                      label={field.label}
                      value={renderValue(field.value)}
                    />
                  ))}
                </SectionCard>

                {/* Final Documents */}
                <SectionCard title="Final Documents">
                  {websiteFields.slice(36).map((field) => (
                    <DetailField
                      key={field.label}
                      label={field.label}
                      value={renderValue(field.value)}
                    />
                  ))}
                </SectionCard>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No platform data */}
      {!hasAmazon && !hasWebsite && (
        <div className="rounded-xl border border-border/70 bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No platform enrollment data found for this user.
          </p>
        </div>
      )}
    </div>
  );
}
