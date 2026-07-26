"use client";

import { useRef, useState } from "react";
import { Upload, X, Star, StarOff, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";

type UploadedImage = {
    url: string;
    publicId: string;
    isFeatured: boolean;
};

type Props = {
    value: UploadedImage[];
    onChange: (images: UploadedImage[]) => void;
    maxImages?: number;
};

export function ProjectImageUpload({ value, onChange, maxImages = 10 }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    async function handleFiles(files: FileList) {
        if (!files.length) return;
        setUploading(true);

        const newImages: UploadedImage[] = [];

        for (const file of Array.from(files)) {
            if (value.length + newImages.length >= maxImages) break;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const result = await response.json();

                if (result.success && result.url && result.filename) {
                    newImages.push({
                        url: result.url,
                        publicId: result.filename,
                        isFeatured: value.length === 0 && newImages.length === 0, // first image = featured
                    });
                } else {
                    alert(result.error || "Upload failed");
                }
            } catch (error: any) {
                console.error("Upload error:", error);
                alert(error.message || "An error occurred during upload");
            }
        }

        onChange([...value, ...newImages]);
        setUploading(false);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    }

    function toggleFeatured(index: number) {
        const updated = value.map((img, i) => ({
            ...img,
            isFeatured: i === index,
        }));
        onChange(updated);
    }

    function removeImage(index: number) {
        const updated = value.filter((_, i) => i !== index);
        // if removed was featured, set first as featured
        if (value[index].isFeatured && updated.length > 0) {
            updated[0].isFeatured = true;
        }
        onChange(updated);
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Upload zone */}
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver
                    ? "border-[#59D66F] bg-[#59D66F]/5"
                    : "border-gray-200 hover:border-[#59D66F]/50 hover:bg-gray-50"
                    }`}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />

                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 size={32} className="text-[#1F6B45] animate-spin" />
                        <p className="text-sm text-[#6B7280]">Uploading & converting to WebP...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-[#DDE9E2] flex items-center justify-center">
                            <Upload size={20} className="text-[#1F6B45]" />
                        </div>
                        <p className="text-sm font-semibold text-[#1E293B]">
                            Click or drag photos here
                        </p>
                        <p className="text-xs text-[#6B7280]">
                            JPG, PNG, WEBP • Max 5MB per file • Auto converted to WebP
                        </p>
                        <p className="text-xs text-[#6B7280]">
                            {value.length}/{maxImages} photos uploaded
                        </p>
                    </div>
                )}
            </div>

            {/* Preview grid */}
            {value.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {value.map((img, i) => (
                        <div
                            key={img.publicId}
                            className={`relative group rounded-xl overflow-hidden border-2 transition-all ${img.isFeatured ? "border-[#59D66F]" : "border-transparent"
                                }`}
                        >
                            {/* Image */}
                            <div className="aspect-square relative bg-[#DDE9E2]">
                                <Image
                                    src={img.url}
                                    alt={`Project image ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Overlay actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                {/* Toggle featured */}
                                <button
                                    type="button"
                                    onClick={() => toggleFeatured(i)}
                                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                                    title={img.isFeatured ? "Unset featured" : "Set as featured"}
                                >
                                    {img.isFeatured
                                        ? <Star size={14} className="text-amber-500 fill-amber-500" />
                                        : <StarOff size={14} className="text-gray-600" />
                                    }
                                </button>
                                {/* Remove */}
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-100 transition-colors"
                                    title="Remove image"
                                >
                                    <X size={14} className="text-red-500" />
                                </button>
                            </div>

                            {/* Featured badge */}
                            {img.isFeatured && (
                                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#59D66F] text-[#071A14] text-[10px] font-bold">
                                    Featured
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Add more */}
                    {value.length < maxImages && (
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-[#59D66F]/50 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#1F6B45] transition-all"
                        >
                            <ImageIcon size={20} />
                            <span className="text-[10px]">Add more</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}