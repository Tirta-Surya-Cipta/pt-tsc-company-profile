"use client";

import * as React from "react";
import { submitQuoteRequest } from "@/actions/inbox";
import { toast } from "sonner";
import { Loader2, UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";

export function QuoteForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    try {
      const res = await submitQuoteRequest(formData);
      setStatus(res);
      if (res.success) {
        toast.success(res.message || "Quote request submitted successfully!");
        formElement.reset();
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (err: any) {
      const errorMsg = err.message || "Connection error. Please try again.";
      setStatus({ error: errorMsg });
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm h-full">
      <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Project Information</h2>
      <p className="text-[#6B7280] text-sm mb-8 leading-relaxed">
        Please provide as much detail as possible so we can understand your requirements and prepare the best response.
      </p>

      {/* Indikator UI Success / Error */}
      {status?.success && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3 text-green-800 text-sm">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold">Success!</p>
            <p>{status.message}</p>
          </div>
        </div>
      )}
      {status?.error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <p className="font-semibold">Error!</p>
            <p>{status.error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input 
              name="fullName"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter your full name" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">
              Company Name
            </label>
            <input 
              name="companyName"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter your company name" 
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input 
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter your email address" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">
              Phone / WhatsApp
            </label>
            <input 
              name="phone"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter your phone number" 
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">
              Service / Inquiry Type
            </label>
            <select 
              name="serviceType"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 appearance-none text-[#1E293B]" 
              defaultValue="VSD / Inverter System"
            >
              <option value="VSD / Inverter System">VSD / Inverter System</option>
              <option value="PLC & Automation">PLC & Automation</option>
              <option value="Control Panel Integration">Control Panel Integration</option>
              <option value="System Integration">System Integration</option>
              <option value="Commissioning">Commissioning</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Upgrade / Retrofit">Upgrade / Retrofit</option>
              <option value="Preventive Maintenance">Preventive Maintenance</option>
              <option value="Lain-lain">Other / Lain-lain</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">
              Industry / Facility Type
            </label>
            <select 
              name="industry"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 appearance-none text-[#1E293B]" 
              defaultValue="Manufacturing"
            >
              <option value="Manufacturing">Manufacturing</option>
              <option value="Water & Wastewater">Water & Wastewater</option>
              <option value="Building Utility">Building Utility / HVAC</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Oil & Gas">Oil & Gas</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-[#1E293B]">
            Project Details & Message <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="message"
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 resize-none"
            placeholder="Please describe your project requirements in detail..."
          ></textarea>
        </div>

        {/* File Upload UI Placeholder */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B]">Upload Files (Optional)</label>
          <div className="w-full border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
            <UploadCloud size={28} className="text-[#59D66F] mb-3 group-hover:-translate-y-1 transition-transform" />
            <p className="text-sm font-semibold text-[#1E293B] mb-1">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-500">PDF, DWG, JPG, PNG (Max 10MB per file)</p>
          </div>
        </div>

        {/* Consent & Submit */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <input 
              type="checkbox" 
              id="quoteConsent" 
              name="consent"
              required
              className="w-4 h-4 rounded border-gray-300 text-[#59D66F] focus:ring-[#59D66F] mt-0.5" 
            />
            <div>
              <label htmlFor="quoteConsent" className="text-xs text-[#6B7280]">I agree to be contacted regarding this inquiry.</label>
              <p className="text-[10px] text-gray-400 mt-0.5">Your information is safe with us and will only be used to respond to your inquiry.</p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full sm:w-auto px-8 py-3 bg-[#59D66F] text-[#071A14] font-bold text-sm rounded-lg hover:bg-[#4bc45e] transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Submit Your Request
          </button>
        </div>

      </form>
    </div>
  );
}
