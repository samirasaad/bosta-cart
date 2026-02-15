/**
 * Product detail page.
 *
 * Metadata is intentionally generic (same title/description for all product URLs).
 * We do not fetch product data for metadata because the Fake Store API is unstable
 * (e.g. ECONNRESET from Node), so relying on it for OG/twitter would make link
 * previews and crawler behaviour unreliable.
 *
 * Share functionality (copy link, social intents, native share) is not implemented
 * for the same reason: shared links would point to this page, and crawlers would
 * need product-specific metadata for good previews; since we cannot depend on the
 * API for that metadata, we do not offer share to avoid misleading or broken previews.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/features/product-detail/ProductDetail";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { env } from "@/lib/env";
import { getProductServer } from "@/lib/api/getProductServer";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = env.appUrl.replace(/\/$/, "");
  const path = `/products/${id}`;
  const absoluteUrl = `${baseUrl}${path}`;
  const title = `${env.siteName} | Product`;
  const description = `View product details at ${env.siteName}.`;
  const defaultImage = env.ogImageDefault;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: absoluteUrl },
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl,
      siteName: env.siteName,
      locale: "en_US",
      ...(defaultImage && {
        images: [{ url: defaultImage, width: 800, height: 800, alt: env.siteName }],
      }),
    },
    twitter: {
      card: defaultImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(defaultImage && { images: [{ url: defaultImage, width: 800, height: 800, alt: env.siteName }] }),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let initialProduct: Awaited<ReturnType<typeof getProductServer>> | undefined;
  try {
    initialProduct = await getProductServer(id);
  } catch (err) {
    const status = err && typeof err === "object" && "status" in err ? (err as { status?: number }).status : undefined;
    if (status === 404) notFound();
    // Network/5xx: render ProductDetail without initialProduct so client fetches
  }

  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        }
      >
        <ProductDetail productId={id} initialProduct={initialProduct} />
      </Suspense>
    </main>
  );
}
