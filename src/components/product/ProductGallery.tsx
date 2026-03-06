"use client";
import { useState } from "react"

export default function ProductGallery() {
    const [selectedImage, setSelectedImage] = useState(0)
    const thumbnails = [0, 1, 2, 3]

    return (
        <div className="flex flex-col gap-3">
            <div className="aspect-video bg-white/[0.03] border-2 border-border rounded-md flex items-center justify-center text-muted-foreground">
                <span className="text-sm opacity-40 tracking-widest uppercase">
                    Preview Image {selectedImage + 1}
                </span>
            </div>

            <div className="flex gap-2">
                {thumbnails.map((i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`flex-1 aspect-video rounded-md border-2 transition-colors flex items-center justify-center text-xs text-muted-foreground cursor-pointer ${selectedImage === i
                            ? "border-accent bg-accent/5"
                            : "border-border bg-white/[0.02] hover:border-white/15"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}
