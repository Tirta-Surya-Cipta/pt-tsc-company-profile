import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PartnerForm from "@/components/admin/partners/PartnerForm";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const partner = await prisma.partner.findUnique({
    where: { id },
  });

  if (!partner) {
    notFound();
  }

  return (
    <div>
      <PartnerForm
        mode="edit"
        partnerId={partner.id}
        initialData={{
          name: partner.name,
          logoUrl: partner.logoUrl,
          displayOrder: partner.displayOrder,
        }}
      />
    </div>
  );
}
