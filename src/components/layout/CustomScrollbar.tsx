"use client";
import { useEffect, useRef, useState } from "react"
import { useLenis } from "lenis/react"

export default function CustomScrollbar() {
    const thumbRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [thumbHeight, setThumbHeight] = useState(50)
    const [isDragging, setIsDragging] = useState(false)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const startYRef = useRef(0)
    const startScrollRef = useRef(0)

    const lenis = useLenis((lenis) => {
        if (!thumbRef.current) return

        const innerHeight = window.innerHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (scrollHeight <= innerHeight) {
            if (isVisible && !isDragging) setIsVisible(false)
            return
        }

        const heightRatio = innerHeight / scrollHeight
        const newThumbHeight = Math.max(heightRatio * innerHeight, 40)
        setThumbHeight(newThumbHeight)

        const maxScroll = scrollHeight - innerHeight
        const progress = Math.min(Math.max(lenis.scroll / maxScroll, 0), 1)
        const maxThumbY = innerHeight - newThumbHeight
        const thumbY = progress * maxThumbY

        thumbRef.current.style.transform = `translate3d(0, ${thumbY}px, 0)`

        if (!isDragging) {
            setIsVisible(true)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false)
            }, 400)
        }
    })

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!lenis) return
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
        setIsVisible(true)
        startYRef.current = e.clientY
        startScrollRef.current = lenis.scroll
    }

    useEffect(() => {
        if (!isDragging || !lenis) return

        const handlePointerMove = (e: PointerEvent) => {
            e.preventDefault()
            const innerHeight = window.innerHeight
            const scrollHeight = document.documentElement.scrollHeight
            const maxScroll = scrollHeight - innerHeight
            const maxThumbY = innerHeight - thumbHeight
            const scrollPerThumbPixel = maxScroll / maxThumbY

            const deltaY = e.clientY - startYRef.current
            const targetScroll = startScrollRef.current + (deltaY * scrollPerThumbPixel)

            const clampsScroll = Math.max(0, Math.min(targetScroll, maxScroll))
            lenis.scrollTo(clampsScroll, { immediate: true })
        }

        const handlePointerUp = () => {
            setIsDragging(false)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false)
            }, 400)
        }

        document.addEventListener('pointermove', handlePointerMove, { passive: false })
        document.addEventListener('pointerup', handlePointerUp)

        return () => {
            document.removeEventListener('pointermove', handlePointerMove)
            document.removeEventListener('pointerup', handlePointerUp)
        }
    }, [isDragging, lenis, thumbHeight])

    const handleTrackClick = (e: React.PointerEvent) => {
        if (!lenis || !trackRef.current) return
        e.preventDefault()

        const innerHeight = window.innerHeight
        const scrollHeight = document.documentElement.scrollHeight

        const trackRect = trackRef.current.getBoundingClientRect()
        const clickY = e.clientY - trackRect.top

        const maxThumbY = innerHeight - thumbHeight
        const targetThumbY = clickY - (thumbHeight / 2)
        const progress = Math.max(0, Math.min(targetThumbY / maxThumbY, 1))

        const maxScroll = scrollHeight - innerHeight
        lenis.scrollTo(progress * maxScroll, { immediate: false, duration: 0.8 })
    }

    return (
        <div
            ref={trackRef}
            className={`fixed right-0 top-0 bottom-0 w-3 z-[9999] transition-opacity duration-500 ease-out ${isVisible || isDragging ? 'opacity-100' : 'opacity-0'
                }`}
            onPointerDown={handleTrackClick}
            onMouseEnter={() => {
                setIsVisible(true)
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
            }}
            onMouseLeave={() => {
                if (!isDragging) {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    timeoutRef.current = setTimeout(() => {
                        setIsVisible(false)
                    }, 400)
                }
            }}
        >
            <div
                ref={thumbRef}
                onPointerDown={handlePointerDown}
                className="absolute right-0.5 w-2 bg-[var(--brand-base)]/50 hover:bg-[var(--brand-base)]/80 rounded-full cursor-grab active:cursor-grabbing transition-colors duration-200"
                style={{
                    height: thumbHeight,
                    boxShadow: "0 0 10px rgba(100, 100, 230, 0.2)"
                }}
            />
        </div>
    )
}
