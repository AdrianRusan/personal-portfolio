'use client'

import { Spotlight } from './Spotlight'
import { useTheme } from 'next-themes';

const SpotlightBackground = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div>
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill={isDarkMode ? 'white' : 'black'} />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill='purple' />
      <Spotlight className="top-28 left-96 h-[80vh] w-[50vw]" fill='blue' />
    </div>)
}

export default SpotlightBackground