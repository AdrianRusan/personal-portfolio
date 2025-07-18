
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'

const About = () => {
  return (
    <>
      <h2 id="about-heading" className="heading">
        About <span className="text-purple">Me</span>
      </h2>
      <BentoGrid className='w-full py-20'>
        {gridItems.map(({
          id, title, description, className, imgClassName, titleClassName, img, spareImg
        }) => (
          <BentoGridItem
            id={id}
            key={id}
            title={title}
            description={description}
            className={className}
            img={img}
            imgClassName={imgClassName}
            titleClassName={titleClassName}
            spareImg={spareImg}
          />
        ))}
      </BentoGrid>
    </>
  )
}

export default About