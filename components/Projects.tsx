'use client'

import { projects } from '@/data'
import React, { useState } from 'react';
import { PinContainer } from './ui/PinContainer'
import Image from 'next/image'
import { FaLocationArrow, FaGithub, FaChevronDown, FaChevronUp, FaQuoteLeft } from 'react-icons/fa6'
import { FaCheckCircle } from 'react-icons/fa'
import Link from 'next/link'
import { Button } from './ui/button'

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <>
      <div className="text-center mb-16">
        <h2 id="projects-heading" className='heading mb-6'>
          Client Success <span className='text-purple'>Stories</span>
        </h2>
        <p className="text-white-200 text-lg max-w-3xl mx-auto">
          Real projects, real results. See how I&apos;ve helped businesses transform their operations,
          reduce costs, and achieve measurable growth through custom software solutions.
        </p>
      </div>

      <div className='flex justify-center items-start flex-wrap p-4 gap-x-8 gap-y-12 mt-10'>
        {projects.map((project) => {
          const isExpanded = expandedProject === project.id;
          
          return (
            <article 
              key={project.id} 
              className={`transition-all duration-500 ${
                isExpanded 
                  ? 'sm:w-[90vw] lg:w-[85vw] xl:w-[80vw]' 
                  : 'sm:w-[570px] w-[85vw]'
              }`}
              aria-labelledby={`project-title-${project.id}`}
            >
              <div className={`${
                isExpanded 
                  ? 'bg-black-100 rounded-3xl p-8 border border-white/[0.1]' 
                  : ''
              }`}>
                
                {/* Main Project Card */}
                <div className={`${
                  isExpanded ? 'mb-8' : 'sm:h-[41rem] h-[35rem] lg:min-h-[32.5rem]'
                } flex justify-center items-center`}>
                  <PinContainer title={project.link || ''}>
                    <div className='relative flex justify-center items-center sm:w-[570px] sm:h-[40vh] w-[85vw] overflow-hidden h-[30vh] mb-10'>
                      <div className='relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]'>
                        <Image
                          src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QnVpbGQgU29tZXRoaW5nPC90ZXh0Pjwvc3ZnPg=='
                          alt='Background pattern'
                          width={100}
                          height={100}
                          className='bg-cover w-full h-full'
                          title='Background pattern'
                          priority={false}
                        />
                      </div>
                      <Image
                        src={project.img}
                        alt={project.alt}
                        width={1000}
                        height={1000}
                        className='z-10 absolute bottom-0 object-cover w-full h-full lg:rounded-3xl'
                        title={project.alt}
                        priority={project.id <= 2}
                      />
                    </div>

                    <div className='flex flex-col items-center justify-center w-[90%] h-full text-center px-6 sm:px-10 gap-3'>
                      {/* Project Header */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-purple/20 text-purple text-xs rounded-full">
                          {project.category}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-white-200 text-xs rounded-full">
                          {project.timeline}
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          {project.budget}
                        </span>
                      </div>

                      <h3 id={`project-title-${project.id}`} className='font-bold lg:text-xl md:text-lg text-base line-clamp-2 w-full mb-2'>
                        {project.title}
                      </h3>
                      
                      <p className='lg:text-lg lg:font-normal font-light text-sm line-clamp-3 text-center mb-4'>
                        {project.description}
                      </p>

                      {/* Key Result Highlight */}
                      <div className="bg-gradient-to-r from-purple/20 to-blue-500/20 rounded-lg p-4 mb-4 w-full">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <FaCheckCircle className="text-green-400 w-4 h-4" />
                          <span className="text-green-400 font-semibold text-sm">KEY RESULT</span>
                        </div>
                        <p className="text-white font-bold text-lg">
                          {project.results.primary}
                        </p>
                      </div>
                      
                      {/* Technology Stack */}
                      <div className='flex items-center justify-center mb-4' role="list" aria-label="Technologies used">
                        {project.iconLists.map((icon, index) => (
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
                              alt={project.iconListsAlt?.[index] || `Technology icon ${index + 1}`}
                              width={0}
                              height={0}
                              className='p-1 w-5/6 h-5/6 object-cover'
                              title={project.iconListsAlt?.[index] || `Technology icon ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className='flex flex-col sm:flex-row justify-center items-center gap-3 w-full mb-4'>
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                            className='w-full sm:w-auto'
                          >
                            <Button className='flex justify-center items-center gap-2 w-full sm:w-auto px-4 py-2 text-sm lg:text-base text-purple bg-transparent hover:bg-purple/10 border border-purple/20 hover:border-purple/40 transition-all duration-200 hover:scale-105'>
                              <FaGithub className="w-4 h-4" />
                              View Code
                            </Button>
                          </Link>
                        )}
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${project.title} live website (opens in new tab)`}
                            className='w-full sm:w-auto'
                          >
                            <Button className='flex justify-center items-center gap-2 w-full sm:w-auto px-4 py-2 text-sm lg:text-base text-purple bg-transparent hover:bg-purple/10 border border-purple/20 hover:border-purple/40 transition-all duration-200 hover:scale-105'>
                              Live Demo
                              <FaLocationArrow className="w-3 h-3" color="#CBACF9" />
                            </Button>
                          </Link>
                        )}
                      </div>

                      {/* Expand/Collapse Button */}
                      <Button
                        onClick={() => toggleProject(project.id)}
                        className="flex items-center gap-2 text-white-200 hover:text-white bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 transition-all duration-200"
                        aria-expanded={isExpanded}
                        aria-controls={`project-details-${project.id}`}
                      >
                        {isExpanded ? 'Hide Details' : 'View Full Case Study'}
                        {isExpanded ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                      </Button>
                    </div>
                  </PinContainer>
                </div>

                {/* Expanded Case Study Details */}
                {isExpanded && (
                  <div 
                    id={`project-details-${project.id}`}
                    className="animate-in slide-in-from-top duration-500"
                  >
                    <div className="grid lg:grid-cols-2 gap-8">
                      
                      {/* Challenge & Solution */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            🎯 The Challenge
                          </h4>
                          <p className="text-white-200 leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            💡 The Solution
                          </h4>
                          <p className="text-white-200 leading-relaxed">
                            {project.solution}
                          </p>
                        </div>

                        {/* Technical Highlights */}
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            ⚡ Technical Highlights
                          </h4>
                          <ul className="space-y-2">
                            {project.technicalHighlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2 text-white-200">
                                <FaCheckCircle className="text-green-400 w-4 h-4 mt-1 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Results & Testimonial */}
                      <div className="space-y-6">
                        
                        {/* Results */}
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            📈 Measurable Results
                          </h4>
                          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 mb-4">
                            <p className="text-green-400 font-bold text-lg mb-2">
                              {project.results.primary}
                            </p>
                          </div>
                          <ul className="space-y-2">
                            {project.results.secondary.map((result, index) => (
                              <li key={index} className="flex items-start gap-2 text-white-200">
                                <FaCheckCircle className="text-green-400 w-4 h-4 mt-1 flex-shrink-0" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Client Testimonial */}
                        <div className="bg-gradient-to-r from-purple/10 to-blue-500/10 rounded-lg p-6 border border-white/10">
                          <div className="flex items-start gap-3">
                            <FaQuoteLeft className="text-purple w-6 h-6 flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-white-200 italic mb-4 leading-relaxed">
                                &ldquo;{project.clientTestimonial.quote}&rdquo;
                              </p>
                              <div className="border-t border-white/10 pt-4">
                                <p className="text-white font-semibold">
                                  {project.clientTestimonial.author}
                                </p>
                                <p className="text-purple text-sm">
                                  {project.clientTestimonial.role}
                                </p>
                                <p className="text-white-200 text-sm">
                                  {project.clientTestimonial.company}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-black-200 rounded-lg p-4">
                            <h5 className="text-white font-semibold mb-2">Industry</h5>
                            <p className="text-white-200 text-sm">{project.industry}</p>
                          </div>
                          <div className="bg-black-200 rounded-lg p-4">
                            <h5 className="text-white font-semibold mb-2">Project Type</h5>
                            <p className="text-white-200 text-sm">{project.projectType}</p>
                          </div>
                        </div>

                        {/* CTA for Similar Project */}
                        <div className="bg-gradient-to-r from-purple/20 to-blue-500/20 rounded-lg p-6 text-center border border-purple/20">
                          <h5 className="text-white font-bold mb-2">Need a Similar Solution?</h5>
                          <p className="text-white-200 text-sm mb-4">
                            Let&apos;s discuss how I can help transform your business with a custom solution.
                          </p>
                          <Link href="#contact">
                            <Button className="bg-purple hover:bg-purple/80 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105">
                              Start Your Project
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Portfolio CTA Section */}
      <div className="text-center mt-16 bg-gradient-to-r from-purple/10 to-blue-500/10 rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Create Your Success Story?
        </h3>
        <p className="text-white-200 mb-6 max-w-2xl mx-auto">
          These results speak for themselves. Let&apos;s discuss how I can help you achieve
          similar transformational outcomes for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="https://calendly.com/adrian-rusan?hide_gdpr_banner=1" target="_blank">
            <Button className="bg-purple hover:bg-purple/80 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2">
              Book Free Consultation
              <FaLocationArrow className="w-3 h-3" />
            </Button>
          </Link>
          <Link href="#contact">
            <Button className="border border-purple text-purple hover:bg-purple/10 px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105">
              Get Project Quote
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Projects