// components/ChatContent.js
"use client";

import { useSearchParams } from "next/navigation";

export default function ChatContent({ children }) {
  const searchParams = useSearchParams();
  const us = searchParams.get("us");
  const ps = searchParams.get("ps");

  if (!us && !ps) return null;

  return children;
}