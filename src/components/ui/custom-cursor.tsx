import * as React from "react"
import { useLocalStorageToggle } from "../../hooks/useLocalStorageToggle"
import { LAB_DEFAULTS, LAB_STORAGE_KEYS } from "../../data/lab-toggles"

const PARTICLE_COUNT = 8
const LERP = 0.18
const CURSOR_SIZE = 12
const PARTICLE_SIZE = 6

function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = React.useState(true)
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(pointer: coarse)")
    const check = () => setIsTouch(mq.matches)
    check()
    mq.addEventListener("change", check)
    return () => mq.removeEventListener("change", check)
  }, [])
  return isTouch
}

export function CustomCursor() {
  const [enabled] = useLocalStorageToggle(LAB_STORAGE_KEYS.customCursor, LAB_DEFAULTS.customCursor)
  const isTouch = useIsTouchDevice()
  const active = enabled && !isTouch

  if (!active) {
    return null
  }

  return <CustomCursorInner />
}

function CustomCursorInner() {
  const cursorRef = React.useRef<HTMLDivElement>(null)
  const particleRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const mouseRef = React.useRef({ x: 0, y: 0 })
  const positionsRef = React.useRef<{ x: number; y: number }[]>(
    Array.from({ length: PARTICLE_COUNT + 1 }, () => ({ x: 0, y: 0 }))
  )
  const rafRef = React.useRef<number>(0)
  const didMoveRef = React.useRef(false)

  React.useEffect(() => {
    const body = document.body
    body.style.cursor = "none"

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      didMoveRef.current = true
    }

    window.addEventListener("mousemove", onMove, { passive: true })

    const tick = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const positions = positionsRef.current

      positions[0].x += (mx - positions[0].x) * LERP
      positions[0].y += (my - positions[0].y) * LERP

      for (let i = 1; i < positions.length; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * LERP
        positions[i].y += (positions[i - 1].y - positions[i].y) * LERP
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positions[0].x}px,${positions[0].y}px)`
      }
      particleRefs.current.forEach((el, i) => {
        if (el && positions[i + 1] != null) {
          el.style.transform = `translate(${positions[i + 1].x}px,${positions[i + 1].y}px)`
        }
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
      body.style.cursor = ""
    }
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden
    >
      <div
        ref={cursorRef}
        className="absolute left-0 top-0 rounded-full bg-primary border-2 border-primary-foreground/30"
        style={{ width: CURSOR_SIZE, height: CURSOR_SIZE, marginLeft: -CURSOR_SIZE / 2, marginTop: -CURSOR_SIZE / 2 }}
      />
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el
          }}
          className="absolute left-0 top-0 rounded-full bg-primary/60"
          style={{
            width: PARTICLE_SIZE,
            height: PARTICLE_SIZE,
            marginLeft: -PARTICLE_SIZE / 2,
            marginTop: -PARTICLE_SIZE / 2,
          }}
        />
      ))}
    </div>
  )
}
