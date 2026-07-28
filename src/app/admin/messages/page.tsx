import { prisma } from "@/lib/prisma";
import { MessageTable } from "@/components/admin/messages/MessageTable";
import { MessageFilters } from "@/components/admin/messages/MessageFilters";
import { messageService } from "@/server/services/message.service";
import { MessageType } from "@/types";

export const dynamic = "force-dynamic";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const typeFilter = (resolvedParams.type as "ALL" | MessageType) || "ALL";
  const searchFilter = resolvedParams.search || "";

  // Get filtered messages for the list
  const messages = await messageService.getAllMessages(searchFilter, typeFilter);

  // Get raw counts directly from DB for the filters
  const [contactCount, quoteCount] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.quoteRequest.count(),
  ]);

  const counts = {
    all: contactCount + quoteCount,
    contact: contactCount,
    quote: quoteCount,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Unified Inbox</h1>
        <p className="text-slate-500 mt-1">
          Manage all incoming contact messages and quote requests.
        </p>
      </div>

      <MessageFilters counts={counts} />

      <MessageTable messages={messages} />
    </div>
  );
}
