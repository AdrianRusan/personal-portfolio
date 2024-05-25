'use client'

import { useState } from "react";
import Lottie from "react-lottie";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";

import animationData from '@/data/confetti.json'

type AnimationDataType = typeof animationData | null;

const CopyEmail = () => {
  const [copied, setCopied] = useState(false)
  const [currentAnimationData, setCurrentAnimationData] = useState<AnimationDataType>(animationData);


  const handleCopy = () => {
    navigator.clipboard.writeText('rusan.adrian.ionut@gmail.com');
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
      refreshAnimation();
    }, 5000);
  };

  const refreshAnimation = () => {
    setCurrentAnimationData(null);
    setTimeout(() => {
      setCurrentAnimationData(animationData);
    }, 100);
  };

  return (
    <div className="mt-5 relative">
      <div className="absolute -bottom-5 right-0">
        {currentAnimationData && (
          <Lottie
            options={{
              loop: copied,
              autoplay: copied,
              animationData: currentAnimationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
        )}
      </div>

      <MagicButton
        title={copied ? 'Email copied' : 'Copy my email'}
        icon={<IoCopyOutline />}
        position="left"
        otherClasses="bg-[#161a31]"
        handleClick={handleCopy}
      />
    </div>)
}

export default CopyEmail