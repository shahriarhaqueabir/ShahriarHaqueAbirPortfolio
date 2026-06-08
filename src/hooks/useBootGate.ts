"use client";

import { useState } from "react";

const BOOT_STORAGE_KEY = "shahriar_portfolio_booted";

function hasBooted() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(BOOT_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markBooted() {
  try {
    window.sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
  } catch {
    // Browsers can block sessionStorage in strict privacy contexts. Local state still lets the user enter.
  }
}

export function useBootGate() {
  const [isBooting, setIsBooting] = useState(() => !hasBooted());

  const enterPortfolio = () => {
    markBooted();
    setIsBooting(false);
  };

  return { isBooting, enterPortfolio };
}
