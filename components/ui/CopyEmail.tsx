'use client'

import { useState, useCallback, useEffect } from "react";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('rusan.adrian.ionut@gmail.com');
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, []);

  return (
    <div className="mt-5 relative">
      <div className="absolute -bottom-5 right-0 -z-10">
        {copied && mounted && (
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Simple confetti animation with CSS */}
            <div className="absolute inset-0 animate-ping">
              <div className="w-2 h-2 bg-yellow-400 rounded absolute top-2 left-4 animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded absolute top-4 right-3 animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-green-400 rounded absolute bottom-3 left-2 animate-bounce delay-200"></div>
              <div className="w-2 h-2 bg-red-400 rounded absolute bottom-2 right-4 animate-bounce delay-300"></div>
              <div className="w-2 h-2 bg-purple-400 rounded absolute top-6 left-6 animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-pink-400 rounded absolute bottom-5 right-1 animate-bounce delay-250"></div>
            </div>
            <div className="relative z-10 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              ✓
            </div>
          </div>
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