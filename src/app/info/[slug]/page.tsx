import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllInfoSlugs, getInfoPage } from "@/lib/pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllInfoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) return { title: "Page not found | Calc Wealth" };
  return {
    title: `${page.title} | Calc Wealth`,
    description: page.summary,
  };
}

export default async function InfoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) notFound();

  return (
    <>
      <div className="bg-[var(--brand-red)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3.5">
            <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              {page.title}
            </h1>
            <nav
              className="hidden sm:flex items-center gap-2 text-xs text-white/85"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white font-medium">{page.title}</span>
            </nav>
          </div>
        </div>
      </div>

      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
            {page.summary}
          </p>

          <div className="mt-10 space-y-8">
            {page.sections.map((section) => (
              <section
                key={section.heading}
                className="border-t border-[var(--border)] pt-6"
              >
                <h2 className="text-lg font-semibold text-[var(--ink)]">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-blue-mid)] transition-colors"
            >
              Open SIP Calculator
            </Link>
            <Link
              href="/info/help-center"
              className="inline-flex items-center justify-center border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
