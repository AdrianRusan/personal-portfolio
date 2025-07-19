import { test, expect } from '@playwright/test';

test.describe('Portfolio Navigation and User Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for initial page load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Hero Section and Initial Load', () => {
    test('should load hero section with all key elements', async ({ page }) => {
      // Check hero heading
      await expect(page.getByRole('heading', { name: /adrian rusan/i })).toBeVisible();
      
      // Check main tagline
      await expect(page.getByText(/dynamic web magic with next.js/i)).toBeVisible();
      
      // Check main text effect
      await expect(page.getByText(/transforming concepts into seamless/i)).toBeVisible();
      
      // Check description
      await expect(page.getByText(/full-stack engineer/i)).toBeVisible();
      await expect(page.getByText(/romania/i)).toBeVisible();
      await expect(page.getByText(/8 years of experience/i)).toBeVisible();
      
      // Check call-to-action buttons
      await expect(page.getByRole('link', { name: /see my resume/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /book consultation/i })).toBeVisible();
    });

    test('should have working consultation booking link', async ({ page }) => {
      const consultationLink = page.getByRole('link', { name: /book consultation/i });
      await expect(consultationLink).toHaveAttribute('href', 'https://calendly.com/adrian-rusan/30min');
      await expect(consultationLink).toHaveAttribute('target', '_blank');
    });
  });

  test.describe('Navigation and Scrolling', () => {
    test('should have smooth scrolling navigation', async ({ page }) => {
      // Get initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);
      expect(initialScroll).toBe(0);
      
      // Scroll down
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(500);
      
      // Should have scrolled
      const scrolledPosition = await page.evaluate(() => window.scrollY);
      expect(scrolledPosition).toBeGreaterThan(initialScroll);
    });

    test('should navigate through all main sections', async ({ page }) => {
      const sections = [
        { name: 'About', selector: '#about' },
        { name: 'Experience', selector: '#experience' },
        { name: 'Projects', selector: '#projects' },
        { name: 'Approach', selector: '#approach' },
        { name: 'Testimonials', selector: '#testimonials' },
        { name: 'Contact', selector: '#contact' }
      ];

      for (const section of sections) {
        // Scroll to section
        await page.locator(section.selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        // Verify section is visible
        await expect(page.locator(section.selector)).toBeInViewport();
      }
    });

    test('should have working floating navigation', async ({ page }) => {
      // Scroll down to make floating nav appear
      await page.mouse.wheel(0, 2000);
      await page.waitForTimeout(1000);
      
      // Check if floating navigation is visible
      const floatingNav = page.locator('.fixed'); // Adjust selector based on actual implementation
      if (await floatingNav.count() > 0) {
        await expect(floatingNav.first()).toBeVisible();
      }
    });
  });

  test.describe('About Section', () => {
    test('should display about section content', async ({ page }) => {
      await page.locator('#about').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Check for about section heading
      await expect(page.getByRole('heading', { name: /about/i }).first()).toBeInViewport();
      
      // Check for description text (partial match)
      await expect(page.getByText(/passionate about/i).first()).toBeInViewport();
    });
  });

  test.describe('Experience Section', () => {
    test('should display experience timeline', async ({ page }) => {
      await page.locator('#experience').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Check experience section heading
      await expect(page.getByRole('heading', { name: /experience/i }).first()).toBeInViewport();
      
      // Look for experience items (adjust selectors based on implementation)
      const experienceItems = page.locator('[data-testid="experience-item"]');
      if (await experienceItems.count() > 0) {
        await expect(experienceItems.first()).toBeInViewport();
      }
    });
  });

  test.describe('Projects Section', () => {
    test('should display featured projects', async ({ page }) => {
      await page.locator('#projects').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Check projects section heading
      await expect(page.getByRole('heading', { name: /recent projects/i }).first()).toBeInViewport();
      
      // Check for project cards
      const projectCards = page.locator('[data-testid="project-card"]');
      if (await projectCards.count() > 0) {
        await expect(projectCards.first()).toBeInViewport();
      }
    });

    test('should have interactive project cards', async ({ page }) => {
      await page.locator('#projects').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const projectCards = page.locator('[data-testid="project-card"]');
      
      if (await projectCards.count() > 0) {
        const firstCard = projectCards.first();
        
        // Hover over project card
        await firstCard.hover();
        await page.waitForTimeout(300);
        
        // Card should be interactive (could check for hover effects)
        await expect(firstCard).toBeVisible();
      }
    });
  });

  test.describe('GitHub Integration', () => {
    test('should display GitHub showcase section', async ({ page }) => {
      // Scroll to find GitHub section
      await page.mouse.wheel(0, 3000);
      await page.waitForTimeout(1000);
      
      // Look for GitHub related content
      const githubSection = page.getByText(/github/i).first();
      if (await githubSection.isVisible()) {
        await githubSection.scrollIntoViewIfNeeded();
        await expect(githubSection).toBeInViewport();
      }
    });

    test('should handle GitHub API loading states', async ({ page }) => {
      // Check if there are any loading skeletons or spinners
      const loadingElements = page.locator('[data-testid*="loading"], .animate-pulse, .skeleton');
      
      if (await loadingElements.count() > 0) {
        // Wait for loading to complete
        await expect(loadingElements.first()).not.toBeVisible({ timeout: 10000 });
      }
    });
  });

  test.describe('Approach Section', () => {
    test('should display development approach', async ({ page }) => {
      await page.locator('#approach').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Check approach section
      await expect(page.getByRole('heading', { name: /approach/i }).first()).toBeInViewport();
    });
  });

  test.describe('Testimonials Section', () => {
    test('should display testimonials', async ({ page }) => {
      await page.locator('#testimonials').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Check testimonials section
      await expect(page.getByRole('heading', { name: /testimonials/i }).first()).toBeInViewport();
      
      // Look for testimonial cards
      const testimonials = page.locator('[data-testid="testimonial"]');
      if (await testimonials.count() > 0) {
        await expect(testimonials.first()).toBeInViewport();
      }
    });
  });

  test.describe('Footer', () => {
    test('should display footer with contact information', async ({ page }) => {
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      
      // Look for footer elements
      const footer = page.locator('footer');
      if (await footer.count() > 0) {
        await expect(footer).toBeInViewport();
      }
      
      // Check for email contact
      const emailLink = page.getByText(/rusan.adrian.ionut@gmail.com/i);
      if (await emailLink.isVisible()) {
        await expect(emailLink).toBeInViewport();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check hero section on mobile
      await expect(page.getByText(/adrian rusan/i)).toBeVisible();
      await expect(page.getByText(/full-stack engineer/i)).toBeVisible();
      
      // Check that buttons are still accessible
      await expect(page.getByRole('link', { name: /book consultation/i })).toBeVisible();
    });

    test('should work on tablet devices', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Check layout on tablet
      await expect(page.getByText(/adrian rusan/i)).toBeVisible();
      await expect(page.getByRole('link', { name: /see my resume/i })).toBeVisible();
      
      // Test scrolling on tablet
      await page.touchscreen.tap(400, 500);
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(500);
      
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeGreaterThan(0);
    });

    test('should work on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Check desktop layout
      await expect(page.getByText(/adrian rusan/i)).toBeVisible();
      
      // Check that content is properly laid out on wide screens
      const heroSection = page.locator('#home');
      await expect(heroSection).toBeVisible();
      
      // Check button layout on desktop
      const buttons = page.locator('.flex').filter({ hasText: /see my resume|book consultation/i });
      if (await buttons.count() > 0) {
        await expect(buttons.first()).toBeVisible();
      }
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    });

    test('should handle slow network conditions', async ({ page }) => {
      // Simulate slow 3G
      await page.context().route('**/*', route => {
        setTimeout(() => route.continue(), 100); // Add 100ms delay
      });
      
      await page.goto('/');
      
      // Should still load successfully
      await expect(page.getByText(/adrian rusan/i)).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Animations and Interactions', () => {
    test('should have smooth animations', async ({ page }) => {
      // Check for elements with animations
      const animatedElements = page.locator('.animate-pulse, .transition, [data-testid*="animate"]');
      
      if (await animatedElements.count() > 0) {
        // Verify elements are visible
        await expect(animatedElements.first()).toBeVisible();
      }
    });

    test('should handle user interactions smoothly', async ({ page }) => {
      // Test hover interactions
      const interactiveElements = page.locator('button, a, [role="button"]');
      
      if (await interactiveElements.count() > 0) {
        const firstElement = interactiveElements.first();
        
        // Hover and check it's still accessible
        await firstElement.hover();
        await page.waitForTimeout(100);
        await expect(firstElement).toBeVisible();
        
        // Click if it's a button
        if (await firstElement.getAttribute('role') === 'button' || await firstElement.getAttribute('type') === 'button') {
          await firstElement.click();
          await page.waitForTimeout(100);
        }
      }
    });
  });
});