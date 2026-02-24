import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCTA } from "@/components/ui/floating-cta";
import { getFooterContent, getContactInfo } from "@/lib/queries/site-content";
import { RealtimeProvider } from "@/providers/realtime-provider";

// Disable caching to always show fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [footerContent, contactInfo] = await Promise.all([
    getFooterContent(),
    getContactInfo(),
  ]);

  return (
    <RealtimeProvider>
      <Header contactInfo={contactInfo} />
      <main className="relative">{children}</main>
      <Footer content={footerContent} contactInfo={contactInfo} />
      <FloatingCTA text="Get Quote" />
    </RealtimeProvider>
  );
}
