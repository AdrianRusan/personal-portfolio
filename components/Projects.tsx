import { projects } from '@/data'
import React from 'react'
import { PinContainer } from './ui/PinContainer'
import Image from 'next/image'
import { FaLocationArrow } from 'react-icons/fa6'
import Link from 'next/link'
import { Button } from './ui/button'

const Projects = () => {
  return (
    <section id="projects" className='py-20'>
      <h2 className='heading'>
        A small selection of {' '}
        <span className='text-purple'>recent projects</span>
      </h2>
      <div className='flex justify-center items-center flex-wrap p-4 gap-x-24 gap-y-8 mt-10'>
        {projects.map(({
          id, title, description, img, iconLists, github, link
        }) => (
          <div key={id} className='sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex justify-center items-center sm:w-[570px] w-[80vw]'>
            <PinContainer
              title={link}
            >
              <div className='relative flex justify-center items-center sm:w-[570px] sm:h-[40vh] w-[80vw] overflow-hidden h-[30vh] mb-10'>
                <div className='relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]'>
                  <Image
                    src='https://utfs.io/f/fce06cff-c4c2-4fa4-bd2c-4076b5b55c1a-2f9.png'
                    alt='bg-img'
                    width={100}
                    height={100}
                    className='bg-cover w-full h-full'
                  />
                </div>
                <Image
                  src={img}
                  alt={title}
                  width={1000}
                  height={1000}
                  className='z-10 absolute bottom-0 object-cover w-full h-full lg:rounded-3xl'
                />
              </div>
              <div className='flex flex-col items-center justify-center w-full h-full text-center px-10'>
                <h3 className='font-bold lg:text-2xl md:text-xl text-base line-clamp-1'>
                  {title}
                </h3>
                <p className='lg:text-xl lg:font-normal font-light text-sm line-clamp-2'>
                  {description} asdasd
                </p>
                <div className='flex justify-between items-center mt-7 mb-3'>
                  <div className='flex items-center'>
                    {iconLists.map((icon, index) => (
                      <div
                        key={icon}
                        className='border border-white/[0.2] rounded-full bg-black-100 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
                        style={{
                          transform: `translateX(-${10 * index} px)`
                        }}
                      >
                        <Image
                          src={icon}
                          alt={icon}
                          width={0}
                          height={0}
                          className='p-1 w-5/6 h-5/6 object-cover'
                        />
                      </div>
                    ))}
                  </div>

                  <div className='flex justify-center items-center'>
                    <Link
                      href={github}
                      target="_blank"
                    >
                      <Button className='flex lg:text-xl md:text-xs text-sm text-purple bg-transparent hover:bg-transparent transition hover:scale-110'>
                        Check Github
                      </Button>
                    </Link>
                    <Link
                      href={link}
                      target="_blank"
                    >
                      <Button className='flex lg:text-xl md:text-xs text-sm text-purple bg-transparent hover:bg-transparent transition hover:scale-110'>
                        Check Live Site
                        <FaLocationArrow className="ms-3" color="#CBACF9" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </PinContainer>
          </div>
        ))
        }
      </div >
    </section >
  )
}

export default Projects