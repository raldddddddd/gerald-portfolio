import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
          <div className="construction-note construction-note--footer">
            <svg className="construction-tools-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path className="construction-wrench" d="M20.2 2.2a6.6 6.6 0 0 0-8.1 8.4l-9 9a2.2 2.2 0 1 0 3.1 3.1l9-9a6.6 6.6 0 0 0 8.4-8.1l-4.4 4.4-3.7-3.7 4.7-4.1Z" />
              <g transform="translate(-4 0)">
                <g className="construction-hammer">
                  <path className="construction-hammer-head" d="M12.2 8.9 15.3 6.8l-1-1.1c-.8-1-.2-2.2 1-2.2h2.1c.7 0 .8-.5.3-.9C16 1.2 13.3.7 11.2 1.4c-1.2-.5-2.7-.7-4.2-.2-1 .4-1.7 1.1-1.9 2.1-.1 1-.6 1.7-1.6 2.1L1.6 6.9c-.5.4-.5.9-.1 1.3L4 11.7c.4.4.9.3 1.3-.1l1.8-2c1-1.2 2.4-1.3 3.5-.2l1.1 1.1-1.4.3Z" transform="translate(1 3) scale(.8)" />
                  <path className="construction-hammer-handle" d="m10.528 10.558 1.444-1.444 11.2 11.2-1.444 1.444Z" />
                  <path className="construction-hammer-seam" d="m10.528 10.558 1.444-1.444" />
                </g>
              </g>
            </svg>
            <span>Portfolio in progress. Detail are being updated</span>
          </div>
          <nav className="footer-socials" aria-label="Contact and social links">
            <ContactButtons variant="footer" />
          </nav>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
