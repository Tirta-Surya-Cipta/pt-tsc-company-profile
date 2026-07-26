"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectImageUpload } from "@/components/admin/projects/ProjectImageUpload";
import {
    Plus,
    Trash2,
    Save,
    ArrowLeft,
    Loader2,
    Image as ImageIcon,
} from "lucide-react";

type ProjectFormData = {
    title: string;
    slug: string;
    overview: string;
    location: string;
    projectYear: string;
    industryType: string;
    applicationType: string;
    projectType: string;
    services: string;
    challenge: string;
    solution: string;
    result: string;
    highlights: string[];
    thumbnailImage: string;
    galleryImages: string[];
};

interface ProjectFormProps {
    mode?: "create" | "edit";
    projectId?: string;
    initialData?: Partial<ProjectFormData>;
}

const defaultFormData: ProjectFormData = {
    title: "",
    slug: "",
    overview: "",
    location: "",
    projectYear: new Date().getFullYear().toString(),
    industryType: "",
    applicationType: "",
    projectType: "",
    services: "",
    challenge: "",
    solution: "",
    result: "",
    highlights: [""],
    thumbnailImage: "",
    galleryImages: [],
};

export default function ProjectForm({
    mode = "create",
    projectId,
    initialData,
}: ProjectFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<ProjectFormData>({
        ...defaultFormData,
        ...initialData,
        highlights:
            initialData?.highlights && initialData.highlights.length > 0
                ? initialData.highlights
                : [""],
        galleryImages: initialData?.galleryImages ?? [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const isEditMode = mode === "edit";

    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =====================================================
    // AUTO GENERATE SLUG
    // =====================================================

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleTitleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const title = e.target.value;

        setFormData((prev) => ({
            ...prev,
            title,
            slug: generateSlug(title),
        }));
    };

    // =====================================================
    // HIGHLIGHTS
    // =====================================================

    const handleHighlightChange = (
        index: number,
        value: string
    ) => {
        setFormData((prev) => {
            const highlights = [...prev.highlights];

            highlights[index] = value;

            return {
                ...prev,
                highlights,
            };
        });
    };

    const addHighlight = () => {
        setFormData((prev) => ({
            ...prev,
            highlights: [
                ...prev.highlights,
                "",
            ],
        }));
    };

    const removeHighlight = (index: number) => {
        setFormData((prev) => {
            const highlights = prev.highlights.filter(
                (_, i) => i !== index
            );

            return {
                ...prev,
                highlights:
                    highlights.length > 0
                        ? highlights
                        : [""],
            };
        });
    };

    // =====================================================
    // IMAGE URL
    // =====================================================

    const handleThumbnailChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            thumbnailImage: e.target.value,
        }));
    };

    const handleGalleryChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        if (!value.trim()) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            galleryImages: [
                ...prev.galleryImages,
                value.trim(),
            ],
        }));

        e.target.value = "";
    };

    const removeGalleryImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            galleryImages:
                prev.galleryImages.filter(
                    (_, i) => i !== index
                ),
        }));
    };

    // =====================================================
    // VALIDATION
    // =====================================================

    const validateForm = () => {
        if (!formData.title.trim()) {
            return "Project title is required.";
        }

        if (!formData.slug.trim()) {
            return "Project slug is required.";
        }

        if (!formData.overview.trim()) {
            return "Project overview is required.";
        }

        if (!formData.location.trim()) {
            return "Project location is required.";
        }

        if (!formData.projectYear) {
            return "Project year is required.";
        }

        if (!formData.industryType.trim()) {
            return "Industry type is required.";
        }

        if (!formData.applicationType.trim()) {
            return "Application type is required.";
        }

        if (!formData.projectType.trim()) {
            return "Project type is required.";
        }

        if (!formData.services.trim()) {
            return "Services are required.";
        }

        if (!formData.challenge.trim()) {
            return "Challenge is required.";
        }

        if (!formData.solution.trim()) {
            return "Solution is required.";
        }

        if (!formData.result.trim()) {
            return "Result is required.";
        }

        if (!formData.thumbnailImage.trim()) {
            return "Thumbnail image URL is required.";
        }

        return null;
    };

    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                title: formData.title.trim(),
                slug: formData.slug.trim(),
                overview: formData.overview.trim(),
                location: formData.location.trim(),
                projectYear: Number(formData.projectYear),
                industryType: formData.industryType.trim(),
                applicationType:
                    formData.applicationType.trim(),
                projectType:
                    formData.projectType.trim(),
                services: formData.services.trim(),
                challenge: formData.challenge.trim(),
                solution: formData.solution.trim(),
                result: formData.result.trim(),

                highlights: formData.highlights
                    .map((item) => item.trim())
                    .filter(Boolean),

                thumbnailImage:
                    formData.thumbnailImage.trim(),

                galleryImages:
                    formData.galleryImages,
            };

            const url = isEditMode
                ? `/api/projects/${projectId}`
                : "/api/projects";

            const method = isEditMode
                ? "PUT"
                : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Failed to save project."
                );
            }

            router.push("/admin/projects");

            router.refresh();
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            {/* ERROR */}

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* ================================================= */}
            {/* BASIC INFORMATION */}
            {/* ================================================= */}

            <section className="rounded-xl border border-slate-200 bg-white">

                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Enter the main information about this project.
                    </p>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">

                    {/* TITLE */}

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Project Title
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="Example: Industrial Motor Control System"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                    {/* SLUG */}

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Slug
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="industrial-motor-control-system"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            URL: /projects/{formData.slug || "project-slug"}
                        </p>

                    </div>

                    {/* OVERVIEW */}

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Overview
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <textarea
                            name="overview"
                            value={formData.overview}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Describe the project overview..."
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                    {/* LOCATION */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Location
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Jakarta, Indonesia"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                    {/* YEAR */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Project Year
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <input
                            type="number"
                            name="projectYear"
                            value={formData.projectYear}
                            onChange={handleChange}
                            min="1900"
                            max="2100"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                </div>

            </section>

            {/* ================================================= */}
            {/* PROJECT CLASSIFICATION */}
            {/* ================================================= */}

            <section className="rounded-xl border border-slate-200 bg-white">

                <div className="border-b border-slate-200 px-6 py-5">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Project Classification
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Define the category and application of this project.
                    </p>

                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">

                    {/* INDUSTRY */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Industry Type
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <input
                            name="industryType"
                            value={formData.industryType}
                            onChange={handleChange}
                            placeholder="Manufacturing"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                    {/* APPLICATION */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Application Type
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <input
                            name="applicationType"
                            value={formData.applicationType}
                            onChange={handleChange}
                            placeholder="Motor Control"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                    {/* PROJECT TYPE */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Project Type
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <input
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            placeholder="System Integration"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                    {/* SERVICES */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Services
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <input
                            name="services"
                            value={formData.services}
                            onChange={handleChange}
                            placeholder="Engineering & Commissioning"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                </div>

            </section>

            {/* ================================================= */}
            {/* PROJECT DETAILS */}
            {/* ================================================= */}

            <section className="rounded-xl border border-slate-200 bg-white">

                <div className="border-b border-slate-200 px-6 py-5">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Project Details
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Explain the challenge, solution, and project result.
                    </p>

                </div>

                <div className="space-y-6 p-6">

                    {/* CHALLENGE */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Challenge
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <textarea
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Describe the challenge faced in this project..."
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                    {/* SOLUTION */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Solution
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <textarea
                            name="solution"
                            value={formData.solution}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Describe the solution implemented..."
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                    {/* RESULT */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Result
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>

                        <textarea
                            name="result"
                            value={formData.result}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Describe the result and impact..."
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                        />

                    </div>

                </div>

            </section>

            {/* ================================================= */}
            {/* HIGHLIGHTS */}
            {/* ================================================= */}

            <section className="rounded-xl border border-slate-200 bg-white">

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div>

                        <h2 className="text-lg font-semibold text-slate-900">
                            Project Highlights
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Add key highlights or achievements.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={addHighlight}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#59D66F] px-4 py-2 text-sm font-semibold text-[#071A14] transition hover:bg-[#4bc45e]"
                    >
                        <Plus size={16} />
                        Add Highlight
                    </button>

                </div>

                <div className="space-y-3 p-6">

                    {formData.highlights.map(
                        (highlight, index) => (

                            <div
                                key={index}
                                className="flex gap-3"
                            >

                                <input
                                    value={highlight}
                                    onChange={(e) =>
                                        handleHighlightChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Highlight ${index + 1}`}
                                    className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#59D66F] focus:ring-2 focus:ring-[#59D66F]/20"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeHighlight(index)
                                    }
                                    className="rounded-lg border border-red-200 px-3 text-red-600 transition hover:bg-red-50"
                                >
                                    <Trash2 size={18} />
                                </button>

                            </div>

                        )
                    )}

                </div>

            </section>

            {/* ================================================= */}
            {/* IMAGES */}
            {/* ================================================= */}

            <section className="rounded-xl border border-slate-200 bg-white">

                <div className="border-b border-slate-200 px-6 py-5">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Project Images
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Add the project thumbnail and gallery images.
                    </p>

                </div>

                <div className="space-y-8 p-6">

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Project Images
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>
                        <p className="mb-4 text-xs text-slate-500">
                            Upload project images. The featured image will be used as the thumbnail.
                        </p>

                        <ProjectImageUpload
                            value={[
                                ...(formData.thumbnailImage
                                    ? [{ url: formData.thumbnailImage, publicId: formData.thumbnailImage, isFeatured: true }]
                                    : []),
                                ...formData.galleryImages.map((url) => ({
                                    url,
                                    publicId: url,
                                    isFeatured: false,
                                })),
                            ]}
                            onChange={(images) => {
                                const featured = images.find((img) => img.isFeatured);
                                const others = images.filter((img) => !img.isFeatured);
                                
                                setFormData((prev) => ({
                                    ...prev,
                                    thumbnailImage: featured ? featured.url : (others.length > 0 ? others[0].url : ""),
                                    galleryImages: others.map((img) => img.url),
                                }));
                            }}
                            maxImages={10}
                        />
                    </div>

                </div>

            </section>

            {/* ================================================= */}
            {/* ACTIONS */}
            {/* ================================================= */}

            <div className="flex items-center justify-end gap-3">

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/admin/projects"
                        )
                    }
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ArrowLeft size={17} />
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#59D66F] px-6 py-3 text-sm font-bold text-[#071A14] transition hover:bg-[#4bc45e] disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {isSubmitting ? (
                        <>
                            <Loader2
                                size={17}
                                className="animate-spin"
                            />

                            {isEditMode
                                ? "Updating..."
                                : "Creating..."}
                        </>
                    ) : (
                        <>
                            <Save size={17} />

                            {isEditMode
                                ? "Update Project"
                                : "Create Project"}
                        </>
                    )}

                </button>

            </div>

        </form>
    );
}