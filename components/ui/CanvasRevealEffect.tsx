"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  /**
   * 0.1 - slower
   * 1.0 - faster
   */
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-full relative bg-white w-full", containerClassName)}>
        <div className="h-full w-full bg-gradient-to-t from-gray-950 to-[84%]" />
        {showGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
        )}
      </div>
    );
  }

  // Convert RGB arrays to CSS color strings
  const primaryColor = colors[0] ? `rgb(${colors[0].join(',')})` : 'rgb(0, 255, 255)';
  const secondaryColor = colors[1] ? `rgb(${colors[1].join(',')})` : primaryColor;
  
  // Create CSS custom properties for animation
  const animationDuration = 2 / animationSpeed;
  const dotSizeValue = dotSize || 3;

  return (
    <>
      <style jsx global>{`
        @keyframes canvasRevealDotFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes canvasRevealFloat0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-5px); }
        }
        
        @keyframes canvasRevealFloat1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(10px) translateX(-10px); }
          66% { transform: translateY(-20px) translateX(15px); }
        }
        
        @keyframes canvasRevealFloat2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(8px); }
        }
        
        @keyframes canvasRevealShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      <div className={cn("h-full relative w-full overflow-hidden", containerClassName)}>
        {/* Animated dots background */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, ${primaryColor} 2px, transparent 2px),
              radial-gradient(circle at 80% 50%, ${secondaryColor} 1px, transparent 1px),
              radial-gradient(circle at 40% 20%, ${primaryColor} 1px, transparent 1px),
              radial-gradient(circle at 60% 80%, ${secondaryColor} 2px, transparent 2px),
              radial-gradient(circle at 90% 10%, ${primaryColor} 1px, transparent 1px),
              radial-gradient(circle at 10% 90%, ${secondaryColor} 1px, transparent 1px)
            `,
            backgroundSize: `${dotSizeValue * 20}px ${dotSizeValue * 20}px, ${dotSizeValue * 30}px ${dotSizeValue * 30}px, ${dotSizeValue * 25}px ${dotSizeValue * 25}px, ${dotSizeValue * 35}px ${dotSizeValue * 35}px, ${dotSizeValue * 40}px ${dotSizeValue * 40}px, ${dotSizeValue * 45}px ${dotSizeValue * 45}px`,
            animation: `canvasRevealDotFloat ${animationDuration}s ease-in-out infinite`,
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                backgroundColor: i % 2 === 0 ? primaryColor : secondaryColor,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `canvasRevealFloat${i % 3} ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${primaryColor}20 50%, transparent 70%)`,
            animation: `canvasRevealShimmer ${animationDuration}s ease-in-out infinite`,
          }}
        />

        {showGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
        )}
      </div>
    </>
  );
};

export default CanvasRevealEffect;