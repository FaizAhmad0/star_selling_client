"use client";

import { useMemo } from "react";
import { Check, ExternalLink } from "lucide-react";
import { ErrorState } from "@/components/shared/error-state";
import { Loading } from "@/components/shared/loading";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import type { AuthUser } from "@/features/auth/types";
import { cn } from "@/lib/utils";

type StatusValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { _id?: string; id?: string; name?: string };

type WebsiteWorkStatusUser = AuthUser & {
  primaryContact?: string | null;
  enrollmentIdWebsite?: StatusValue;
  batchWebsite?: StatusValue;
  dateWebsite?: StatusValue;
  websiteManager?: StatusValue;
  amazonEnrolled?: StatusValue;
  callStatus?: StatusValue;
  websiteFurtherProcess?: StatusValue;
  personalInformationsForm?: StatusValue;
  clientInformationForm?: StatusValue;
  haveGst?: StatusValue;
  gst?: StatusValue;
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

type StageField = {
  label: string;
  key: keyof WebsiteWorkStatusUser;
};

type FieldGroup = {
  title: string;
  fields: StageField[];
};

type StageConfig = {
  step: string;
  title: string;
  shortLabel: string;
  description: string;
  groups: FieldGroup[];
};

const STATUS_STYLES: Record<string, string> = {
  yes: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  no: "bg-muted text-muted-foreground ring-border",
  pending: "bg-amber-500/10 text-amber-700 ring-amber-600/20 dark:text-amber-400",
  "not sent": "bg-muted text-muted-foreground ring-border",
  "not done": "bg-muted text-muted-foreground ring-border",
  "not yet": "bg-muted text-muted-foreground ring-border",
  done: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  "purchase done": "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  completed: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  active: "bg-primary/10 text-primary ring-primary/20",
  inactive: "bg-muted text-muted-foreground ring-border",
  live: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  handover: "bg-primary/10 text-primary ring-primary/20",
  "in progress": "bg-amber-500/10 text-amber-700 ring-amber-600/20 dark:text-amber-400",
  submitted: "bg-primary/10 text-primary ring-primary/20",
  approved: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  rejected: "bg-rose-500/10 text-rose-700 ring-rose-600/20 dark:text-rose-400",
  sent: "bg-primary/10 text-primary ring-primary/20",
  received: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  paid: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  unpaid: "bg-rose-500/10 text-rose-700 ring-rose-600/20 dark:text-rose-400",
};

const STAGE_CONFIGS: StageConfig[] = [
  {
    step: "STEP 01",
    title: "Initial Setup & Information",
    shortLabel: "Initial Setup",
    description: "Enrollment, contact, onboarding and domain setup",
    groups: [
      {
        title: "Enrollment",
        fields: [
          { label: "Website Enrollment Date", key: "dateWebsite" },
          { label: "Website Enrollment ID", key: "enrollmentIdWebsite" },
          { label: "Website Batch", key: "batchWebsite" },
          { label: "Amazon Enrolled", key: "amazonEnrolled" },
        ],
      },
      {
        title: "Contact",
        fields: [
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Primary Contact", key: "primaryContact" },
        ],
      },
      {
        title: "Onboarding",
        fields: [
          { label: "Call Status", key: "callStatus" },
          { label: "Website Further Process", key: "websiteFurtherProcess" },
          { label: "Personal Information Form", key: "personalInformationsForm" },
          { label: "Client Information Form", key: "clientInformationForm" },
          { label: "GST Number", key: "gstNumber" },
          { label: "Further Procedure Recording", key: "furtherProcedureRecoding" },
        ],
      },
      {
        title: "Domain Setup",
        fields: [
          { label: "Domain Name", key: "domainName" },
          { label: "Domain Status", key: "domainStatus" },
        ],
      },
    ],
  },
  {
    step: "STEP 02",
    title: "Documents, Design & Development",
    shortLabel: "Development",
    description: "Documentation, creative assets and server setup",
    groups: [
      {
        title: "Documents",
        fields: [
          { label: "ID Card", key: "idCard" },
          { label: "Leegality", key: "leegality" },
          { label: "Performa Invoice", key: "performaInvoice" },
          { label: "OVC", key: "ovc" },
        ],
      },
      {
        title: "Design Assets",
        fields: [
          { label: "Theme - 3", key: "theme3" },
          { label: "Banner - 50", key: "banner50" },
          { label: "Banner - 100", key: "banner100" },
          { label: "Logo", key: "logo" },
          { label: "Gallery", key: "gallery" },
          { label: "Support Portal", key: "supportPortal" },
        ],
      },
      {
        title: "Content & Social",
        fields: [
          { label: "Social Media - 1", key: "socialMedia1" },
          { label: "Social Media Part - 2", key: "socialMediaPart2" },
          { label: "Category Selection", key: "categorySelection" },
        ],
      },
      {
        title: "Server & Domain",
        fields: [
          { label: "Server Email", key: "serverEmail" },
          { label: "Domain Re-confirmations", key: "domainReconfirmations" },
          { label: "Server Mail Confirmations", key: "serverMailConfirmations" },
          { label: "Server Purchase", key: "serverPurchase" },
        ],
      },
    ],
  },
  {
    step: "STEP 03",
    title: "Finalization & Handover",
    shortLabel: "Finalization",
    description: "Go-live, payments and closing documents",
    groups: [
      {
        title: "Launch",
        fields: [{ label: "Website Live", key: "websiteLive" }],
      },
      {
        title: "Payment & Gateway",
        fields: [
          { label: "Payments Status", key: "paymentsStatus" },
          { label: "Indian PG Status", key: "indianPgStatus" },
          { label: "PayPal", key: "paypal" },
          { label: "Backend Transferred", key: "backendTransferred" },
        ],
      },
      {
        title: "Handover",
        fields: [
          { label: "Handover", key: "handover" },
          { label: "Website Remark", key: "websiteRemark" },
        ],
      },
      {
        title: "Final Documents",
        fields: [
          { label: "GST Invoice", key: "gstInvoice" },
          { label: "Leegality PDF", key: "leegalityPdf" },
          { label: "Aadhaar Card", key: "aadharCard" },
        ],
      },
    ],
  },
];

const URL_KEYS: Array<keyof WebsiteWorkStatusUser> = [
  "domainName",
  "gstInvoice",
  "leegalityPdf",
  "aadharCard",
  "idCard",
  "performaInvoice",
  "serverEmail",
  "websiteRemark",
];

function normalizeValue(value: unknown): string | number | boolean | null | undefined {
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

function resolveDisplayValue(
  user: WebsiteWorkStatusUser,
  key: keyof WebsiteWorkStatusUser,
): string | number | boolean | null | undefined {
  if (key === "gstNumber") {
    const direct = normalizeValue(user.gstNumber);
    if (direct !== null && direct !== undefined && direct !== "") return direct;
    return normalizeValue(user.gst);
  }
  return normalizeValue((user as unknown as Record<string, unknown>)[key as string]);
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

function formatLabel(value: string) {
  return value.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function getStatusStyle(value: string) {
  return STATUS_STYLES[value.toLowerCase()] ?? "bg-muted text-muted-foreground ring-border";
}

function toLinkHref(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes(" ")) return null;
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      new URL(trimmed);
      return trimmed;
    } catch {
      return null;
    }
  }
  if (/^www\./i.test(trimmed)) {
    try {
      new URL(`https://${trimmed}`);
      return `https://${trimmed}`;
    } catch {
      return null;
    }
  }
  if (/^[^\s@]+\.[a-z]{2,}(\/\S*)?$/i.test(trimmed) && !trimmed.includes("@")) {
    try {
      new URL(`https://${trimmed}`);
      return `https://${trimmed}`;
    } catch {
      return null;
    }
  }
  return null;
}

function renderValue(value: string | number | boolean | null | undefined, fieldKey: keyof WebsiteWorkStatusUser) {
  if (isEmptyValue(value)) {
    return <span className="text-[13px] text-muted-foreground">—</span>;
  }

  if (typeof value === "boolean") {
    const label = value ? "Yes" : "No";
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
          getStatusStyle(label),
        )}
      >
        {label}
      </span>
    );
  }

  if (typeof value === "number") {
    return <span className="text-[13px] font-medium text-foreground">{value}</span>;
  }

  const normalized = value.trim();
  if (!normalized) {
    return <span className="text-[13px] text-muted-foreground">—</span>;
  }

  if (fieldKey === "dateWebsite") {
    const formatted = formatDateValue(normalized);
    if (formatted) {
      return <span className="text-[13px] font-medium text-foreground">{formatted}</span>;
    }
  }

  if (fieldKey === "email") {
    return (
      <a
        href={`mailto:${normalized}`}
        className="break-all text-[13px] font-medium text-primary hover:underline underline-offset-4"
      >
        {normalized}
      </a>
    );
  }

  const href = URL_KEYS.includes(fieldKey) || /^https?:\/\//i.test(normalized) ? toLinkHref(normalized) : null;
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex max-w-full items-center gap-1 break-all text-[13px] font-medium text-primary hover:underline underline-offset-4"
      >
        <span className="break-all">{normalized}</span>
        <ExternalLink className="size-3 shrink-0" />
      </a>
    );
  }

  const statusStyle = getStatusStyle(normalized);
  const isStatusLike = Object.prototype.hasOwnProperty.call(STATUS_STYLES, normalized.toLowerCase());

  if (isStatusLike) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
          statusStyle,
        )}
      >
        {formatLabel(normalized)}
      </span>
    );
  }

  return <span className="text-[13px] font-medium text-foreground">{formatLabel(normalized)}</span>;
}

