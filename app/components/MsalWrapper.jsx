"use client";

import { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import {msalConfig} from "../authConfig";

export default function MsalWrapper({ children }) {
  const [msalInstance, setMsalInstance] = useState(null);

  useEffect(() => {
    const instance = new PublicClientApplication(msalConfig);
    instance.initialize().then(() => {
      setMsalInstance(instance);
    });
  }, []);

  if (!msalInstance) return <div>Loading...</div>;

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
