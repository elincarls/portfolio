import BackNav from "@/components/BackNav";
import "@/app/fonts";
import { schibsted_grotesk } from "@/app/fonts";
import "@/app/globals.css";

export default function DetailLayout({ children, modal }) {
  return (
    <>
      <BackNav />
      <main className="detail-content">{children}</main>

      {modal}
    </>
  );
}
