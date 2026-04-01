import { useCallback, useEffect, useState } from "react"

const EVENT_NAME = "local-storage-toggle"

function readStoredBoolean(key: string, defaultValue: boolean): boolean {
  if (typeof window === "undefined") return defaultValue
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    const parsed = JSON.parse(raw)
    return typeof parsed === "boolean" ? parsed : defaultValue
  } catch {
    return defaultValue
  }
}

function writeStoredBoolean(key: string, value: boolean): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, { detail: { key, value } })
    )
  } catch (e) {
    console.warn("useLocalStorageToggle: failed to persist", e)
  }
}

/**
 * Reusable boolean toggle persisted in localStorage.
 * - SSR-safe: uses defaultValue until client mount, then reads from localStorage.
 * - Same-tab sync: dispatching custom event so multiple consumers of the same key stay in sync.
 * - Cross-tab sync: listens to storage event.
 */
export function useLocalStorageToggle(
  key: string,
  defaultValue: boolean
): [boolean, (value: boolean | ((prev: boolean) => boolean)) => void] {
  const [state, setState] = useState<boolean>(defaultValue)

  useEffect(() => {
    setState(readStoredBoolean(key, defaultValue))

    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const next = JSON.parse(e.newValue)
          if (typeof next === "boolean") setState(next)
        } catch {
          // ignore
        }
      }
    }

    const onToggle = (e: CustomEvent<{ key: string; value: boolean }>) => {
      if (e.detail.key === key) setState(e.detail.value)
    }

    window.addEventListener("storage", onStorage)
    window.addEventListener(EVENT_NAME, onToggle as EventListener)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(EVENT_NAME, onToggle as EventListener)
    }
  }, [key, defaultValue])

  const setValue = useCallback(
    (valueOrUpdater: boolean | ((prev: boolean) => boolean)) => {
      setState((prev) => {
        const next =
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(prev)
            : valueOrUpdater
        writeStoredBoolean(key, next)
        return next
      })
    },
    [key]
  )

  return [state, setValue]
}
