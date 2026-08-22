import { MessageType } from "@/types";

export function MessageTypeBadge({ type }: { type: MessageType }) {
  if (type === "CONTACT") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
        CONTACT
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
      QUOTE
    </span>
  );
}
