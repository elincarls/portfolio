import TopNav from "../components/TopNav";
import "./fonts";
import { schibsted_grotesk } from "./fonts";
import "./globals.css";
import { SplashProvider } from "./contexts/SplashContext";
import Splash from "../components/Splash";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${schibsted_grotesk.variable}`}>
      <body>
        <SplashProvider>
          <Splash />
          <TopNav />
          <main className="content">{children}</main>
        </SplashProvider>
      </body>
    </html>
  );
}
