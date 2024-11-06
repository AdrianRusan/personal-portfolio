import Link from 'next/link'
import { Ghost } from 'lucide-react'
import MagicButton from '@/components/ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa6'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - The Page You Are Looking For Does Not Exist | Adrian Rusan',
  description: 'The page you are looking for does not exist. Return to the homepage to explore Adrian Rusan’s portfolio.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <Ghost className="w-24 h-24 mb-8 text-primary animate-float" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Oops! It seems like you&apos;ve ventured into uncharted territory.
      </p>
      <Link href="/">
        <MagicButton
          title="Return to Home"
          icon={<FaLocationArrow />}
          position="right"
        />
      </Link>
    </div>
  )
}