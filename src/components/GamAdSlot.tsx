"use client";

import { useEffect, useState } from "react";
import { getEarnadsCodeFromSearch } from "@/lib/earnads";

const SLOT_ID = "1252";
const AD_UNIT_PATH = "/23283091880/adsaug/adsaug-b";
const SIZES: [number, number][] = [
  [234, 60],
  [336, 280],
  [468, 60],
];
const PAGE_URL = "https://cal.mukhyamantriyojanadoot.com/";
const GPT_SRC = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

type GptSlot = {
  addService: (service: unknown) => GptSlot;
};

type PubAds = {
  set: (key: string, value: string) => PubAds;
  addEventListener: (
    event: "slotRenderEnded",
    handler: (event: { isEmpty: boolean; size: unknown }) => void
  ) => void;
};

type Googletag = {
  cmd: { push: (fn: () => void) => void };
  apiReady?: boolean;
  defineSlot: (
    path: string,
    sizes: [number, number][],
    elementId: string
  ) => GptSlot | null;
  pubads: () => PubAds;
  enableServices: () => void;
  display: (elementId: string) => void;
  destroySlots: (slots?: GptSlot[]) => void;
};

declare global {
  interface Window {
    googletag?: Googletag;
  }
}

function gpt(): Googletag {
  window.googletag = window.googletag || ({ cmd: [] } as unknown as Googletag);
  return window.googletag;
}

function loadGptScript(): void {
  if (document.querySelector(`script[src="${GPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = GPT_SRC;
  script.async = true;
  document.head.appendChild(script);
}

export default function GamAdSlot() {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("Loading ad…");

  useEffect(() => {
    setActive(Boolean(getEarnadsCodeFromSearch()));
  }, []);

  useEffect(() => {
    if (!active) return;

    loadGptScript();
    const googletag = gpt();
    let slot: GptSlot | null = null;

    googletag.cmd.push(() => {
      googletag.destroySlots();
      try {
        googletag.pubads().set("page_url", PAGE_URL);
      } catch {
        /* page_url override is optional; used so localhost can match production inventory */
      }
      googletag.pubads().addEventListener("slotRenderEnded", (event) => {
        if (event.isEmpty) {
          setStatus("Ad unit requested — GAM returned empty (no line item for this page/device).");
          console.info("[GAM] slotRenderEnded isEmpty=true", event);
          return;
        }
        setStatus("");
        console.info("[GAM] slotRenderEnded filled", event.size);
      });
      slot = googletag.defineSlot(AD_UNIT_PATH, SIZES, SLOT_ID);
      if (!slot) {
        setStatus("GPT could not define the slot.");
        return;
      }
      slot.addService(googletag.pubads());
      googletag.enableServices();
      googletag.display(SLOT_ID);
    });

    return () => {
      gpt().cmd.push(() => {
        if (slot) googletag.destroySlots([slot]);
      });
    };
  }, [active]);

  if (!active) return null;

  return (
    <aside className="gam-ad-slot" aria-label="Advertisement">
      {status ? <p className="gam-ad-status">{status}</p> : null}
      <div id={SLOT_ID} />
    </aside>
  );
}
