import { SplashProvider } from "./contexts/SplashContext";
import Splash from "../components/Splash";
import PageHeader from "../components/PageHeader";
import "./fonts";
import { schibsted_grotesk } from "./fonts";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${schibsted_grotesk.variable}`}>
      <body>
        <SplashProvider>
          <Splash />
          <PageHeader />
          <main className="content">{children}</main>
        </SplashProvider>
      </body>
    </html>
  );
}
