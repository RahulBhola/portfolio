"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const SmoothScroll = dynamic(
  () => import("./SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false }
);

const CursorGlow = dynamic(
  () => import("./CursorGlow").then((m) => m.CursorGlow),
  { ssr: false }
);

const TerminalMode = dynamic(
  () => import("./TerminalMode").then((m) => m.TerminalMode),
  { ssr: false }
);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScroll>
      <CursorGlow />
      {children}
      <TerminalMode />
    </SmoothScroll>
  );
}
