import type {
    User,
    Project,
    Partner,
    ContactMessage,
    QuoteRequest,
} from '@prisma/client';

// ─── Re-export Prisma types ───────────────────────────────────────────────────
export type {
    User,
    Project,
    Partner,
    ContactMessage,
    QuoteRequest,
};

// ─── Unified Messages ─────────────────────────────────────────────────────────
export type MessageType = "CONTACT" | "QUOTE";

export type AdminMessage = {
    id: string;
    type: MessageType;
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    subject: string;
    serviceType?: string;
    message: string;
    createdAt: Date;
};

// ─── Extended types (with relations) ─────────────────────────────────────────
// (Removed types dependent on non-existent Prisma models)


// ─── Server Action Response ───────────────────────────────────────────────────

export type ActionResponse<T = void> =
    | { success: true; data: T; message?: string }
    | { success: false; error: string };

// ─── Form types ───────────────────────────────────────────────────────────────

export type ContactFormData = {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject?: string;
    message: string;
};

export type ProjectFormData = {
    title: string;
    slug: string;
    description: string;
    content?: string;
    client?: string;
    location?: string;
    completedAt?: Date;
    status: string;
    serviceId?: string;
    applicationAreaIds?: string[];
};

export type PartnerFormData = {
    name: string;
    logoUrl: string;
    websiteUrl?: string;
    isActive?: boolean;
};

// ─── UI / Page types ──────────────────────────────────────────────────────────

export type NavLink = {
    label: string;
    href: string;
};

export type StatItem = {
    value: string;
    label: string;
};

export type CtaFeature = {
    title: string;
    desc: string;
};