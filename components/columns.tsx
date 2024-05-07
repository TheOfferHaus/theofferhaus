"use client"

import { ColumnDef } from "@tanstack/react-table"
//import type { User } from "@clerk/nextjs/server"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type User = {
  username: string | null
  lastName: string | null
  firstName: string | null
  email: string | null
  lastOffer: Date | null
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "lastOffer",
    header: "Last Offer"
  }
]
