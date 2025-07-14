
import { testimonials } from '@/data'
import Image from 'next/image'

const Testimonials = () => {
  return (
    <section className="py-20 md:py-32 lg:py-40">
      <h2 id="testimonials-heading" className='heading mb-16 md:mb-20'>
        Kind words from
        <span className='text-purple'> satisfied clients</span>
      </h2>
      
      <div className='flex items-center justify-center flex-col max-lg:mt-10'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {testimonials.map((item, idx) => (
            <article
              key={idx}
              className="relative rounded-2xl border border-slate-800 p-5 md:p-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl"
            >
              <blockquote className="space-y-6">
                <p className="text-sm md:text-lg leading-relaxed text-white font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div className="flex flex-col">
                    <cite className="text-lg font-bold text-white not-italic">
                      {item.name}
                    </cite>
                    <span className="text-sm text-gray-300">
                      {item.title}
                    </span>
                  </div>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials