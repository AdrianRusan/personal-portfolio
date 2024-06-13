'use client'

import { useState, useCallback } from "react";
import Lottie from "react-lottie";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";
import animationData from '@/data/confetti.json';

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('rusan.adrian.ionut@gmail.com');
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, []);

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="mt-5 relative">
      <div className="absolute -bottom-5 right-0 -z-10">
        {copied && (
          <Lottie options={lottieOptions} />
        )}
      </div>

      <MagicButton
        title={copied ? 'Email copied' : 'Copy my email'}
        icon={<IoCopyOutline />}
        position="left"
        otherClasses="bg-[#161a31]"
        handleClick={handleCopy}
      />
    </div>
  );
}

export default CopyEmail;