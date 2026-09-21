"use client";

import { useState, useEffect } from "react"

interface HeroTypewriterProps {
    text?: string
}

export default function HeroTypewriter({ text = "Flawless Aesthetics" }: HeroTypewriterProps) {
    const [typedText, setTypedText] = useState("")
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        let i = 0
        let typingTimeout: ReturnType<typeof setTimeout>

        const typeNextLetter = () => {
            setTypedText(text.slice(0, i + 1))
            i++

            if (i < text.length) {
                const delay = Math.floor(Math.random() * (100 - 60 + 1)) + 60
                typingTimeout = setTimeout(typeNextLetter, delay)
            } else {
                typingTimeout = setTimeout(() => setShowCursor(false), 1500)
            }
        }

        const initialTimeout = setTimeout(typeNextLetter, 1250)

        return () => {
            clearTimeout(initialTimeout)
            clearTimeout(typingTimeout)
        }
    }, [text])

    return (
        <span className="relative inline-block">
            <span className="opacity-0">{text}</span>
            <span className="absolute inset-0 z-10 text-transparent bg-clip-text bg-accent-gradient text-shadow-accent/40 whitespace-nowrap">
                {typedText}
            </span>
            <span className="absolute inset-0 z-20 whitespace-nowrap text-transparent pointer-events-none">
                {typedText}
                {showCursor && (
                    <span className="inline-block relative w-[4px] h-[0.8em] bg-accent ml-1 align-middle -mt-1.5 animate-pulse" />
                )}
            </span>
        </span>
    )
}
