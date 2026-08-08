import Link from "next/link";

const columns = [
  {
    title: "Investing",
    links: [
      { label: "Mutual Funds", href: "#" },
      { label: "SIP Plans", href: "#" },
      { label: "Lump Sum Investing", href: "#" },
      { label: "Retirement Planning", href: "#" },
    ],
  },
  {
    title: "Tools & Resources",
    links: [
      { label: "SIP Calculator", href: "/" },
      { label: "Goal Planner", href: "#" },
      { label: "Risk Profiler", href: "#" },
      { label: "Market Insights", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Find an Advisor", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Calc Wealth", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Newsroom", href: "#" },
      { label: "Investor Relations", href: "#" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Security", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Disclosures", href: "#" },
  { label: "Accessibility", href: "#" },
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

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[var(--brand-red)] text-white text-xs font-semibold">
                CW
              </span>
              <span className="text-sm font-semibold text-white">
                Calc Wealth
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--footer-muted)]">
              Illustrative estimates only. Actual investment returns vary with
              market conditions, fees, and product selection. This calculator
              does not constitute investment advice or a solicitation to buy or
              sell any security.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SocialLink label="LinkedIn" />
            <SocialLink label="X" />
            <SocialLink label="YouTube" />
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

function SocialLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
    >
      <span className="text-[10px] font-semibold tracking-wide">
        {label.slice(0, 2).toUpperCase()}
      </span>
    </a>
  );
}
