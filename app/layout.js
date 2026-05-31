import { SplashProvider } from "@/app/contexts/SplashContext";
import Splash from "@/components/Splash";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";
import "@/app/fonts";
import { schibsted_grotesk, lora } from "@/app/fonts";
import "@/app/globals.css";
import { dbConnect } from "@/lib/db";
import Site from "@/app/schemas/Site";

async function getSiteData() {
  await dbConnect();
  return Site.findOne({}).lean();
}

export default async function RootLayout({ children }) {
  const site = await getSiteData();

  return (
    <html lang="en" className={`${schibsted_grotesk.variable} ${lora.variable}`}>
      <body>
        <SplashProvider>
          <Splash />
          <PageHeader />
          <FloatingBanner banner={site?.banner} />
          <main className="content">{children}</main>
          <Footer />
        </SplashProvider>
      </body>
    </html>
  );
}
