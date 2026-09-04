"use client";

import { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { User, ManagerRef, PlatformRef } from "@/features/users/types";

function getManagerName(manager: ManagerRef | string | undefined): string {
  if (!manager) return "\u2014";
  if (typeof manager === "string") return manager;
  return manager.name || "\u2014";
}

function getAllEnrollments(user: User): { platform: string; id: string }[] {
  const enrollments: { platform: string; id: string }[] = [];
  if (user.enrollmentIdAmazon) enrollments.push({ platform: "Amazon", id: user.enrollmentIdAmazon });
  if (user.enrollmentIdWebsite) enrollments.push({ platform: "Website", id: user.enrollmentIdWebsite });
  if (user.enrollmentIdEtsy) enrollments.push({ platform: "Etsy", id: user.enrollmentIdEtsy });
  return enrollments;
}

function getBatch(user: User): string {
  return user.batchAmazon || user.batchWebsite || user.batchEtsy || "\u2014";
}

function getManager(user: User): string {
  return getManagerName(user.amazonManager || user.websiteManager || user.etsyManager);
}

function PlatformsCell({ platforms }: { platforms?: PlatformRef[] }) {
  if (!platforms || platforms.length === 0) return <span className="text-xs text-muted-foreground">\u2014</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {platforms.map((p) => (
        <span key={p._id} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          {p.name}
        </span>
      ))}
    </div>
  );
}

interface UsersTableProps {
  users: User[];
  meta: { page: number; limit: number; total: number; totalPages: number };
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete?: (user: User) => void;
  maskPhone?: boolean;
}

function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length <= 4) return phone;
  return "X".repeat(phone.length - 4) + phone.slice(-4);
}

function ConfirmDelete({ onConfirm, children }: { onConfirm: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">{children}</span>
      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-80 rounded-lg border border-border bg-card p-4 shadow-lg">
            <p className="text-sm font-medium text-foreground">Delete user</p>
            <p className="mt-1 text-xs text-muted-foreground">This action cannot be undone.</p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => { onConfirm(); setOpen(false); }} className="rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90">Delete</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function UsersTable({ users, meta, isLoading, onPageChange, onView, onEdit, onDelete, maskPhone }: UsersTableProps) {
  const columns: TableProps<User>["columns"] = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        const initials = record.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
        return (
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{initials}</div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">{record.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{record.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
      responsive: ["sm"],
      render: (val: number) => <span className="font-mono text-xs text-foreground">{val ? `UID${val}` : "\u2014"}</span>,
    },
    {
      title: "Enrollment",
      key: "enrollment",
      responsive: ["sm"],
      render: (_, record) => {
        const enrollments = getAllEnrollments(record);
        if (enrollments.length === 0) return <span className="text-xs text-muted-foreground">\u2014</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {enrollments.map((e) => (
              <span key={e.platform} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <span className="text-muted-foreground">{e.platform}:</span>
                <span className="font-mono">{e.id}</span>
              </span>
            ))}
          </div>
        );
      },
    },
    {
      title: "Contact",
      dataIndex: "primaryContact",
      key: "primaryContact",
      responsive: ["md"],
      render: (val: string) => {
        const display = maskPhone && val ? maskPhoneNumber(val) : val;
        return <span className="text-xs text-muted-foreground">{display || "\u2014"}</span>;
      },
    },
    {
      title: "Platforms",
      key: "platforms",
      responsive: ["lg"],
      render: (_, record) => <PlatformsCell platforms={record.platforms} />,
    },
    {
      title: "Manager",
      key: "manager",
      responsive: ["lg"],
      render: (_, record) => <span className="text-xs text-muted-foreground">{getManager(record)}</span>,
    },
    {
      title: "Batch",
      key: "batch",
      responsive: ["lg"],
      render: (_, record) => <span className="text-xs text-muted-foreground">{getBatch(record)}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      width: onDelete ? 120 : 80,
      fixed: "right",
      render: (_, record) => (
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onView(record)}
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="View"
          >
            <Eye className="size-3.5" />
          </button>
          <button
            onClick={() => onEdit(record)}
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Edit"
          >
            <Pencil className="size-3.5" />
          </button>
          {onDelete && (
            <ConfirmDelete onConfirm={() => onDelete(record)}>
              <button
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Delete"
              >
                <Trash2 className="size-3.5" />
              </button>
            </ConfirmDelete>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table<User>
        columns={columns}
        dataSource={users}
        bordered
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: meta.page,
          pageSize: meta.limit,
          total: meta.total,
          showSizeChanger: false,
          showTotal: (total, range) => `Showing ${range[0]}\u2013${range[1]} of ${total} users`,
          onChange: (page) => onPageChange(page),
        }}
        scroll={{ x: 1000 }}
        size="middle"
      />
    </div>
  );
}
