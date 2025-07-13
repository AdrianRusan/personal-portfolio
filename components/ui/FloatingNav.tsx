"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "./PageTransition";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
    external?: boolean;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Transform values for scroll-triggered effects
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      
      // Update scroll state for styling
      setIsScrolled(current > 0.05);

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  // Enhanced smooth scrolling for internal links
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      scrollToSection(link, 120); // Use enhanced scroll function with offset
    }
    // Close mobile menu after clicking a link
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          style={{
            scale,
            opacity,
          }}
          className={cn(
            "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-4 md:top-6 lg:top-10 inset-x-0 mx-auto px-4 md:px-6 lg:px-10 py-3 md:py-4 lg:py-5 rounded-lg md:rounded-xl transition-all duration-300",
            // Enhanced backdrop blur and styling
            isScrolled 
              ? "backdrop-blur-xl bg-black-100/90 border border-white/[0.2] shadow-2xl" 
              : "backdrop-blur-md bg-black-100/80 border border-white/[0.1] shadow-lg",
            "items-center justify-center",
            className,
            'floating-nav'
          )}
        >
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={navItem.link}
                href={navItem.link}
                target={navItem.external ? "_blank" : undefined}
                rel={navItem.external ? "noopener noreferrer" : undefined}
                onClick={(e) => handleLinkClick(e, navItem.link)}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-all duration-200",
                  "px-2 md:px-3 py-1 md:py-2 rounded-md hover:bg-white/[0.1]",
                  navItem.external && "text-purple hover:text-purple/80"
                )}
              >
                <span className="text-xs md:text-sm !cursor-pointer font-medium">
                  {navItem.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation - Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button p-2 rounded-md hover:bg-white/[0.1] transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[4999] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="mobile-menu fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-black-100/95 backdrop-blur-xl border-l border-white/[0.2] z-[5001] md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/[0.1]">
                  <h2 className="text-lg font-semibold text-white">Navigation</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md hover:bg-white/[0.1] transition-colors duration-200"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-6 py-4">
                  <ul className="space-y-2">
                    {navItems.map((navItem: any, idx: number) => (
                      <li key={navItem.link}>
                        <Link
                          href={navItem.link}
                          target={navItem.external ? "_blank" : undefined}
                          rel={navItem.external ? "noopener noreferrer" : undefined}
                          onClick={(e) => handleLinkClick(e, navItem.link)}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                            "text-white hover:bg-white/[0.1] hover:text-purple",
                            "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-black-100",
                            navItem.external && "text-purple"
                          )}
                        >
                          {navItem.icon && (
                            <span className="text-lg">{navItem.icon}</span>
                          )}
                          <span className="text-base font-medium">{navItem.name}</span>
                          {navItem.external && (
                            <span className="ml-auto text-xs text-white/60">↗</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/[0.1]">
                  <p className="text-xs text-white/60 text-center">
                    © 2024 Adrian Rusan
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};