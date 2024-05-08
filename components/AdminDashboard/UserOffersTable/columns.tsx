"use client";

import { ColumnDef } from "@tanstack/react-table";

/** Column definitions for our UserOffersTable */

// This type is used to define the shape of our data.
export type Offer = {
  propertyId: number;
  buyerId: string;
  updatedAt: Date;
  status: string;
  price: number;
};

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
