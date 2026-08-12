import Link from "next/link";

const columns = [
  {
    title: "Investing",
    links: [
      { label: "Mutual Funds", href: "/info/mutual-funds" },
      { label: "SIP Plans", href: "/info/sip-plans" },
      { label: "Lump Sum Investing", href: "/info/lump-sum" },
      { label: "Retirement Planning", href: "/info/retirement" },
    ],
  },
  {
    title: "Tools & Resources",
    links: [
      { label: "SIP Calculator", href: "/" },
      { label: "Tools Overview", href: "/info/tools" },
      { label: "Help Center", href: "/info/help-center" },
      { label: "FAQs", href: "/info/faqs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/info/contact" },
      { label: "Advice", href: "/info/advice" },
      { label: "Planning", href: "/info/planning" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Calc Wealth", href: "/info/about" },
      { label: "Disclosures", href: "/info/disclosures" },
      { label: "Accessibility", href: "/info/accessibility" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy", href: "/info/privacy" },
  { label: "Security", href: "/info/security" },
  { label: "Terms of Use", href: "/info/terms" },
  { label: "Disclosures", href: "/info/disclosures" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-white mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--footer-muted)] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-xl">
            <Link href="/" className="flex items-center gap-2.5 mb-3 w-fit">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[var(--brand-red)] text-white text-xs font-semibold">
                CW
              </span>
              <span className="text-sm font-semibold text-white">
                Calc Wealth
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[var(--footer-muted)]">
              Illustrative estimates only. Actual investment returns vary with
              market conditions, fees, and product selection. This calculator
              does not constitute investment advice or a solicitation to buy or
              sell any security.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#061525]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-[var(--footer-muted)]">
            © {new Date().getFullYear()} Calc Wealth. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-[var(--footer-muted)] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
