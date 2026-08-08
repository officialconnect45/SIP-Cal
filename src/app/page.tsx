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
              <span>Home</span>
              <span aria-hidden>/</span>
              <span>Tools</span>
              <span aria-hidden>/</span>
              <span className="text-white font-medium">SIP Calculator</span>
            </nav>
          </div>
        </div>
      </div>

      <SipCalculator />

      <section className="border-t border-[var(--border)] bg-[var(--surface-muted)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl text-[var(--ink)]">
              Plan with clarity
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
              A Systematic Investment Plan (SIP) invests a fixed amount at regular
              intervals, helping average purchase cost over time. Use this tool
              to model contributions, expected returns, and optional annual
              step-ups before you speak with an advisor.
            </p>
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
