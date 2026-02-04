"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useLocalStorageToggle } from "@/hooks/useLocalStorageToggle"
import { LAB_DEFAULTS, LAB_STORAGE_KEYS } from "@/data/lab-toggles"

const CustomCursor = dynamic(
  () => import("./custom-cursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
)

/**
 * Renders CustomCursor only when the labs custom-cursor toggle is enabled.
 * Keeps cursor bundle and rAF loop out of the main bundle until needed.
 */
export function CustomCursorGate() {
  const [enabled] = useLocalStorageToggle(
    LAB_STORAGE_KEYS.customCursor,
    LAB_DEFAULTS.customCursor
  )
  if (!enabled) return null
  return <CustomCursor />
}
