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
  /** Labels for displaying the current filter applied to the table */
  const labels: { [key: string]: string } = {
    username: "Username",
    lastName: "Last Name",
    firstName: "First Name",
    email: "Email",
    lastOffer: "Last Offer",
  };

  function callFilterSelect(value: string) {
    filterSelect(value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-dark-gray text-custom-white">
          Filter By: {labels[filterVal]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-custom-white">
        <DropdownMenuLabel>Filter By:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterVal}
          onValueChange={callFilterSelect}
        >
          <DropdownMenuRadioItem value="username">
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
