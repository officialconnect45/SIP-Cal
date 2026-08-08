"use client";

import { useMemo, useState } from "react";
import {
  MARKET_RETURN_PRESETS,
  DEFAULT_INFLATION_PERCENT,
  calculateInvestment,
  clampLumpSum,
  clampMonthlySip,
  clampReturnRate,
  clampStepUp,
  formatCurrency,
  formatPercent,
  type InvestmentMode,
} from "@/lib/sip";

const DURATION_OPTIONS = [
  { label: "1 Year", value: 1 },
  { label: "3 Years", value: 3 },
  { label: "5 Years", value: 5 },
  { label: "7 Years", value: 7 },
  { label: "10 Years", value: 10 },
  { label: "15 Years", value: 15 },
  { label: "20 Years", value: 20 },
  { label: "25 Years", value: 25 },
  { label: "30 Years", value: 30 },
];

export default function SipCalculator() {
  const [mode, setMode] = useState<InvestmentMode>("sip");
  const [monthlyAmount, setMonthlyAmount] = useState("10000");
  const [lumpSumAmount, setLumpSumAmount] = useState("100000");
  const [annualReturn, setAnnualReturn] = useState("12");
  const [years, setYears] = useState(10);
  const [stepUpEnabled, setStepUpEnabled] = useState(false);
  const [stepUpPercent, setStepUpPercent] = useState("10");

  const result = useMemo(() => {
    const monthly = clampMonthlySip(Number(monthlyAmount) || 0);
    const lump = clampLumpSum(Number(lumpSumAmount) || 0);
    const rate = clampReturnRate(Number(annualReturn) || 0);
    const step = stepUpEnabled ? clampStepUp(Number(stepUpPercent) || 0) : 0;

    return calculateInvestment({
      mode,
      monthlyAmount: monthly,
      lumpSumAmount: lump,
      annualReturn: rate,
      years,
      stepUpPercent: step,
    });
  }, [
    mode,
    monthlyAmount,
    lumpSumAmount,
    annualReturn,
    years,
    stepUpEnabled,
    stepUpPercent,
  ]);

  const investedShare =
    result.totalValue > 0
      ? Math.min(100, (result.investedAmount / result.totalValue) * 100)
      : 100;
  const returnsShare = 100 - investedShare;

  return (
    <section className="bg-[var(--surface-muted)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Page intro */}
        <div className="mb-8 max-w-3xl">
          <div className="mb-4 text-[var(--muted)]">
            <CalculatorIcon />
          </div>
          <h2 className="font-display text-[1.85rem] sm:text-[2.15rem] leading-tight text-[var(--brand-red)] font-normal tracking-[-0.01em]">
            How much could your investments grow?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
            Enter your investment details on the left. Results update instantly
            using the market-standard SIP formula with monthly compounding.
          </p>

          <div
            className="mt-6 grid grid-cols-2 w-full max-w-sm"
            role="tablist"
            aria-label="Investment type"
          >
            <ModeTab
              active={mode === "sip"}
              onClick={() => setMode("sip")}
              label="SIP"
            />
            <ModeTab
              active={mode === "lumpsum"}
              onClick={() => setMode("lumpsum")}
              label="Lump Sum"
            />
          </div>
        </div>

        {/* Input | Output panels */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* INPUT PANEL */}
          <div className="bg-white border border-[var(--border)] shadow-sm">
            <div className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Step 1
                </p>
                <h3 className="text-base font-semibold text-[var(--ink)]">
                  Your inputs
                </h3>
              </div>
              <span className="text-xs text-[var(--muted)] hidden sm:inline">
                All fields update live
              </span>
            </div>

            <div className="p-6 space-y-6">
              {mode === "sip" ? (
                <Field
                  id="monthly-amount"
                  label="Monthly investment"
                  required
                  hint="Allowed range: ₹500 – ₹10,00,000"
                  prefix="₹"
                  value={monthlyAmount}
                  onChange={setMonthlyAmount}
                />
              ) : (
                <Field
                  id="lumpsum-amount"
                  label="Lump sum amount"
                  required
                  hint="Allowed range: ₹5,000 – ₹5,00,00,000"
                  prefix="₹"
                  value={lumpSumAmount}
                  onChange={setLumpSumAmount}
                />
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <Field
                  id="expected-return"
                  label="Expected annual return"
                  required
                  hint="Typical equity range: 8% – 15%"
                  suffix="%"
                  value={annualReturn}
                  onChange={setAnnualReturn}
                />

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-[var(--ink)] mb-1.5"
                  >
                    Investment duration{" "}
                    <span className="text-[var(--brand-red)]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="duration"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="field-control appearance-none pr-10"
                    >
                      {DURATION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                      <ChevronDown />
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--muted)]">
                    Longer horizons reduce timing risk
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[var(--muted)] mb-2">
                  Market standard return presets
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MARKET_RETURN_PRESETS.map((preset) => {
                    const active = Number(annualReturn) === preset.rate;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        title={preset.hint}
                        onClick={() => setAnnualReturn(String(preset.rate))}
                        className={`px-2 py-2 text-xs font-semibold border text-center transition-colors ${
                          active
                            ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white"
                            : "border-[var(--border-strong)] bg-white text-[var(--ink)] hover:border-[var(--brand-blue)]"
                        }`}
                      >
                        {preset.label}
                        <span className="block mt-0.5 opacity-90">
                          {preset.rate}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {mode === "sip" && (
                <div className="border-t border-[var(--border)] pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--ink)]">
                        Annual step-up
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--muted)]">
                        Increase SIP each year as income grows
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={stepUpEnabled}
                      onClick={() => setStepUpEnabled((v) => !v)}
                      className={`relative inline-flex h-7 w-[3.25rem] shrink-0 items-center border transition-colors ${
                        stepUpEnabled
                          ? "bg-[var(--brand-blue)] border-[var(--brand-blue)]"
                          : "bg-[var(--surface-muted)] border-[var(--border-strong)]"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 bg-white shadow-sm transition-transform ${
                          stepUpEnabled ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {stepUpEnabled && (
                    <div className="mt-4">
                      <Field
                        id="step-up"
                        label="Increase SIP by"
                        required
                        suffix="%"
                        value={stepUpPercent}
                        onChange={setStepUpPercent}
                        hint="Common step-up: 5% – 15% each year"
                      />
                    </div>
                  )}
                </div>
              )}

              {mode === "lumpsum" && (
                <div className="border-t border-[var(--border)] pt-6">
                  <p className="text-xs leading-relaxed text-[var(--ink-soft)] bg-[var(--surface-muted)] border border-[var(--border)] px-4 py-3">
                    Lump sum uses monthly compounding at the expected annual
                    rate — the same convention used by major mutual fund
                    calculators.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* OUTPUT PANEL */}
          <div
            className="bg-white border border-[var(--border)] shadow-sm lg:sticky lg:top-20"
            aria-live="polite"
          >
            <div className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Step 2
                </p>
                <h3 className="text-base font-semibold text-[var(--ink)]">
                  Your results
                </h3>
              </div>
              <span className="text-xs font-medium text-[var(--brand-link)]">
                Live
              </span>
            </div>

            <div className="p-6">
              <div className="bg-[var(--brand-blue)] px-5 py-6 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  Total value
                </p>
                <p className="mt-2 font-display text-[2rem] sm:text-[2.35rem] leading-none tracking-tight tabular-nums">
                  {formatCurrency(result.totalValue)}
                </p>
                <p className="mt-3 text-sm text-white/80">
                  {mode === "sip"
                    ? `₹${Number(monthlyAmount || 0).toLocaleString("en-IN")}/mo`
                    : `₹${Number(lumpSumAmount || 0).toLocaleString("en-IN")} once`}{" "}
                  · {years} yr · {annualReturn || 0}% p.a.
                  {mode === "sip" && stepUpEnabled
                    ? ` · ${stepUpPercent || 0}% step-up`
                    : ""}
                </p>
              </div>

              <div className="mt-0 grid grid-cols-2 border border-[var(--border)] border-t-0">
                <div className="px-5 py-4 border-r border-[var(--border)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Total invested
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-[var(--ink)] tabular-nums">
                    {formatCurrency(result.investedAmount)}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Est. returns
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-[var(--brand-red)] tabular-nums">
                    {formatCurrency(result.estimatedReturns)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Composition
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Invested {investedShare.toFixed(0)}% · Returns{" "}
                    {returnsShare.toFixed(0)}%
                  </p>
                </div>
                <div className="h-3 w-full flex overflow-hidden bg-[var(--surface-muted)] border border-[var(--border)]">
                  <div
                    className="bg-[var(--brand-blue)] transition-all duration-500"
                    style={{ width: `${investedShare}%` }}
                  />
                  <div
                    className="bg-[var(--brand-red)] transition-all duration-500"
                    style={{ width: `${returnsShare}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Legend color="var(--brand-blue)" label="Invested" />
                  <Legend color="var(--brand-red)" label="Returns" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Metric
                  label="Absolute return"
                  value={formatPercent(result.absoluteReturnPercent)}
                />
                <Metric
                  label="Wealth multiple"
                  value={`${result.wealthMultiple.toFixed(2)}×`}
                />
                <Metric
                  label="In today’s value"
                  value={formatCurrency(result.inflationAdjustedValue)}
                  hint={`${DEFAULT_INFLATION_PERCENT}% inflation`}
                />
              </div>

              <p className="mt-6 text-xs leading-relaxed text-[var(--muted)] border-t border-[var(--border)] pt-4">
                Formula: FV = P × [((1+i)ⁿ − 1) / i] × (1+i), monthly
                compounding. Illustrative only — excludes taxes and fund
                expenses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`h-11 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors ${
        active
          ? "bg-[var(--brand-blue)]"
          : "bg-[var(--brand-blue-soft)] hover:bg-[var(--brand-blue-mid)]"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  prefix,
  suffix,
  value,
  onChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  prefix?: string;
  suffix?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--ink)] mb-1.5"
      >
        {label}
        {required && <span className="text-[var(--brand-red)]"> *</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
          className={`field-control ${prefix ? "pl-8" : ""} ${suffix ? "pr-10" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-[var(--muted)]">{hint}</p>}
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--ink)] tabular-nums">
        {value}
      </p>
      {hint && <p className="mt-0.5 text-[10px] text-[var(--muted)]">{hint}</p>}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[var(--ink-soft)]">
      <span className="h-2.5 w-2.5" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

function CalculatorIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect
        x="10"
        y="6"
        width="28"
        height="36"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="15" y="11" width="18" height="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="26.5" r="1.5" fill="currentColor" />
      <circle cx="24" cy="26.5" r="1.5" fill="currentColor" />
      <circle cx="30.5" cy="26.5" r="1.5" fill="currentColor" />
      <circle cx="17.5" cy="33.5" r="1.5" fill="currentColor" />
      <circle cx="24" cy="33.5" r="1.5" fill="currentColor" />
      <circle cx="30.5" cy="33.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
