import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "404 Not Found | PT Tirta Surya Cipta",
  description: "The requested engineering asset or page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <Container className="py-24 flex flex-col items-center">
      <EmptyState
        title="Engineering Asset Not Registered"
        description="The requested routing node or URL path is not available on our telemetry server."
        icon={<AlertCircle className="h-10 w-10 text-primary animate-pulse" />}
      />
      <Link href="/" passHref>
        <Button className="mt-8">
          Return to Plant Dashboard
        </Button>
      </Link>
    </Container>
  );
}
