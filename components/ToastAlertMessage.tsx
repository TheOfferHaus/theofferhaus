"use client";

import { toast } from "sonner";
import { useEffect } from "react";

/** Toast alert message. */

export default function ToastAlertMessage({ message }: { message: string; }) {

  useEffect(() => {
    toast(message);
  }, []);

  return <></>;
};

