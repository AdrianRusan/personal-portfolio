import React from 'react'
import { InfiniteMovingCards } from './ui/InfiniteMovingCards'
import { companies, testimonials } from '@/data'
import Image from 'next/image'

const Testimonials = () => {
  return (
    <section id="testimonials" className='py-20'>
      <h2 className='heading'>
        Kind words from
        <span className='text-purple'> satisfied clients</span>
      </h2>
      <div className='flex items-center flex-col max-lg:mt-10'>
        <InfiniteMovingCards
          items={testimonials}
          direction='right'
          speed='slow'
        />

        <div className='flex flex-wrap justify-center items-center gap-4 md:gap-16 max-lg:mt-10'>
          {companies.map(({
            id, img, name, nameImg
          }) => (
            <div key={id} className='flex md:max-w-60 max-w-32 gap-2 items-center'>
              <Image
                src={img}
                alt={name}
                className="h-full object-contain md:w-10 w-5"
                width={0}
                height={0}
              />
              <Image
                src={nameImg}
                alt={name}
                className="h-full object-contain md:w-24 w-20"
                width={0}
                height={0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials