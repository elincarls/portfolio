import { SplashProvider } from "@/app/contexts/SplashContext";
import Splash from "@/components/Splash";
import PageHeader from "@/components/PageHeader";
import "@/app/fonts";
import { schibsted_grotesk } from "@/app/fonts";
import "@/app/globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${schibsted_grotesk.variable}`}>
      <body>
        <SplashProvider>
          <Splash />
          <PageHeader />
          <main className="content">{children}</main>
          <Footer />
        </SplashProvider>
      </body>
    </html>
  );
}
