"use client";
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Maximize, Minimize } from "lucide-react"
import type { TebexMedia } from "@/types/tebex"

interface ProductGalleryProps {
    video?: string;
    image: string;
    media?: TebexMedia[];
}

export default function ProductGallery({ video, image, media = [] }: ProductGalleryProps) {
    const [selectedMedia, setSelectedMedia] = useState(0)

    const allSlides: { type: 'video' | 'image', url: string, thumb: string }[] = [];

    const firstImageThumb = (media && media.length > 0 && media[0]?.url) ? media[0].url : image || '';

    const videoUrl = video || media.find((m) => m.type?.toLowerCase().includes("video"))?.url;

    if (videoUrl && videoUrl.trim().length > 0) {
        allSlides.push({
            type: 'video',
            url: videoUrl.trim(),
            thumb: firstImageThumb
        });
    }

    if (media && media.length > 0) {
        media.forEach((m) => {
            if (m?.url && m.url !== videoUrl) {
                allSlides.push({
                    type: 'image',
                    url: m.url,
                    thumb: m.url
                });
            }
        });
    } else if (image) {
        allSlides.push({
            type: 'image',
            url: image,
            thumb: image
        });
    }

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPlayingVideo, setIsPlayingVideo] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const navigate = (direction: 'left' | 'right') => {
        setIsPlayingVideo(false);
        if (direction === 'left') {
            setSelectedMedia((prev) => (prev > 0 ? prev - 1 : allSlides.length - 1));
        } else {
            setSelectedMedia((prev) => (prev < allSlides.length - 1 ? prev + 1 : 0));
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const activeThumbnail = container.children[selectedMedia] as HTMLElement;
            if (activeThumbnail) {
                const containerWidth = container.clientWidth;
                const scrollLeft = container.scrollLeft;
                const activeLeft = activeThumbnail.offsetLeft;
                const activeWidth = activeThumbnail.offsetWidth;

                if (activeLeft < scrollLeft || activeLeft + activeWidth > scrollLeft + containerWidth) {
                    container.scrollTo({
                        left: activeLeft - containerWidth / 2 + activeWidth / 2,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }, [selectedMedia]);

    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setIsFullscreen(false);
            };
            window.addEventListener('keydown', handleEscape);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isFullscreen]);

    return (
        <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl p-4 sm:p-8 md:p-12 gap-6' : 'gap-2'}`}>
            <div className={`group/main ${isFullscreen ? 'flex-1 rounded' : 'aspect-video rounded'} bg-white/[0.03] border-2 border-border overflow-hidden relative flex text-muted-foreground shadow-lg transition-all duration-300`}>
                <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="absolute top-1 right-1 z-30 w-10 h-10 rounded-full hover:text-white flex items-center justify-center cursor-pointer shadow-lg"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                    {isFullscreen ? <Minimize className="w-6 h-6" strokeWidth={2.5} /> : <Maximize className="w-6 h-6" strokeWidth={2.5} />}
                </button>
                <div
                    className="flex w-full h-full transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${selectedMedia * 100}%)` }}
                >
                    {allSlides.length > 0 ? allSlides.map((slide, i) => (
                        <div key={i} className="w-full h-full flex-shrink-0 relative flex items-center justify-center">
                            {slide.type === 'video' ? (
                                isPlayingVideo && selectedMedia === i ? (
                                    <iframe
                                        src={slide.url + (slide.url.includes('?') ? '&' : '?') + 'autoplay=1'}
                                        className="w-full h-full border-0 bg-black"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full relative group cursor-pointer"
                                        onClick={() => setIsPlayingVideo(true)}
                                    >
                                        <Image src={slide.thumb} alt="Video Thumbnail" fill sizes="(max-width: 1024px) 100vw, 60vw" className={isFullscreen ? 'object-contain' : 'object-cover'} />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 shadow-xl">
                                                <Play className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" strokeWidth={1.5} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <Image src={slide.url} alt={`Product Media ${i + 1}`} fill sizes="(max-width: 1024px) 100vw, 60vw" priority={i === 0} className={isFullscreen ? 'object-contain' : 'object-cover'} />
                            )}
                        </div>
                    )) : (
                        <div className="w-full h-full flex-shrink-0 flex items-center justify-center">
                            <span className="text-sm opacity-40 uppercase">No Media Available</span>
                        </div>
                    )}
                </div>

                {allSlides.length > 1 && (
                    <>
                        <button
                            onClick={() => navigate('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center drop-shadow-lg cursor-pointer"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={() => navigate('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center drop-shadow-lg cursor-pointer"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
                        </button>
                    </>
                )}
            </div>

            {allSlides.length > 1 && (
                <div>
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-2 min-h-16 overflow-x-auto scrollbar-none snap-x pb-2 relative"
                    >
                        {allSlides.map((slide, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setIsPlayingVideo(false);
                                    setSelectedMedia(i);
                                }}
                                className={`group relative aspect-video rounded border-2 transition-colors duration-300 overflow-hidden flex-shrink-0 w-32 sm:w-40 cursor-pointer snap-start shadow-sm ${selectedMedia === i
                                    ? "border-accent"
                                    : "border-border hover:border-white/15"
                                    }`}
                                aria-label={`View media ${i + 1}`}
                            >
                                <Image
                                    src={slide.thumb}
                                    alt={`Thumbnail ${i + 1}`}
                                    fill
                                    sizes="160px"
                                    className={`object-cover transition-all duration-300 ${selectedMedia === i ? 'brightness-100' : 'brightness-50 group-hover:brightness-100'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
