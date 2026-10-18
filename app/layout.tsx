import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  title: `${portfolio.name} — Portfolio`,
  description: portfolio.intro,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <footer className="site-footer"><span>© {new Date().getFullYear()} {portfolio.name}</span><span>Built with Next.js</span></footer>
      </body>
    </html>
  );
}
