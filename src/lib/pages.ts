export type InfoPage = {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export const infoPages: InfoPage[] = [
  {
    slug: "investing",
    title: "Investing",
    summary:
      "Learn how systematic investing and lump-sum strategies can help you build long-term wealth with clarity and discipline.",
    sections: [
      {
        heading: "Why invest regularly?",
        body: "Regular investing spreads purchases over time, reduces the pressure to time the market, and helps habits stick. A SIP is one of the simplest ways to stay invested through market cycles.",
      },
      {
        heading: "What Calc Wealth covers",
        body: "Calc Wealth focuses on educational calculators and plain-language explainers for mutual fund SIP, lump-sum investing, and long-term planning assumptions—not product recommendations or brokerage services.",
      },
    ],
  },
  {
    slug: "planning",
    title: "Planning",
    summary:
      "Good plans start with a goal, a time horizon, and a realistic return assumption. Use our tools to model scenarios before you commit money.",
    sections: [
      {
        heading: "Define the goal",
        body: "Whether you are saving for education, a home, or retirement, convert the goal into an amount and a target year. That makes monthly contribution choices clearer.",
      },
      {
        heading: "Stress-test assumptions",
        body: "Try different return rates and durations. Equity-oriented plans often use long-term illustrative rates around 10–12%, while conservative mixes may use lower figures. Past performance is not a guarantee of future results.",
      },
    ],
  },
  {
    slug: "tools",
    title: "Tools",
    summary:
      "Calc Wealth tools help you estimate outcomes instantly. Start with the SIP Investment Calculator on the home page.",
    sections: [
      {
        heading: "SIP Investment Calculator",
        body: "Estimate future value for monthly SIP or lump-sum investments, including optional annual step-up. Results update as you type and use market-standard monthly compounding formulas.",
      },
      {
        heading: "How to use results",
        body: "Treat outputs as educational estimates. They exclude taxes, expense ratios, and exit loads. Review fund documents and consider speaking with a registered advisor for personalized decisions.",
      },
    ],
  },
  {
    slug: "advice",
    title: "Advice",
    summary:
      "Calc Wealth provides general educational information. It is not personalized investment advice or a solicitation to buy or sell securities.",
    sections: [
      {
        heading: "Educational guidance only",
        body: "Articles and calculators on this site explain concepts such as compounding, SIP step-ups, and inflation-adjusted value. They do not assess your risk profile, tax situation, or suitability for any product.",
      },
      {
        heading: "When to seek professional help",
        body: "If you need portfolio construction, tax planning, or product selection, consult a SEBI-registered advisor or your financial institution. Use Calc Wealth to prepare questions and scenarios before that conversation.",
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    summary:
      "Reach the Calc Wealth team for product feedback, calculator questions, or general inquiries about this educational site.",
    sections: [
      {
        heading: "How to contact us",
        body: "For feedback on the SIP calculator or content suggestions, email support@calcwealth.example with a short description of your request. We aim to respond within a few business days.",
      },
      {
        heading: "What we can help with",
        body: "We can clarify how calculator assumptions work, fix reported bugs, and improve explainers. We cannot provide personalized portfolio recommendations or execute investments.",
      },
    ],
  },
  {
    slug: "mutual-funds",
    title: "Mutual Funds",
    summary:
      "Mutual funds pool money from many investors and invest across securities according to a stated objective, managed by a professional fund house.",
    sections: [
      {
        heading: "Core idea",
        body: "Instead of buying individual stocks or bonds yourself, you buy units of a fund. Returns depend on the underlying portfolio and market conditions, minus fees such as expense ratios.",
      },
      {
        heading: "SIP vs lump sum",
        body: "You can invest in mutual funds through a monthly SIP or a one-time lump sum. SIPs help average purchase cost over time; lump sums invest capital immediately.",
      },
    ],
  },
  {
    slug: "sip-plans",
    title: "SIP Plans",
    summary:
      "A Systematic Investment Plan (SIP) invests a fixed amount at regular intervals—usually monthly—into a chosen mutual fund scheme.",
    sections: [
      {
        heading: "How SIPs work",
        body: "On each installment date, the fund house allocates units based on that day’s NAV. Over many months, you accumulate units at different prices, which can smooth timing risk.",
      },
      {
        heading: "Step-up SIPs",
        body: "Many investors raise their SIP amount each year as income grows. Our calculator lets you model an annual step-up percentage to see how that can change long-term corpus estimates.",
      },
    ],
  },
  {
    slug: "lump-sum",
    title: "Lump Sum Investing",
    summary:
      "Lump-sum investing places a larger amount into the market at once, then lets compounding work over your chosen horizon.",
    sections: [
      {
        heading: "When people use lump sum",
        body: "Bonus payouts, matured deposits, or existing savings are common lump-sum sources. The trade-off is higher sensitivity to the entry point versus spreading purchases via SIP.",
      },
      {
        heading: "How we estimate",
        body: "Calc Wealth models lump-sum growth with monthly compounding at your expected annual return—the same convention used by many mutual fund calculators.",
      },
    ],
  },
  {
    slug: "retirement",
    title: "Retirement Planning",
    summary:
      "Retirement planning links today’s savings rate to a future corpus you may need when earned income stops or reduces.",
    sections: [
      {
        heading: "Start with the horizon",
        body: "Estimate years until retirement and years in retirement. Longer horizons usually support higher equity allocations in educational scenarios, while near-term goals often need more conservative assumptions.",
      },
      {
        heading: "Use the calculator as a sketch",
        body: "Run SIP scenarios for your working years, then adjust return and inflation assumptions. Replace illustrative rates with numbers that match your risk comfort and product mix.",
      },
    ],
  },
  {
    slug: "help-center",
    title: "Help Center",
    summary:
      "Quick answers for using the Calc Wealth SIP calculator and understanding the estimates it shows.",
    sections: [
      {
        heading: "Using the calculator",
        body: "Choose SIP or Lump Sum, enter amount, expected annual return, and duration. Optionally enable annual step-up for SIP. Results update live on the right-hand panel.",
      },
      {
        heading: "Understanding the numbers",
        body: "Total invested is contributions paid in. Estimated returns are the difference between projected value and invested amount. Inflation-adjusted value shows purchasing power using a 6% illustrative inflation rate.",
      },
    ],
  },
  {
    slug: "faqs",
    title: "FAQs",
    summary:
      "Frequently asked questions about Calc Wealth calculators and the assumptions behind the estimates.",
    sections: [
      {
        heading: "Are these returns guaranteed?",
        body: "No. Figures are illustrative only. Markets can rise or fall, and actual fund returns differ from the rate you enter.",
      },
      {
        heading: "Do results include taxes and fees?",
        body: "No. Estimates exclude capital gains tax, expense ratios, exit loads, and other charges. Always review scheme documents for real costs.",
      },
      {
        heading: "Which return rate should I use?",
        body: "Use presets as starting points: Equity 12%, Hybrid 10%, Debt 7%, Conservative 8%. Adjust based on your asset mix and time horizon.",
      },
    ],
  },
  {
    slug: "about",
    title: "About Calc Wealth",
    summary:
      "Calc Wealth is an educational investment calculator brand focused on clear SIP and lump-sum projections.",
    sections: [
      {
        heading: "Our purpose",
        body: "We help people visualize how regular investing and compounding can grow wealth over time—without requiring an account or pushing a specific fund product.",
      },
      {
        heading: "What we are not",
        body: "Calc Wealth is not a broker, AMC, bank, or registered investment advisor. Content is for learning and scenario planning only.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    summary:
      "Calc Wealth’s SIP calculator runs in your browser. We designed the tool to work without collecting investment inputs on our servers.",
    sections: [
      {
        heading: "Calculator data",
        body: "Amounts, return rates, and durations you enter are processed locally in your browser for estimates. Do not enter sensitive personal financial account credentials anywhere on this site.",
      },
      {
        heading: "Hosting and analytics",
        body: "Like most websites, hosting providers may log basic technical data such as IP address and request time for security and reliability. We do not sell personal information.",
      },
    ],
  },
  {
    slug: "security",
    title: "Security",
    summary:
      "We follow practical web security practices for an educational calculator site served over HTTPS.",
    sections: [
      {
        heading: "Transport security",
        body: "Access the site using HTTPS so traffic between your browser and the host is encrypted in transit.",
      },
      {
        heading: "Your responsibility",
        body: "Keep your devices updated and avoid sharing screenshots that contain personal account numbers. Calc Wealth never asks for banking passwords or OTPs.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary:
      "By using Calc Wealth, you agree to use the site for personal, educational purposes and to understand the limits of illustrative estimates.",
    sections: [
      {
        heading: "Acceptable use",
        body: "You may use the calculators and articles to learn and plan. You may not misuse the site, attempt unauthorized access, or scrape content in ways that disrupt service.",
      },
      {
        heading: "No warranty",
        body: "Content and estimates are provided as-is without warranty of accuracy or fitness for a particular investment decision. You remain responsible for actions you take with your money.",
      },
    ],
  },
  {
    slug: "disclosures",
    title: "Disclosures",
    summary:
      "Important disclosures about educational content, illustrative returns, and the absence of personalized recommendations.",
    sections: [
      {
        heading: "Not investment advice",
        body: "Nothing on Calc Wealth constitutes investment, tax, or legal advice. Calculators do not recommend specific schemes, AMCs, or asset allocations for your situation.",
      },
      {
        heading: "Illustrative returns",
        body: "Expected return inputs are user-selected assumptions. Market standard presets are educational defaults only and are not forecasts.",
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    summary:
      "We aim to keep Calc Wealth usable with clear labels, keyboard-friendly controls, and readable contrast.",
    sections: [
      {
        heading: "Current support",
        body: "Forms use visible labels, required fields are marked, and primary actions are reachable by keyboard. We continue improving structure and contrast for readability.",
      },
      {
        heading: "Feedback",
        body: "If you face a barrier using the calculator, contact us via the Contact page with your browser and a short description so we can improve.",
      },
    ],
  },
];

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((page) => page.slug === slug);
}

export function getAllInfoSlugs(): string[] {
  return infoPages.map((page) => page.slug);
}
