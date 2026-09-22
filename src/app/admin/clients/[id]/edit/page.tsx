import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ClientForm from "@/components/admin/clients/ClientForm";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
  });

  if (!client) {
    notFound();
  }

  return (
    <div>
      <ClientForm
        mode="edit"
        clientId={client.id}
        initialData={{
          name: client.name,
          logoUrl: client.logoUrl,
          displayOrder: client.displayOrder,
        }}
      />
    </div>
  );
}
