import { Metadata } from 'next'
import MagicButton from '@/components/ui/MagicButton'
import { PageShell } from '@/components/PageShell'
import { FaLocationArrow } from 'react-icons/fa6'
import Link from 'next/link'

// Absolute: the layout template would add the suffix twice (A1-21). Next
// already emits noindex for not-found, so no robots block here.
export const metadata: Metadata = {
  title: { absolute: 'Page not found | Adrian Rusan' },
  description: 'The page you are looking for does not exist.',
}

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Services', link: '/services' },
  { name: 'Work', link: '/work' },
  { name: 'Blog', link: '/blog' },
]

export default function NotFound() {
  return (
    <PageShell navItems={navItems}>
      <section className="flex flex-col items-center text-center px-5 pt-40 pb-24">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
          404
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-white-200 text-lg mb-4 max-w-md">
          The link may be old or mistyped. The homepage has everything else.
        </p>
        <MagicButton
          title="Back to the homepage"
          icon={<FaLocationArrow />}
          position="right"
          href="/"
        />
        <nav aria-label="Main pages" className="flex gap-6 mt-8 text-sm font-medium">
          {navItems.slice(1).map((item) => (
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
