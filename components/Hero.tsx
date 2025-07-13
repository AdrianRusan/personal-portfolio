import Link from 'next/link'
import { GridBackground } from './ui/GridBackground'
import MagicButton from './ui/MagicButton'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { FaLocationArrow } from 'react-icons/fa6'
import SpotlightBackground from './ui/SpotlightBackground'


const Hero = () => {
  return (
    <section className='h-[100vh]' id="home" aria-labelledby="hero-heading">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className='h-full flex justify-center items-center relative z-10'>
        <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex justify-center items-center flex-col'>
          <p className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-80'>Dynamic Web Magic with Next.js</p>

          <h1 id="hero-heading" className="sr-only">Adrian Rusan - Full-Stack Engineer Portfolio</h1>
          
          <TextGenerateEffect
            className='text-center text-[40px] md:text-5xl lg:text-6xl'
            words='Transforming Concepts into Seamless User Experiences'
          />

          <p className='text-center tracking-wider mb-4 text-sm md:text-lg lg:text-2xl'>
            Hi, I&apos;m <strong>Adrian Rusan</strong>, a <strong>Full-Stack Engineer</strong> based in <strong>Romania</strong> with <strong>8 years of experience</strong> in modern web development.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href='https://utfs.io/a/23x7w9tiht/7iidzn1TwzukCxvpcPXoxIjwOYaTyPZtGk0mVdeKgr9LH8hD' target='_blank' rel="noopener noreferrer" aria-label="Download Adrian Rusan's Resume (opens in new tab)">
              <MagicButton
                title="See my Resume"
                icon={<FaLocationArrow />}
                position='right'
              />
            </Link>
            
            <Link href='https://calendly.com/adrian-rusan/30min' target='_blank' rel="noopener noreferrer" aria-label="Schedule a consultation with Adrian Rusan (opens in new tab)">
              <MagicButton
                title="Book Consultation"
                icon={<FaLocationArrow />}
                position='right'
                otherClasses="bg-transparent border border-purple hover:bg-purple/10"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero