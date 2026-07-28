"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, UploadCloud } from "lucide-react";

export function QuoteForm() {
  const [submitting, setSubmitting] = React.useState(false);
<<<<<<< Updated upstream
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [services, setServices] = React.useState<string[]>([]);
  
  const serviceOptions = [
    "VSD / Inverter System", "PLC & Automation", "Control Panel Integration",
    "System Integration", "Commissioning", "Technical Support",
    "Upgrade / Retrofit", "Preventive Maintenance", "Other (please specify)"
  ];
=======
  const [status, setStatus] = React.useState<{ success?: boolean; message?: string; error?: string } | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
>>>>>>> Stashed changes

  const handleServiceChange = (service: string) => {
    setServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    
    // Combine extra fields into the message to work with the existing backend
    const combinedMessage = `
Industry/Facility Type: ${data.industry || 'Not specified'}
Services Needed: ${services.length > 0 ? services.join(", ") : 'Not specified'}
Site Location: ${data.location || 'Not specified'}
Target Timeline: ${data.timeline || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}
Preferred Contact Method: ${data.contactMethod || 'Not specified'}

Additional Information:
${data.additionalInfo || 'None provided'}
    `.trim();

    const payload = {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      subject: data.subject || "Request for Quote",
      message: combinedMessage
    };

    try {
<<<<<<< Updated upstream
      const response = await axios.post("/api/contact", payload);
      if (response.data.success) {
        toast.success("Quote request submitted successfully. We will get back to you soon!");
        reset();
        setServices([]);
      } else {
        toast.error(response.data.error || "Failed to submit quote request");
=======
      const res = await submitQuoteRequest(formData);
      setStatus(res);
      if (res.success) {
        toast.success(res.message || "Quote request submitted successfully!");
        formElement.reset();
        setFileName(null);
      } else if (res.error) {
        toast.error(res.error);
>>>>>>> Stashed changes
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Connection error. Please try again.");
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Full Name <span className="text-red-500">*</span></label>
            <input 
              {...register("name", { required: "Name is required" })} 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter your full name" 
            />
            {errors.name && <p className="text-[11px] text-red-500">{errors.name.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Company Name <span className="text-red-500">*</span></label>
            <input 
              {...register("company", { required: "Company is required" })} 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter your company name" 
            />
            {errors.company && <p className="text-[11px] text-red-500">{errors.company.message as string}</p>}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Email Address <span className="text-red-500">*</span></label>
            <input 
              {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })} 
              type="email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter your email address" 
            />
            {errors.email && <p className="text-[11px] text-red-500">{errors.email.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Phone / WhatsApp <span className="text-red-500">*</span></label>
            <input 
              {...register("phone", { required: "Phone number is required" })} 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter your phone number" 
            />
            {errors.phone && <p className="text-[11px] text-red-500">{errors.phone.message as string}</p>}
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Subject <span className="text-red-500">*</span></label>
            <input 
              {...register("subject", { required: "Subject is required" })} 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="Enter subject" 
            />
            {errors.subject && <p className="text-[11px] text-red-500">{errors.subject.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Industry / Facility Type <span className="text-red-500">*</span></label>
            <select 
              {...register("industry", { required: "Industry is required" })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 appearance-none text-[#1E293B]" 
              defaultValue=""
            >
              <option value="" disabled className="text-gray-400">Select inquiry type</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Water & Wastewater">Water & Wastewater</option>
              <option value="Building Utility">Building Utility / HVAC</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Oil & Gas">Oil & Gas</option>
              <option value="Other">Other</option>
            </select>
            {errors.industry && <p className="text-[11px] text-red-500">{errors.industry.message as string}</p>}
          </div>
        </div>

        {/* Services Checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-[#1E293B]">Service / Solution Needed <span className="text-red-500">*</span> <span className="text-gray-400 font-normal ml-1">(You can select multiple)</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {serviceOptions.map(service => (
              <label key={service} className="flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border border-gray-200 hover:border-[#59D66F]/50 transition-colors bg-white group">
                <input 
                  type="checkbox" 
                  checked={services.includes(service)}
                  onChange={() => handleServiceChange(service)}
                  className="w-4 h-4 rounded border-gray-300 text-[#59D66F] focus:ring-[#59D66F]" 
                />
                <span className="text-xs text-[#6B7280] group-hover:text-[#1E293B] transition-colors">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Site Location <span className="text-red-500">*</span></label>
            <input 
              {...register("location", { required: "Location is required" })} 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50" 
              placeholder="City / Area / Province" 
            />
            {errors.location && <p className="text-[11px] text-red-500">{errors.location.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Target Timeline <span className="text-red-500">*</span></label>
            <select 
              {...register("timeline", { required: "Timeline is required" })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 appearance-none text-[#1E293B]" 
              defaultValue=""
            >
              <option value="" disabled className="text-gray-400">Select timeline</option>
              <option value="ASAP">ASAP (Immediate)</option>
              <option value="1-3 Months">1-3 Months</option>
              <option value="3-6 Months">3-6 Months</option>
              <option value="Planning Stage">Planning Stage</option>
            </select>
            {errors.timeline && <p className="text-[11px] text-red-500">{errors.timeline.message as string}</p>}
          </div>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Estimated Budget Range (Optional)</label>
            <select 
              {...register("budget")}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 appearance-none text-[#1E293B]" 
              defaultValue=""
            >
              <option value="" disabled className="text-gray-400">Select budget range</option>
              <option value="< 50M IDR">&lt; 50M IDR</option>
              <option value="50M - 200M IDR">50M - 200M IDR</option>
              <option value="200M - 500M IDR">200M - 500M IDR</option>
              <option value="> 500M IDR">&gt; 500M IDR</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B]">Preferred Contact Method <span className="text-red-500">*</span></label>
            <select 
              {...register("contactMethod", { required: "Contact method is required" })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 appearance-none text-[#1E293B]" 
              defaultValue=""
            >
              <option value="" disabled className="text-gray-400">Select preferred contact method</option>
              <option value="Email">Email</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone Call">Phone Call</option>
            </select>
            {errors.contactMethod && <p className="text-[11px] text-red-500">{errors.contactMethod.message as string}</p>}
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-[#1E293B]">Additional Information (Optional)</label>
          <textarea 
            {...register("additionalInfo")}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#59D66F] focus:ring-1 focus:ring-[#59D66F]/20 transition-all bg-gray-50/50 resize-none"
            placeholder="Any additional information, references, or notes that may help us understand your project better..."
          ></textarea>
        </div>

        {/* File Upload UI */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E293B]">Upload Files (Optional)</label>
          <input
            type="file"
            name="attachment"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.dwg,.jpg,.jpeg,.png,.webp"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFileName(e.target.files[0].name);
              } else {
                setFileName(null);
              }
            }}
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <UploadCloud size={28} className="text-[#59D66F] mb-3 group-hover:-translate-y-1 transition-transform" />
            <p className="text-sm font-semibold text-[#1E293B] mb-1">
              {fileName ? fileName : "Click to upload or drag & drop"}
            </p>
            <p className="text-xs text-gray-500">PDF, DWG, JPG, PNG (Max 10MB per file)</p>
          </div>
        </div>

        {/* Consent & Submit */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <input 
              type="checkbox" 
              id="consent" 
              {...register("consent", { required: "You must agree to be contacted" })}
              className="w-4 h-4 rounded border-gray-300 text-[#59D66F] focus:ring-[#59D66F] mt-0.5" 
            />
            <div>
              <label htmlFor="consent" className="text-xs text-[#6B7280]">I agree to be contacted regarding this inquiry.</label>
              <p className="text-[10px] text-gray-400 mt-0.5">Your information is safe with us and will only be used to respond to your inquiry.</p>
              {errors.consent && <p className="text-[11px] text-red-500 mt-1">{errors.consent.message as string}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full sm:w-auto px-8 py-3 bg-[#59D66F] text-[#071A14] font-bold text-sm rounded-lg hover:bg-[#4bc45e] transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Submit Your Request
          </button>
        </div>

      </form>
    </div>
  );
}
