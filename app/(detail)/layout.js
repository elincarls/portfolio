import BackNav from "../../components/BackNav";
import "../fonts";
import { open_sans, sora } from "../fonts";
import "./../globals.css";

export default function DetailLayout({ children, modal }) {
  return (
    <>
      <BackNav />
      <main className="detail-content">{children}</main>

      {modal}
    </>
  );
}
