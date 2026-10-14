import { Metadata } from 'next'
import PrimaryCta from '@/components/ui/PrimaryCta'
import { PageShell } from '@/components/PageShell'
import Link from 'next/link'
import { primaryNav } from '@/data/nav'

// Absolute: the layout template would add the suffix twice (A1-21). Next
// already emits noindex for not-found, so no robots block here.
export const metadata: Metadata = {
  title: { absolute: 'Page not found | Adrian Rusan' },
  description: 'The page you are looking for does not exist.',
}


export default function NotFound() {
  return (
    <PageShell hideEmailCapture>
      <section className="container-wide box-content flex flex-col items-start page-head pb-12">
        <p className="eyebrow">
          <span className="num">404</span> · Page not found
        </p>
        <h1 className="type-title mt-5 mb-6 text-balance">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-white-200 text-lg mb-8 max-w-md text-pretty">
          The link may be old or mistyped. The homepage has everything else.
        </p>
        <PrimaryCta
          title="Back to the homepage"
          href="/"
        />
        <nav aria-label="Main pages" className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm font-medium">
          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="text-blue-100 underline underline-offset-4 hover:text-purple transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </section>
    </PageShell>
  )
}
