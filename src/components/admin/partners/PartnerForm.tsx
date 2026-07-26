"use client";

import { FormEvent, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  ArrowLeft,
  Loader2,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";

interface PartnerFormData {
  name: string;
  logoUrl: string;
  displayOrder: number;
}

interface PartnerFormProps {
  mode?: "create" | "edit";
  partnerId?: string;
  initialData?: Partial<PartnerFormData>;
}

const defaultFormData: PartnerFormData = {
  name: "",
  logoUrl: "",
  displayOrder: 0,
};

export default function PartnerForm({
  mode = "create",
  partnerId,
  initialData,
}: PartnerFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<PartnerFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ─── Logo Upload ──────────────────────────────────────────────────────────
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Only JPG, PNG, and WebP are allowed.");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "partners");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const result = await response.json();

      if (result.success && result.url) {
        setFormData((prev) => ({ ...prev, logoUrl: result.url }));
      } else {
        setError(result.error || "Failed to upload logo");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload logo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeLogo = () => {
    setFormData((prev) => ({ ...prev, logoUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Client-side validation
    if (!formData.name || formData.name.trim().length < 2) {
      setError("Partner name must be at least 2 characters.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.logoUrl) {
      setError("Please upload a partner logo.");
      setIsSubmitting(false);
      return;
    }

    try {
      const url =
        mode === "edit"
          ? `/api/partners/${partnerId}`
          : "/api/partners";
      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          logoUrl: formData.logoUrl,
          displayOrder: formData.displayOrder,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Failed to save partner");
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage(
        mode === "edit"
          ? "Partner updated successfully!"
          : "Partner created successfully!"
      );

      setTimeout(() => {
        router.push("/admin/partners");
        router.refresh();
      }, 800);
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err.message || "An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Back link */}
      <button
        onClick={() => router.push("/admin/partners")}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Partners
      </button>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-slate-900">
            {mode === "edit" ? "Edit Partner" : "Add New Partner"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {mode === "edit"
              ? "Update partner information and logo."
              : "Add a new technology partner with their logo."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error / Success */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
              {successMessage}
            </div>
          )}

          {/* Partner Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Partner Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. Schneider Electric"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/30 transition-colors"
              required
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Partner Logo <span className="text-red-400">*</span>
            </label>

            {formData.logoUrl ? (
              /* Preview */
              <div className="relative border border-gray-200 rounded-xl p-6 bg-gray-50 flex items-center justify-center">
                <img
                  src={formData.logoUrl}
                  alt="Partner logo preview"
                  className="max-h-32 max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                >
                  <X size={14} className="text-red-600" />
                </button>
              </div>
            ) : (
              /* Upload area */
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isUploading
                    ? "border-[#59D66F]/40 bg-green-50/50"
                    : "border-slate-200 hover:border-[#59D66F]/60 hover:bg-green-50/30"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2
                      size={28}
                      className="text-[#59D66F] animate-spin mb-2"
                    />
                    <p className="text-sm text-slate-500">
                      Uploading & converting to WebP...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-[#DDE9E2] flex items-center justify-center mb-3">
                      <Upload size={20} className="text-[#1F6B45]" />
                    </div>
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      Click to upload logo
                    </p>
                    <p className="text-xs text-slate-400">
                      JPG, PNG, or WebP · Max 5MB
                    </p>
                  </>
                )}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  displayOrder: parseInt(e.target.value) || 0,
                }))
              }
              min={0}
              className="w-32 rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/30 transition-colors"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Lower numbers appear first on the homepage. Default is 0.
            </p>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="inline-flex items-center gap-2 rounded-lg bg-[#59D66F] px-6 py-2.5 text-sm font-bold text-[#071A14] hover:bg-[#46c75c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {mode === "edit" ? "Update Partner" : "Create Partner"}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/partners")}
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
