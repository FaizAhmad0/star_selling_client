"use client";

import { Table } from "antd";
import type { TableProps } from "antd";
import { Eye, Pencil } from "lucide-react";
import type { Manager, PlatformRef } from "@/features/managers/types";

interface ManagersTableProps {
  managers: Manager[];
  meta: { page: number; limit: number; total: number; totalPages: number };
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onView: (manager: Manager) => void;
  onEdit: (manager: Manager) => void;
}

export function ManagersTable({
  managers,
  meta,
  isLoading,
  onPageChange,
  onView,
  onEdit,
}: ManagersTableProps) {
  const columns: TableProps<Manager>["columns"] = [
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
      responsive: ["sm"],
      render: (val: number) => (
        <span className="font-mono text-xs text-foreground">
          {val ? `UID${val}` : "\u2014"}
        </span>
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["md"],
      render: (val: string) => (
        <span className="text-xs text-muted-foreground">{val || "\u2014"}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      render: (val: string) => (
        <span className="text-xs text-muted-foreground">{val || "\u2014"}</span>
      ),
    },

    {
      title: "Contact",
      dataIndex: "primaryContact",
      key: "primaryContact",
      responsive: ["md"],
      render: (val: string) => (
        <span className="text-xs text-muted-foreground">{val || "\u2014"}</span>
      ),
    },
    {
      title: "Platform",
      key: "platform",
      responsive: ["lg"],
      render: (_, record) => {
        if (!record.platform)
          return <span className="text-xs text-muted-foreground">\u2014</span>;
        return (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {record.platform.name}
          </span>
        );
      },
    },
    {
      title: "Assigned Users",
      dataIndex: "assignedUsers",
      key: "assignedUsers",
      responsive: ["lg"],
      render: (val: number) => (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          {val ?? 0}
        </span>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   width: 80,
    //   fixed: "right",
    //   render: (_, record) => (
    //     <div className="flex items-center gap-0.5">
    //       <button
    //         onClick={() => onView(record)}
    //         className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    //         title="View"
    //       >
    //         <Eye className="size-3.5" />
    //       </button>
    //       <button
    //         onClick={() => onEdit(record)}
    //         className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    //         title="Edit"
    //       >
    //         <Pencil className="size-3.5" />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table<Manager>
        columns={columns}
        dataSource={managers}
        bordered
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: meta.page,
          pageSize: meta.limit,
          total: meta.total,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `Showing ${range[0]}\u2013${range[1]} of ${total} managers`,
          onChange: (page) => onPageChange(page),
        }}
        scroll={{ x: 800 }}
        size="middle"
      />
    </div>
  );
}
