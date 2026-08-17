"use client";

import { useEffect, useState } from "react";
import { getEarnadsCodeFromSearch } from "@/lib/earnads";

/** Production Earnads loader. For local Earnads, set NEXT_PUBLIC_EARNADS_LOADER_BASE=http://localhost:6001/loader/ */
function loaderBase(): string {
  const raw =
    process.env.NEXT_PUBLIC_EARNADS_LOADER_BASE ?? "https://earnads.net/loader/";
  return raw.endsWith("/") ? raw : `${raw}/`;
}
const WAIT_SECONDS = 5;

export default function EarnadsInterstitial() {
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(WAIT_SECONDS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const value = getEarnadsCodeFromSearch();
    if (!value) return;
    setCode(value);
    document.body.classList.add("has-earnads-bar");
    return () => document.body.classList.remove("has-earnads-bar");
  }, []);

  useEffect(() => {
    if (!code) return;

    const tick = window.setInterval(() => {
      setSecondsLeft((left) => {
        if (left <= 1) {
          window.clearInterval(tick);
          setReady(true);
          return 0;
        }
        return left - 1;
      });
    }, 1000);

    return () => window.clearInterval(tick);
  }, [code]);

  if (!code) return null;

  return (
    <div id="earnads-bar">
      <button
        id="earnads-continue"
        type="button"
        disabled={!ready}
        onClick={() => {
          if (!ready) return;
          window.location.href = `${loaderBase()}${encodeURIComponent(code)}`;
        }}
      >
        {ready ? "Continue to your link" : `Continue in ${secondsLeft}s`}
      </button>
    </div>
  );
}
