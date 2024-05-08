"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Filters the data table based on a filter value and updates state in the Data Table component */
export function Dropdown({
  filterSelect,
  filterVal,
}: {
  filterSelect: Function;
  filterVal: string;
}) {
  //TODO: fix the filter by button

  /** Calls the filterSelect function to update state in the Data Table */
  function callFilterSelect(value: string) {
    filterSelect(value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter By: {filterVal} </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterVal}
          onValueChange={callFilterSelect}
        >
          <DropdownMenuRadioItem value="username" id="Username">
            Username
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lastName">
            Last Name
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="firstName">
            First Name
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="email">Email</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lastOffer">
            Last Offer
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
