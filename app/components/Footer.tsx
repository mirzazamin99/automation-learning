import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#who-its-for", label: "Who it's for" },
  { href: "/services", label: "Services" },
];

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-surface-tint">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl text-foreground">
              Dr. Aamir
            </span>
            <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-foreground-dim">
              Direction coaching for individuals and organizations ready to
              decide, not just discuss.
            </p>
          </div>

          <div>
            <span className="text-sm font-medium text-foreground-faint">
              Explore
            </span>
            <nav className="mt-4 flex flex-col gap-3">
              {EXPLORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base text-foreground-dim transition-colors duration-300 ease-out hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <span className="text-sm font-medium text-foreground-faint">
              Get in touch
            </span>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="mailto:hello@draamir.com"
                className="text-base text-foreground-dim transition-colors duration-300 ease-out hover:text-foreground"
              >
                hello@draamir.com
              </a>
              <a
                href="mailto:hello@draamir.com?subject=Consultation%20Request"
                className="text-base font-medium text-accent-text transition-colors duration-300 ease-out hover:text-accent-hover"
              >
                Book a consultation &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-edge pt-8 text-sm text-foreground-faint md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} Dr. Aamir. All rights reserved.</span>
          <span>Direction coaching, speaking, and organizational sessions.</span>
        </div>
      </div>
    </footer>
  );
}
