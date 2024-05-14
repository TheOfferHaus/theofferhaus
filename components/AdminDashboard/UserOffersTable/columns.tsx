"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Offer } from "@/lib/adminDashboard/types";

/** Column definitions for our UserOffersTable */
export const columns: ColumnDef<Offer>[] = [
  {
    accessorKey: "propertyId",
    header: "Property Id",
  },
  {
    accessorKey: "buyerId",
    header: "Buyer Id",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];
