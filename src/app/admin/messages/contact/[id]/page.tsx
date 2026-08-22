import { messageService } from "@/server/services/message.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Paperclip, AlertCircle } from "lucide-react";
import { MessageTypeBadge } from "@/components/admin/messages/MessageTypeBadge";
import { DeleteMessageDialog } from "@/components/admin/messages/DeleteMessageDialog";

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const message = await messageService.getMessageById("CONTACT", resolvedParams.id);

  if (!message) {
    notFound();
  }

  const mailtoLink = `mailto:${message.email}?subject=Re: ${encodeURIComponent(
    message.subject
  )}`;

  const hasAttachment = message.message.includes("[Attachment]:");
  let messageContent = message.message;
  let attachmentUrl = "";

  if (hasAttachment) {
    const parts = message.message.split("[Attachment]:");
    messageContent = parts[0].trim();
    attachmentUrl = parts[1].trim();
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/admin/messages"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#1F6B45] transition-colors"
      >
        <ArrowLeft size={16} /> Back to Messages
      </Link>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">{message.subject}</h1>
            <MessageTypeBadge type="CONTACT" />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            {new Date(message.createdAt).toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Full Name
              </p>
              <p className="text-slate-900 font-medium">{message.fullName}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Company Name
              </p>
              <p className="text-slate-900 font-medium">{message.companyName}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Email Address
              </p>
              <p className="text-slate-900 font-medium">
                <a href={`mailto:${message.email}`} target="_blank" rel="noopener noreferrer" className="text-[#1F6B45] hover:underline">
                  {message.email}
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Phone Number
              </p>
              <p className="text-slate-900 font-medium">{message.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Service Type
              </p>
              <p className="text-slate-900 font-medium">{message.serviceType || "-"}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Message Content
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 whitespace-pre-wrap text-slate-700 leading-relaxed">
              {messageContent}
            </div>
            {attachmentUrl && attachmentUrl !== "Gagal diunggah" && (
              <div className="mt-4">
                <a href={attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#1F6B45] font-semibold text-sm rounded-lg hover:border-[#1F6B45] transition-colors shadow-sm">
                  <Paperclip size={16} /> View Attachment
                </a>
              </div>
            )}
            {attachmentUrl === "Gagal diunggah" && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 text-sm font-semibold rounded-lg">
                <AlertCircle size={16} /> Attachment failed to upload
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3 justify-between items-center">
          <DeleteMessageDialog id={message.id} type="CONTACT" />
          <a
            href={mailtoLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1F6B45] text-white font-semibold hover:bg-[#165033] transition-colors"
          >
            <Mail size={16} /> Reply via Email
          </a>
        </div>
      </div>
    </div>
  );
}
