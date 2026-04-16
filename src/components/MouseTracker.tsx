'use client'
import { useEffect, useRef } from 'react'

export default function MouseTracker() {
  const dotRef = useRef<HTMLDivElement | null>(null)

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const size = useRef(20)

  const lastPos = useRef({ x: 0, y: 0 })
  const lastTime = useRef(Date.now())

  const rafId = useRef<number | null>(null)

  useEffect(() => {
  
    if (window.innerWidth < 768) return

    const el = dotRef.current
    if (!el) return

    const animate = () => {
      const lerp = 0.15

      current.current.x += (target.current.x - current.current.x) * lerp
      current.current.y += (target.current.y - current.current.y) * lerp

      el.style.transform = `translate3d(
        ${current.current.x}px,
        ${current.current.y}px,
        0
      ) scale(${size.current / 20})`

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const dt = now - lastTime.current

      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y

      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = distance / (dt || 1)

      // smoother size interpolation
      const targetSize = Math.min(60, Math.max(10, speed * 50))
      size.current += (targetSize - size.current) * 0.2

      target.current = { x: e.clientX, y: e.clientY }
      lastPos.current = { x: e.clientX, y: e.clientY }
      lastTime.current = now
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="pointer-events-none  fixed z-[9999] hidden md:block"
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        transform: 'translate3d(0,0,0)',
        willChange: 'transform'
      }}
    />
  )
}