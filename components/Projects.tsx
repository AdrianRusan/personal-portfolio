import { projects } from '@/data'

import React from 'react';
import { PinContainer } from './ui/PinContainer'
import Image from 'next/image'
import { FaLocationArrow, FaGithub } from 'react-icons/fa6'
import Link from 'next/link'
import { Button } from './ui/button'

const Projects = () => {
  return (
    <>
      <h2 id="projects-heading" className='heading'>
        Recent <span className='text-purple'>Projects</span>
      </h2>
      <div className='flex justify-center items-center flex-wrap p-4 gap-x-24 gap-y-8 mt-10'>
        {projects.map(({
          id, title, description, img, alt, iconLists, iconListsAlt, github, link
        }) => (
          <article key={id} className='sm:h-[41rem] h-[35rem] lg:min-h-[32.5rem] flex justify-center items-center sm:w-[570px] w-[85vw]' aria-labelledby={`project-title-${id}`}>
            <PinContainer
              title={link}
            >
              <div className='relative flex justify-center items-center sm:w-[570px] sm:h-[40vh] w-[85vw] overflow-hidden h-[30vh] mb-10'>
                <div className='relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]'>
                  <Image
                    src='https://utfs.io/a/23x7w9tiht/fce06cff-c4c2-4fa4-bd2c-4076b5b55c1a-2f9.png'
                    alt='Background pattern'
                    width={100}
                    height={100}
                    className='bg-cover w-full h-full'
                    title='Background pattern'
                    priority={false}
                  />
                </div>
                <Image
                  src={img}
                  alt={alt}
                  width={1000}
                  height={1000}
                  className='z-10 absolute bottom-0 object-cover w-full h-full lg:rounded-3xl'
                  title={alt}
                  priority={id <= 2} // Priority loading for first 2 projects
                />
              </div>
              <div className='flex flex-col items-center justify-center w-[90%] h-full text-center px-6 sm:px-10 gap-3'>
                <h3 id={`project-title-${id}`} className='font-bold lg:text-xl md:text-lg text-base line-clamp-1 w-full'>
                  {title}
                </h3>
                <p className='lg:text-lg lg:font-normal font-light text-sm line-clamp-3 text-center'>
                  {description}
                </p>
                
                {/* Technology Stack */}
                <div className='flex items-center justify-center mb-4' role="list" aria-label="Technologies used">
                  {iconLists.map((icon, index) => (
                    <div
                      key={icon}
                      className='border border-white/[0.2] rounded-full bg-black-100 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
                      style={{
                        transform: `translateX(-${8 * index}px)`
                      }}
                      role="listitem"
                    >
                      <Image
                        src={icon}
                        alt={iconListsAlt?.[index] || `Technology icon ${index + 1}`}
                        width={0}
                        height={0}
                        className='p-1 w-5/6 h-5/6 object-cover'
                        title={iconListsAlt?.[index] || `Technology icon ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row justify-center items-center gap-3 w-full'>
                  {github && (
                    <Link
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${title} source code on GitHub (opens in new tab)`}
                      className='w-full sm:w-auto'
                    >
                      <Button className='flex justify-center items-center gap-2 w-full sm:w-auto px-4 py-2 text-sm lg:text-base text-purple bg-transparent hover:bg-purple/10 border border-purple/20 hover:border-purple/40 transition-all duration-200 hover:scale-105'>
                        <FaGithub className="w-4 h-4" />
                        View Code
                      </Button>
                    </Link>
                  )}
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${title} live website (opens in new tab)`}
                    className='w-full sm:w-auto'
                  >
                    <Button className='flex justify-center items-center gap-2 w-full sm:w-auto px-4 py-2 text-sm lg:text-base text-purple bg-transparent hover:bg-purple/10 border border-purple/20 hover:border-purple/40 transition-all duration-200 hover:scale-105'>
                      Live Demo
                      <FaLocationArrow className="w-3 h-3" color="#CBACF9" />
                    </Button>
                  </Link>
                </div>
              </div>
            </PinContainer>
          </article>
        ))
        }
      </div >
    </>
  )
}

export default Projects