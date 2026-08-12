import Link from "next/link";
import SipCalculator from "@/components/SipCalculator";

export default function Home() {
  return (
    <>
      <div className="bg-[var(--brand-red)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3.5">
            <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              SIP Investment Calculator
            </h1>
            <nav
              className="hidden sm:flex items-center gap-2 text-xs text-white/85"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/info/tools" className="hover:text-white">
                Tools
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white font-medium">SIP Calculator</span>
            </nav>
          </div>
        </div>
      </div>

      <SipCalculator />

      <section className="border-t border-[var(--border)] bg-[var(--surface-muted)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl text-[var(--ink)]">
              Plan with clarity
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
              <p>
                A Systematic Investment Plan (SIP) invests a fixed amount at
                regular intervals—usually every month—into a chosen mutual fund
                or investment option. Instead of trying to guess the perfect day
                to enter the market, you invest steadily through ups and downs.
                That habit can help average your purchase cost over time and keep
                your plan moving even when headlines feel uncertain.
              </p>
              <p>
                Clarity starts with three simple inputs: how much you can invest
                each month, how long you can stay invested, and what return you
                are willing to assume for planning. None of these numbers need to
                be perfect on day one. The purpose of a calculator is to turn
                vague goals into visible scenarios so you can compare choices
                before you commit money. Small changes in monthly amount,
                duration, or expected return can create large differences in
                estimated corpus over ten or twenty years.
              </p>
              <p>
                Use this tool to model contributions, expected annual returns,
                and optional annual step-ups. A step-up increases your SIP each
                year as income grows, which can strengthen long-term outcomes
                without requiring a large jump in today’s budget. Switch between
                SIP and lump sum if you are deciding whether to invest gradually
                or put a larger amount to work at once. Review total invested,
                estimated returns, and inflation-adjusted value together so you
                see both growth and purchasing power.
              </p>
              <p>
                Treat every result as an educational estimate, not a promise.
                Markets vary, fund expenses and taxes are not included here, and
                past performance does not guarantee future results. When your
                numbers look clear enough, take the scenario to a registered
                advisor or your financial institution and ask how it fits your
                risk profile, goals, and product options. Planning with clarity
                means replacing guesswork with structured assumptions—and
                updating those assumptions as your life and income change.
              </p>
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            <InfoBlock
              title="Stay consistent"
              body="Regular investing builds discipline and reduces the need to time the market."
            />
            <InfoBlock
              title="Compound growth"
              body="Returns reinvested over longer horizons can meaningfully increase corpus size."
            />
            <InfoBlock
              title="Step up over time"
              body="Increasing your SIP as income rises can accelerate wealth creation."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t-2 border-[var(--brand-blue)] pt-4">
      <h3 className="text-sm font-semibold text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{body}</p>
    </div>
  );
}
