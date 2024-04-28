import type { Metadata } from "next";
import { Poppins, Noto_Sans_KR } from "next/font/google";
import "@/app/globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
});

const notoSans = Noto_Sans_KR({
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
  preload: false,
});

const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const metadata: Metadata = {
  title: "Praise Box",
  description:
    "Let's come together to compliment each other and create a happy space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cls(poppins.className, notoSans.className)}>
        {children}
      </body>
    </html>
  );
}