function MetaItem({ label, value, fieldKey }: { label: string; value: string | number | boolean | null | undefined; fieldKey: keyof WebsiteWorkStatusUser }) {
  return (
    <div className="flex min-w-0 items-baseline gap-2">
      <span className="shrink-0 text-xs text-muted-foreground">{label}:</span>
      <span className="min-w-0">{renderValue(value, fieldKey)}</span>
    </div>
  );
}

function FieldRow({
  label,
  value,
  fieldKey,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
  fieldKey: keyof WebsiteWorkStatusUser;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="shrink-0 text-[13px] text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-right">{renderValue(value, fieldKey)}</dd>
    </div>
  );
}

type StageProgress = {
  filled: number;
  total: number;
  percent: number;
  complete: boolean;
};

function Stepper({ progress }: { progress: StageProgress[] }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card">
      <ol className="grid sm:grid-cols-3">
        {STAGE_CONFIGS.map((stage, index) => {
          const p = progress[index] ?? { filled: 0, total: 1, percent: 0, complete: false };
          const isLast = index === STAGE_CONFIGS.length - 1;
          return (
            <li
              key={stage.step}
              className={cn(
                "relative flex gap-3 px-4 py-3.5",
                !isLast && "border-b border-border/60 sm:border-b-0 sm:border-r",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ring-1 ring-inset",
                  p.complete
                    ? "bg-primary text-primary-foreground ring-primary"
                    : "bg-primary/10 text-primary ring-primary/25",
                )}
              >
                {p.complete ? <Check className="size-3.5" /> : index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-foreground">
                  {index + 1}. {stage.shortLabel}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {p.filled} of {p.total} completed
                </span>
                <span className="mt-2 block h-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-primary transition-all"
                    style={{ width: `${p.percent}%` }}
                  />
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StagePanel({ stage, user, progress }: { stage: StageConfig; user: WebsiteWorkStatusUser; progress: StageProgress }) {
  return (
    <section className="rounded-xl border border-border/70 bg-card">
      <header className="flex flex-wrap items-baseline justify-between gap-2 px-4 pt-4 sm:px-5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{stage.step}</p>
          <h2 className="mt-1 text-[15px] font-semibold tracking-tight text-foreground">{stage.title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{stage.description}</p>
        </div>
        <p className="shrink-0 text-xs font-semibold text-muted-foreground tabular-nums">{progress.percent}%</p>
      </header>
      <div className="px-4 pt-3 sm:px-5">
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress.percent}%` }} />
        </div>
      </div>
      <div className="px-4 py-2 sm:px-5">
        {stage.groups.map((group, gi) => (
          <div key={group.title} className={cn(gi > 0 && "border-t border-border/60")}>
            <h3 className="pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {group.title}
            </h3>
            <dl className="grid gap-x-8 md:grid-cols-2 2xl:grid-cols-3">
              {group.fields.map((field) => (
                <div key={String(field.key)} className="border-b border-border/40 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0 2xl:[&:nth-last-child(3)]:border-b-0">
                  <FieldRow
                    label={field.label}
                    fieldKey={field.key}
                    value={resolveDisplayValue(user, field.key)}
                  />
                </div>
              ))}
            </dl>
          </div>
        ))}
        <div className="pb-3" />
      </div>
    </section>
  );
}

export default function WebsiteWorkStatusPage() {
  const { data, error, isLoading, refetch, isFetching } = useCurrentUser();

  const user = data as WebsiteWorkStatusUser | undefined;

  const progress: StageProgress[] = useMemo(() => {
    if (!user) return [];
    return STAGE_CONFIGS.map((stage) => {
      const allFields = stage.groups.flatMap((g) => g.fields);
      const filled = allFields.filter((f) => !isEmptyValue(resolveDisplayValue(user, f.key))).length;
      const total = allFields.length;
      const percent = total === 0 ? 0 : Math.round((filled / total) * 100);
      return { filled, total, percent, complete: total > 0 && filled === total };
    });
  }, [user]);

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
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div className="border-b border-border/60 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Website Work Status
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{user.name}</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Track your website onboarding and project progress.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
          <MetaItem label="Enrollment" fieldKey="enrollmentIdWebsite" value={resolveDisplayValue(user, "enrollmentIdWebsite")} />
          <MetaItem label="Batch" fieldKey="batchWebsite" value={resolveDisplayValue(user, "batchWebsite")} />
          <MetaItem label="Manager" fieldKey="websiteManager" value={resolveDisplayValue(user, "websiteManager")} />
          <MetaItem label="Amazon Enrolled" fieldKey="amazonEnrolled" value={resolveDisplayValue(user, "amazonEnrolled")} />
        </div>
      </div>

      <Stepper progress={progress} />

      <div className={cn("space-y-4", isFetching && "opacity-90")}>
        {STAGE_CONFIGS.map((stage, i) => (
          <StagePanel key={stage.step} stage={stage} user={user} progress={progress[i] ?? { filled: 0, total: 1, percent: 0, complete: false }} />
        ))}
      </div>
    </div>
  );
}
