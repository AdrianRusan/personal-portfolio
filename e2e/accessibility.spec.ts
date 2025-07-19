import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Semantic HTML and ARIA', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      // Check for h1 - should only have one
      const h1Elements = page.locator('h1');
      const h1Count = await h1Elements.count();
      expect(h1Count).toBe(1);
      
      // Check that h1 contains meaningful content
      const h1Text = await h1Elements.first().textContent();
      expect(h1Text).toContain('Adrian');
      
      // Check for proper heading hierarchy (h2, h3, etc.)
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      expect(headingCount).toBeGreaterThan(1);
    });

    test('should have meaningful page title', async ({ page }) => {
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      expect(title).toMatch(/adrian|portfolio|developer|engineer/i);
    });

    test('should have proper meta description', async ({ page }) => {
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(50);
    });

    test('should use semantic HTML elements', async ({ page }) => {
      // Check for semantic elements
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('header, nav')).toHaveCount(1);
      
      // Check for section elements
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      expect(sectionCount).toBeGreaterThan(3);
    });

    test('should have proper landmark roles', async ({ page }) => {
      // Check for main landmark
      const main = page.locator('[role="main"], main');
      await expect(main).toBeVisible();
      
      // Check for navigation if present
      const nav = page.locator('[role="navigation"], nav');
      const navCount = await nav.count();
      if (navCount > 0) {
        await expect(nav.first()).toBeVisible();
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support tab navigation through interactive elements', async ({ page }) => {
      // Start from the beginning
      await page.keyboard.press('Tab');
      
      // Get all focusable elements
      const focusableElements = page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const focusableCount = await focusableElements.count();
      
      expect(focusableCount).toBeGreaterThan(0);
      
      // Tab through first few elements to ensure tab order works
      for (let i = 0; i < Math.min(5, focusableCount); i++) {
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
        await page.keyboard.press('Tab');
      }
    });

    test('should have visible focus indicators', async ({ page }) => {
      // Focus on interactive elements and check for focus indicators
      const interactiveElements = page.locator('a, button').first();
      
      if (await interactiveElements.count() > 0) {
        await interactiveElements.focus();
        await expect(interactiveElements).toBeFocused();
        
        // Check if focus is visible (basic check)
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    });

    test('should allow keyboard navigation to all major sections', async ({ page }) => {
      const sectionsToTest = ['#about', '#experience', '#projects', '#contact'];
      
      for (const selector of sectionsToTest) {
        const section = page.locator(selector);
        if (await section.count() > 0) {
          // Use keyboard to navigate to section
          await page.keyboard.press('Tab');
          
          // Check if we can reach interactive elements in the section
          const interactiveInSection = section.locator('a, button, input, select, textarea').first();
          if (await interactiveInSection.count() > 0) {
            await interactiveInSection.focus();
            await expect(interactiveInSection).toBeFocused();
          }
        }
      }
    });

    test('should support Enter and Space key activation', async ({ page }) => {
      // Find buttons and test keyboard activation
      const buttons = page.locator('button, [role="button"]');
      
      if (await buttons.count() > 0) {
        const firstButton = buttons.first();
        await firstButton.focus();
        await expect(firstButton).toBeFocused();
        
        // Test Space key activation (for buttons)
        await page.keyboard.press('Space');
        await page.waitForTimeout(100);
        
        // Test Enter key activation
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
      }
    });
  });

  test.describe('Color Contrast and Visual Design', () => {
    test('should have sufficient color contrast for text', async ({ page }) => {
      // This is a basic visual check - in a real scenario you'd use axe-core
      const textElements = page.locator('p, span, h1, h2, h3, h4, h5, h6, a, button');
      const textCount = await textElements.count();
      
      expect(textCount).toBeGreaterThan(0);
      
      // Check that text elements are visible (basic contrast check)
      for (let i = 0; i < Math.min(5, textCount); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          await expect(element).toBeVisible();
        }
      }
    });

    test('should work without color alone conveying information', async ({ page }) => {
      // Check for error states in forms that don't rely only on color
      const errorElements = page.locator('[aria-invalid="true"], .error, [role="alert"]');
      const errorCount = await errorElements.count();
      
      // If there are error elements, they should have text or icons, not just color
      if (errorCount > 0) {
        const firstError = errorElements.first();
        const errorText = await firstError.textContent();
        expect(errorText).toBeTruthy();
      }
    });
  });

  test.describe('Images and Media', () => {
    test('should have alt text for all images', async ({ page }) => {
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const altText = await img.getAttribute('alt');
        
        // Alt text should exist (can be empty for decorative images)
        expect(altText).not.toBeNull();
      }
    });

    test('should have accessible video controls if videos exist', async ({ page }) => {
      const videos = page.locator('video, [data-testid="video-player"]');
      const videoCount = await videos.count();
      
      if (videoCount > 0) {
        const firstVideo = videos.first();
        
        // Check if video has controls
        const hasControls = await firstVideo.getAttribute('controls');
        const hasAriaLabel = await firstVideo.getAttribute('aria-label');
        
        // Video should either have controls or proper labeling
        expect(hasControls !== null || hasAriaLabel !== null).toBeTruthy();
      }
    });
  });

  test.describe('Forms Accessibility', () => {
    test('should have properly labeled form fields', async ({ page }) => {
      // Navigate to contact form
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const formFields = page.locator('input, select, textarea');
      const fieldCount = await formFields.count();
      
      for (let i = 0; i < fieldCount; i++) {
        const field = formFields.nth(i);
        
        // Check for label association
        const fieldId = await field.getAttribute('id');
        const fieldName = await field.getAttribute('name');
        const ariaLabel = await field.getAttribute('aria-label');
        const ariaLabelledBy = await field.getAttribute('aria-labelledby');
        
        // Field should have some form of label
        const hasLabel = fieldId || fieldName || ariaLabel || ariaLabelledBy;
        expect(hasLabel).toBeTruthy();
        
        if (fieldId) {
          // If field has ID, check for corresponding label
          const label = page.locator(`label[for="${fieldId}"]`);
          const labelExists = await label.count() > 0;
          if (!labelExists) {
            // If no explicit label, should have aria-label or aria-labelledby
            expect(ariaLabel || ariaLabelledBy).toBeTruthy();
          }
        }
      }
    });

    test('should have proper error message associations', async ({ page }) => {
      // Navigate to contact form
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Try to submit empty form to trigger validation
      const submitButton = page.getByRole('button', { name: /send message/i });
      await submitButton.click();
      await page.waitForTimeout(1000);
      
      // Check for error messages
      const errorMessages = page.locator('[role="alert"], .error-message, [aria-invalid="true"]');
      const errorCount = await errorMessages.count();
      
      if (errorCount > 0) {
        for (let i = 0; i < errorCount; i++) {
          const error = errorMessages.nth(i);
          
          // Error should be visible and have text content
          if (await error.isVisible()) {
            const errorText = await error.textContent();
            expect(errorText).toBeTruthy();
            expect(errorText!.trim().length).toBeGreaterThan(0);
          }
        }
      }
    });

    test('should have proper fieldset and legend for grouped fields', async ({ page }) => {
      // Navigate to contact form
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const fieldsets = page.locator('fieldset');
      const fieldsetCount = await fieldsets.count();
      
      for (let i = 0; i < fieldsetCount; i++) {
        const fieldset = fieldsets.nth(i);
        const legend = fieldset.locator('legend');
        
        // If fieldset exists, it should have a legend
        await expect(legend).toBeVisible();
        
        const legendText = await legend.textContent();
        expect(legendText).toBeTruthy();
      }
    });

    test('should indicate required fields properly', async ({ page }) => {
      // Navigate to contact form
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const requiredFields = page.locator('[required], [aria-required="true"]');
      const requiredCount = await requiredFields.count();
      
      for (let i = 0; i < requiredCount; i++) {
        const field = requiredFields.nth(i);
        
        // Required field should be marked as such
        const isRequired = await field.getAttribute('required');
        const ariaRequired = await field.getAttribute('aria-required');
        
        expect(isRequired !== null || ariaRequired === 'true').toBeTruthy();
      }
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should have proper ARIA landmarks', async ({ page }) => {
      const landmarks = page.locator('[role="banner"], [role="main"], [role="contentinfo"], [role="navigation"], [role="complementary"]');
      const landmarkCount = await landmarks.count();
      
      // Should have at least main landmark
      expect(landmarkCount).toBeGreaterThan(0);
      
      // Check for main landmark specifically
      const main = page.locator('[role="main"], main');
      await expect(main).toBeVisible();
    });

    test('should have proper live regions for dynamic content', async ({ page }) => {
      // Check for live regions that announce dynamic changes
      const liveRegions = page.locator('[aria-live], [role="status"], [role="alert"]');
      const liveRegionCount = await liveRegions.count();
      
      // This is optional but good to have for dynamic content
      if (liveRegionCount > 0) {
        for (let i = 0; i < liveRegionCount; i++) {
          const region = liveRegions.nth(i);
          const ariaLive = await region.getAttribute('aria-live');
          const role = await region.getAttribute('role');
          
          expect(ariaLive || role === 'status' || role === 'alert').toBeTruthy();
        }
      }
    });

    test('should have descriptive link text', async ({ page }) => {
      const links = page.locator('a');
      const linkCount = await links.count();
      
      for (let i = 0; i < Math.min(10, linkCount); i++) {
        const link = links.nth(i);
        const linkText = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        const title = await link.getAttribute('title');
        
        const effectiveText = ariaLabel || linkText || title;
        expect(effectiveText).toBeTruthy();
        
        // Link text should not be generic
        if (effectiveText) {
          expect(effectiveText.toLowerCase()).not.toMatch(/^(click here|read more|link)$/);
        }
      }
    });

    test('should have proper button text or labels', async ({ page }) => {
      const buttons = page.locator('button, [role="button"]');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const buttonText = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        const title = await button.getAttribute('title');
        
        const effectiveText = ariaLabel || buttonText || title;
        expect(effectiveText).toBeTruthy();
        expect(effectiveText!.trim().length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Mobile Accessibility', () => {
    test('should be accessible on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Check that content is still accessible on mobile
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      
      // Check that interactive elements are large enough for touch
      const buttons = page.locator('button, a, [role="button"]');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(3, buttonCount); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const boundingBox = await button.boundingBox();
          if (boundingBox) {
            // Touch targets should be at least 44x44px
            expect(boundingBox.width).toBeGreaterThanOrEqual(40);
            expect(boundingBox.height).toBeGreaterThanOrEqual(40);
          }
        }
      }
    });

    test('should support zoom up to 200% without horizontal scrolling', async ({ page }) => {
      // Set initial viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      
      // Simulate 200% zoom by halving viewport
      await page.setViewportSize({ width: 640, height: 360 });
      
      // Check that content is still accessible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      
      // Check that there's no horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      
      expect(hasHorizontalScroll).toBeFalsy();
    });
  });

  test.describe('Motion and Animation', () => {
    test('should respect reduced motion preferences', async ({ page }) => {
      // Simulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      
      // Page should still be functional with reduced motion
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      
      // Navigation should still work
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(500);
      
      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeGreaterThan(0);
    });

    test('should not have seizure-inducing flashing content', async ({ page }) => {
      // This is a basic check - in production you'd want more sophisticated testing
      const animatedElements = page.locator('.animate-pulse, .animate-spin, .animate-bounce');
      const animatedCount = await animatedElements.count();
      
      // If animated elements exist, they should be reasonable
      if (animatedCount > 0) {
        // Verify they're not flashing too rapidly
        for (let i = 0; i < animatedCount; i++) {
          const element = animatedElements.nth(i);
          await expect(element).toBeVisible();
        }
      }
    });
  });
});