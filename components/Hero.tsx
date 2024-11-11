import Link from 'next/link'
import { GridBackground } from './ui/GridBackground'
import MagicButton from './ui/MagicButton'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { FaLocationArrow } from 'react-icons/fa6'
import SpotlightBackground from './ui/SpotlightBackground'


const Hero = () => {
  return (
    <section className='h-[100vh]' id="home">
      <SpotlightBackground />
      <div>
        <GridBackground />
      </div>

      <div className='h-full flex justify-center items-center relative z-10'>
        <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex justify-center items-center flex-col'>
          <p className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-80'>Dynamic Web Magic with Next.js</p>

          <TextGenerateEffect
            className='text-center text-[40px] md:text-5xl lg:text-6xl'
            words='Transforming Concepts into Seamless User Experiences'
          />

          <p className='text-center tracking-wider mb-4 text-sm md:text-lg lg:text-2xl'>
            Hi, I&apos;m Adrian, a Next.js Developer based in Romania.
          </p>

          <Link href='https://utfs.io/a/23x7w9tiht/7iidzn1TwzukCxvpcPXoxIjwOYaTyPZtGk0mVdeKgr9LH8hD' target='_blank'>
            <MagicButton
              title="See my Resume"
              icon={<FaLocationArrow />}
              position='right'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero