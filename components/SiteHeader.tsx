import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Software", "/software-development"],
  ["AI & Data", "/ai-data-science"],
  ["Experience", "/experience"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Gerald Santiago home">
        GS<span>.</span>
      </Link>
      <nav aria-label="Main navigation" className="nav-links">
        {links.map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
