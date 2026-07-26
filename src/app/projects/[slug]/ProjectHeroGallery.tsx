"use client";

import { useState } from "react";

interface ProjectHeroGalleryProps {
    thumbnail: string | null;
    gallery: string[];
}

export default function ProjectHeroGallery({ thumbnail, gallery }: ProjectHeroGalleryProps) {
    // Collect all unique images (thumbnail + gallery)
    const allImages = Array.from(new Set([thumbnail, ...gallery].filter(Boolean) as string[]));
    
    // If no images at all, fallback to a placeholder
    const [mainImage, setMainImage] = useState<string | null>(allImages[0] ?? null);

    if (allImages.length === 0) {
        return (
            <div className="flex flex-col gap-3 opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
                <div className="relative h-64 sm:h-80 rounded-t-xl overflow-hidden bg-[#DDE9E2]" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
            {/* Main Image */}
            <div className="relative h-64 sm:h-80 rounded-t-xl overflow-hidden bg-[#DDE9E2]">
                {mainImage && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-500" 
                        style={{ backgroundImage: `url('${mainImage}')` }} 
                    />
                )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-2">
                    {allImages.slice(0, 4).map((url) => {
                        const isActive = mainImage === url;
                        return (
                            <div 
                                key={url} 
                                onClick={() => setMainImage(url)}
                                className={`relative flex-1 h-20 rounded-lg overflow-hidden bg-[#DDE9E2] cursor-pointer transition-all ${
                                    isActive ? 'ring-2 ring-[#59D66F] scale-[1.02]' : 'opacity-70 hover:opacity-100'
                                }`}
                            >
                                <div 
                                    className="absolute inset-0 bg-cover bg-center" 
                                    style={{ backgroundImage: `url('${url}')` }} 
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
