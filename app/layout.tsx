import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactButtons } from "@/components/ContactButtons";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  title: `${portfolio.name} — Portfolio`,
  description: portfolio.intro,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { var savedTheme = localStorage.getItem("gerald-portfolio-theme"); if (savedTheme === "dark" || savedTheme === "light") document.documentElement.dataset.theme = savedTheme; } catch {}` }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} {portfolio.name}</span>
          <nav className="footer-socials" aria-label="Contact and social links">
            <ContactButtons variant="footer" />
          </nav>
        </footer>
      </body>
    </html>
  );
}
