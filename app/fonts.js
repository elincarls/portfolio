import { Schibsted_Grotesk, Lora } from "next/font/google";

export const schibsted_grotesk = Schibsted_Grotesk({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted-grotesk",
});

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});
