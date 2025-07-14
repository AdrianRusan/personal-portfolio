"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, Heart, Star, ThumbsUp } from "lucide-react";
import toast from "react-hot-toast";

// Enhanced button with micro-interactions
export const InteractiveButton = ({
  children,
  onClick,
  variant = "default",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  [key: string]: any;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    default: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    primary: "bg-purple hover:bg-purple/90 text-white border border-purple",
    secondary: "bg-transparent hover:bg-white/10 text-white border border-white/30",
    ghost: "bg-transparent hover:bg-white/5 text-white border-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-black-100",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        isPressed && "brightness-90",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Copy to clipboard with feedback
export const CopyButton = ({
  text,
  children,
  className = "",
  showToast = true,
}: {
  text: string;
  children?: ReactNode;
  className?: string;
  showToast?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      if (showToast) {
        toast.success("Copied to clipboard!", {
          icon: "📋",
          duration: 2000,
        });
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      if (showToast) {
        toast.error("Failed to copy");
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
        "bg-white/10 hover:bg-white/20 text-white border border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-black-100",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="copied"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Check className="w-4 h-4 text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Copy className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
      <span>{children || (copied ? "Copied!" : "Copy")}</span>
    </motion.button>
  );
};

// Like/favorite button with animation
export const LikeButton = ({
  liked = false,
  onToggle,
  count = 0,
  className = "",
}: {
  liked?: boolean;
  onToggle?: (liked: boolean) => void;
  count?: number;
  className?: string;
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [currentCount, setCurrentCount] = useState(count);

  const handleToggle = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setCurrentCount(prev => newLiked ? prev + 1 : prev - 1);
    onToggle?.(newLiked);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
        "bg-white/10 hover:bg-white/20 text-white border border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-black-100",
        isLiked && "bg-red-500/20 border-red-500/50 text-red-400",
        className
      )}
    >
      <motion.div
        animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
      </motion.div>
      <span>{currentCount}</span>
    </motion.button>
  );
};

// Rating component with hover effects
export const RatingStars = ({
  rating = 0,
  maxRating = 5,
  interactive = false,
  onRate,
  className = "",
}: {
  rating?: number;
  maxRating?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (newRating: number) => {
    if (interactive) {
      setCurrentRating(newRating);
      onRate?.(newRating);
    }
  };

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {Array.from({ length: maxRating }, (_, i) => {
        const starRating = i + 1;
        const isFilled = starRating <= (hoverRating || currentRating);
        
        return (
          <motion.button
            key={i}
            whileHover={interactive ? { scale: 1.1 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => interactive && setHoverRating(starRating)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
            className={cn(
              "focus:outline-none",
              interactive && "cursor-pointer",
              !interactive && "cursor-default"
            )}
          >
            <Star
              className={cn(
                "w-5 h-5 transition-colors duration-200",
                isFilled ? "text-yellow-400 fill-current" : "text-gray-400"
              )}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

// Floating action button with ripple effect
export const FloatingActionButton = ({
  children,
  onClick,
  className = "",
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden rounded-full w-14 h-14 bg-purple hover:bg-purple/90 text-white shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-black-100",
        "flex items-center justify-center transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bg-white/30 rounded-full w-4 h-4 pointer-events-none"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
          }}
        />
      ))}
    </motion.button>
  );
};

// Pulse animation for notifications
export const PulseIndicator = ({
  children,
  active = false,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("relative", className)}>
      {children}
      {active && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        />
      )}
    </div>
  );
}; 