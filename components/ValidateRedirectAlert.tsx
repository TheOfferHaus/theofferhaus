"use client";

import { Toaster, toast } from "sonner";
import { useEffect } from "react";

/** Toast alert message on redirect. */

const ValidateRedirectAlert = () => {
  toast("My first toast");

  return (
    <div>
      <Toaster />
      <button onClick={() => toast("My first toast")}>Give me a toast</button>
    </div>
  );
};

export default ValidateRedirectAlert;
