export type InvestmentMode = "sip" | "lumpsum";

export interface SipInputs {
  mode: InvestmentMode;
  monthlyAmount: number;
  lumpSumAmount: number;
  annualReturn: number;
  years: number;
  stepUpPercent?: number;
}

export interface SipResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  /** Absolute gain vs invested amount, as percent. */
  absoluteReturnPercent: number;
  /** Effective annualized return on invested capital (approx). */
  wealthMultiple: number;
  /** Corpus adjusted for inflation (real terms). */
  inflationAdjustedValue: number;
}

/** Typical long-term expected returns used by Indian retail calculators (illustrative). */
export const MARKET_RETURN_PRESETS = [
  {
    id: "equity",
    label: "Equity",
    rate: 12,
    hint: "Diversified equity / Nifty-style long-term",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    rate: 10,
    hint: "Aggressive hybrid / balanced advantage",
  },
  {
    id: "debt",
    label: "Debt",
    rate: 7,
    hint: "Corporate bond / short duration funds",
  },
  {
    id: "conservative",
    label: "Conservative",
    rate: 8,
    hint: "Conservative hybrid / large-cap blend",
  },
] as const;

/** India long-term inflation assumption commonly used in planning tools. */
export const DEFAULT_INFLATION_PERCENT = 6;

/**
 * Market-standard SIP FV (Groww / AMFI-style):
 * FV = P × [((1 + i)^n − 1) / i] × (1 + i)
 * where i = annualRate/12/100, n = months
 * Assumes contribution at the beginning of each month, monthly compounding.
 */
export function calculateSip(
  monthlyAmount: number,
  annualReturnPercent: number,
  years: number
): Omit<SipResult, "inflationAdjustedValue"> & { totalValue: number } {
  const months = Math.max(0, Math.round(years * 12));
  const i = annualReturnPercent / 100 / 12;
  const investedAmount = monthlyAmount * months;

  if (months === 0 || monthlyAmount <= 0) {
    return emptyPartial();
  }

  let totalValue: number;
  if (Math.abs(i) < 1e-12) {
    totalValue = investedAmount;
  } else {
    totalValue =
      monthlyAmount * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
  }

  return finalizePartial(investedAmount, totalValue);
}

/**
 * Step-up SIP — industry month-by-month model:
 * each month: corpus = (corpus + SIP) × (1 + monthlyRate)
 * SIP increases once per year by stepUp%.
 */
export function calculateSipWithStepUp(
  monthlyAmount: number,
  annualReturnPercent: number,
  years: number,
  stepUpPercent: number
): Omit<SipResult, "inflationAdjustedValue"> & { totalValue: number } {
  const totalMonths = Math.max(0, Math.round(years * 12));
  const monthlyRate = annualReturnPercent / 100 / 12;

  if (totalMonths === 0 || monthlyAmount <= 0) {
    return emptyPartial();
  }

  if (stepUpPercent <= 0) {
    return calculateSip(monthlyAmount, annualReturnPercent, years);
  }

  let corpus = 0;
  let investedAmount = 0;
  let currentSip = monthlyAmount;

  for (let m = 0; m < totalMonths; m++) {
    investedAmount += currentSip;
    corpus = (corpus + currentSip) * (1 + monthlyRate);

    // Increase SIP after every completed year (months 12, 24, …)
    if ((m + 1) % 12 === 0 && m + 1 < totalMonths) {
      currentSip *= 1 + stepUpPercent / 100;
    }
  }

  return finalizePartial(investedAmount, corpus);
}

/**
 * Lump sum with monthly compounding (standard for MF calculators):
 * FV = P × (1 + r/12)^(n×12)
 */
export function calculateLumpSum(
  principal: number,
  annualReturnPercent: number,
  years: number
): Omit<SipResult, "inflationAdjustedValue"> & { totalValue: number } {
  const months = Math.max(0, Math.round(years * 12));
  const i = annualReturnPercent / 100 / 12;

  if (months === 0 || principal <= 0) {
    return emptyPartial();
  }

  const totalValue =
    Math.abs(i) < 1e-12 ? principal : principal * Math.pow(1 + i, months);

  return finalizePartial(principal, totalValue);
}

export function calculateInvestment(inputs: SipInputs): SipResult {
  const years = Math.max(0, inputs.years);
  let partial: Omit<SipResult, "inflationAdjustedValue">;

  if (inputs.mode === "sip") {
    const step = inputs.stepUpPercent ?? 0;
    partial =
      step > 0
        ? calculateSipWithStepUp(
            inputs.monthlyAmount,
            inputs.annualReturn,
            years,
            step
          )
        : calculateSip(inputs.monthlyAmount, inputs.annualReturn, years);
  } else {
    partial = calculateLumpSum(
      inputs.lumpSumAmount,
      inputs.annualReturn,
      years
    );
  }

  return withInflation(partial, years, DEFAULT_INFLATION_PERCENT);
}

function withInflation(
  partial: Omit<SipResult, "inflationAdjustedValue">,
  years: number,
  inflationPercent: number
): SipResult {
  const inflationFactor = Math.pow(1 + inflationPercent / 100, years);
  const inflationAdjustedValue =
    inflationFactor > 0 ? partial.totalValue / inflationFactor : partial.totalValue;

  return {
    ...partial,
    inflationAdjustedValue,
  };
}

function emptyPartial(): Omit<SipResult, "inflationAdjustedValue"> {
  return {
    investedAmount: 0,
    estimatedReturns: 0,
    totalValue: 0,
    absoluteReturnPercent: 0,
    wealthMultiple: 0,
  };
}

function finalizePartial(
  investedAmount: number,
  totalValue: number
): Omit<SipResult, "inflationAdjustedValue"> {
  const estimatedReturns = Math.max(0, totalValue - investedAmount);
  const absoluteReturnPercent =
    investedAmount > 0 ? (estimatedReturns / investedAmount) * 100 : 0;
  const wealthMultiple = investedAmount > 0 ? totalValue / investedAmount : 0;

  return {
    investedAmount,
    estimatedReturns,
    totalValue,
    absoluteReturnPercent,
    wealthMultiple,
  };
}

export function formatCurrency(value: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

export function parseAmount(raw: string): number {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/** Clamp inputs to ranges used by major Indian SIP calculators. */
export function clampMonthlySip(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 10_00_000);
}

export function clampLumpSum(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 5_00_00_000);
}

export function clampReturnRate(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 30);
}

export function clampStepUp(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 50);
}
