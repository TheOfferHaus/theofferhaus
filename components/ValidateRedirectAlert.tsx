"use client";

import { toast } from "sonner";
import { useEffect } from "react";

/** Toast alert message on redirect. */

const ValidateRedirectAlert = () => {

  useEffect(() => {
    toast("You currently have an application in progress!");
  }, []);

  return <></>;
};

export default ValidateRedirectAlert;
