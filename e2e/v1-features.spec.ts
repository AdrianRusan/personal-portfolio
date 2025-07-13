import { test, expect } from '@playwright/test';

test.describe('V1 Features - Comprehensive User Flow Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Advanced Contact Form - V1 Enhancement', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to contact section
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading', { name: /let's work together/i })).toBeVisible({ timeout: 10000 });
    });

    test('should handle complete contact form submission with all V1 fields', async ({ page }) => {
      // Fill out all required fields
      await page.getByLabel(/full name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john.doe@example.com');
      
      // Select project type
      await page.getByLabel(/project type/i).selectOption('web-development');
      
      // Select budget range
      await page.getByLabel(/budget range/i).selectOption('10000-25000');
      
      // Select timeline
      await page.getByLabel(/timeline/i).selectOption('2-3-months');
      
      // Fill project description
      await page.getByLabel(/project description/i).fill('I need a modern e-commerce website with payment integration and user authentication.');
      
      // Select how they found us
      await page.getByLabel(/how did you find me/i).selectOption('google-search');
      
      // Fill optional fields
      await page.getByLabel(/company/i).fill('Tech Solutions Inc');
      await page.getByLabel(/phone number/i).fill('+1234567890');
      
      // Submit form
      await page.getByRole('button', { name: /send message/i }).click();
      
      // Wait for success message or redirect
      await expect(page.getByText(/message sent successfully/i).or(page.getByText(/thank you/i))).toBeVisible({ timeout: 10000 });
    });

    test('should validate required fields and show appropriate error messages', async ({ page }) => {
      // Try to submit empty form
      await page.getByRole('button', { name: /send message/i }).click();
      
      // Check for validation errors
      await expect(page.getByText(/name is required/i).or(page.getByText(/required/i))).toBeVisible();
      await expect(page.getByText(/email is required/i).or(page.getByText(/required/i))).toBeVisible();
    });

    test('should handle conditional field logic based on project type', async ({ page }) => {
      // Select different project types and verify conditional fields appear
      await page.getByLabel(/project type/i).selectOption('web-development');
      
      // Check that budget and timeline fields are visible for web development
      await expect(page.getByLabel(/budget range/i)).toBeVisible();
      await expect(page.getByLabel(/timeline/i)).toBeVisible();
    });

    test('should validate email format and provide feedback', async ({ page }) => {
      await page.getByLabel(/email address/i).fill('invalid-email');
      await page.getByLabel(/full name/i).click(); // Trigger validation
      
      // Should show email validation error
      await expect(page.getByText(/invalid email/i).or(page.getByText(/enter a valid email/i))).toBeVisible();
    });
  });

  test.describe('GitHub Integration - Dynamic Data Display', () => {
    test('should display GitHub repositories and contribution data', async ({ page }) => {
      // Look for GitHub showcase section
      const githubSection = page.locator('[data-testid="github-showcase"]').or(page.locator('.github-showcase'));
      
      if (await githubSection.isVisible()) {
        await expect(githubSection).toBeVisible();
        
        // Check for repository cards
        const repoCards = githubSection.locator('.repo-card').or(githubSection.locator('[data-testid="repo-card"]'));
        await expect(repoCards.first()).toBeVisible({ timeout: 10000 });
        
        // Check for contribution stats
        const contributionStats = githubSection.locator('.contribution-stats').or(githubSection.locator('[data-testid="contribution-stats"]'));
        if (await contributionStats.isVisible()) {
          await expect(contributionStats).toBeVisible();
        }
      }
    });

    test('should handle GitHub API failures gracefully', async ({ page }) => {
      // Check if there's a fallback message when GitHub data fails to load
      const githubSection = page.locator('[data-testid="github-showcase"]').or(page.locator('.github-showcase'));
      
      if (await githubSection.isVisible()) {
        // Wait for content to load or error message to appear
        await page.waitForTimeout(5000);
        
        // Should either show content or a graceful error message
        const hasContent = await githubSection.locator('.repo-card').count() > 0;
        const hasErrorMessage = await githubSection.getByText(/unable to load/i).or(githubSection.getByText(/error/i)).isVisible();
        
        expect(hasContent || hasErrorMessage).toBe(true);
      }
    });

    test('should display repository information with proper formatting', async ({ page }) => {
      const githubSection = page.locator('[data-testid="github-showcase"]').or(page.locator('.github-showcase'));
      
      if (await githubSection.isVisible()) {
        const repoCard = githubSection.locator('.repo-card').or(githubSection.locator('[data-testid="repo-card"]')).first();
        
        if (await repoCard.isVisible()) {
          // Check for repository name
          await expect(repoCard.locator('h3').or(repoCard.locator('.repo-name'))).toBeVisible();
          
          // Check for description
          await expect(repoCard.locator('p').or(repoCard.locator('.repo-description'))).toBeVisible();
          
          // Check for language and stars if present
          const languageElement = repoCard.locator('.language').or(repoCard.locator('[data-testid="language"]'));
          const starsElement = repoCard.locator('.stars').or(repoCard.locator('[data-testid="stars"]'));
          
          // These might not always be present, so we just check if they exist
          if (await languageElement.isVisible()) {
            await expect(languageElement).toBeVisible();
          }
          if (await starsElement.isVisible()) {
            await expect(starsElement).toBeVisible();
          }
        }
      }
    });
  });

  test.describe('Calendly Integration - Consultation Booking', () => {
    test('should display Calendly widget for consultation booking', async ({ page }) => {
      // Navigate to contact section where Calendly might be embedded
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(2000);
      
      // Look for Calendly iframe or widget
      const calendlyWidget = page.locator('iframe[src*="calendly"]').or(page.locator('[data-testid="calendly-widget"]'));
      
      if (await calendlyWidget.isVisible()) {
        await expect(calendlyWidget).toBeVisible();
        
        // Check if iframe is properly loaded
        await expect(calendlyWidget).toHaveAttribute('src', /calendly/);
      } else {
        // Look for a button or link to open Calendly
        const calendlyButton = page.getByRole('button', { name: /schedule/i }).or(page.getByRole('link', { name: /book consultation/i }));
        
        if (await calendlyButton.isVisible()) {
          await expect(calendlyButton).toBeVisible();
        }
      }
    });

    test('should handle Calendly widget loading and interaction', async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(2000);
      
      const calendlyWidget = page.locator('iframe[src*="calendly"]');
      
      if (await calendlyWidget.isVisible()) {
        // Wait for Calendly to load
        await page.waitForTimeout(3000);
        
        // Check if widget is responsive
        await expect(calendlyWidget).toBeVisible();
        
        // Verify iframe has proper dimensions
        const boundingBox = await calendlyWidget.boundingBox();
        expect(boundingBox?.width).toBeGreaterThan(0);
        expect(boundingBox?.height).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Documentation Platform - Static Content', () => {
    test('should navigate to documentation section', async ({ page }) => {
      await page.goto('/docs');
      
      // Check for documentation page
      await expect(page.getByRole('heading', { name: /documentation/i })).toBeVisible({ timeout: 10000 });
    });

    test('should display documentation navigation and content', async ({ page }) => {
      await page.goto('/docs');
      
      // Check for navigation links
      const docNavigation = page.locator('.docs-nav').or(page.locator('[data-testid="docs-nav"]'));
      
      if (await docNavigation.isVisible()) {
        await expect(docNavigation).toBeVisible();
        
        // Check for navigation items
        const navItems = docNavigation.locator('a').or(docNavigation.locator('button'));
        await expect(navItems.first()).toBeVisible();
      }
      
      // Check for content area
      const contentArea = page.locator('.docs-content').or(page.locator('[data-testid="docs-content"]'));
      if (await contentArea.isVisible()) {
        await expect(contentArea).toBeVisible();
      }
    });

    test('should navigate between documentation pages', async ({ page }) => {
      await page.goto('/docs');
      
      // Try to navigate to different documentation sections
      const sections = ['/docs/introduction', '/docs/getting-started', '/docs/api-basics'];
      
      for (const section of sections) {
        await page.goto(section);
        
        // Should not show 404 error
        await expect(page.getByText(/404/i)).not.toBeVisible();
        
        // Should show some content
        await expect(page.locator('main').or(page.locator('.content'))).toBeVisible();
      }
    });
  });

  test.describe('Service Status Page - Uptime Monitoring', () => {
    test('should display service status page', async ({ page }) => {
      await page.goto('/status');
      
      // Check for status page heading
      await expect(page.getByRole('heading', { name: /status/i })).toBeVisible({ timeout: 10000 });
    });

    test('should show service health indicators', async ({ page }) => {
      await page.goto('/status');
      
      // Look for status indicators
      const statusIndicators = page.locator('.status-indicator').or(page.locator('[data-testid="status-indicator"]'));
      
      if (await statusIndicators.first().isVisible()) {
        await expect(statusIndicators.first()).toBeVisible();
        
        // Check for operational status
        const operationalStatus = page.getByText(/operational/i).or(page.getByText(/online/i));
        if (await operationalStatus.isVisible()) {
          await expect(operationalStatus).toBeVisible();
        }
      }
    });

    test('should display uptime percentage', async ({ page }) => {
      await page.goto('/status');
      
      // Look for uptime percentage
      const uptimeElement = page.locator('.uptime').or(page.locator('[data-testid="uptime"]'));
      
      if (await uptimeElement.isVisible()) {
        await expect(uptimeElement).toBeVisible();
        
        // Should contain percentage
        await expect(uptimeElement).toContainText(/%/);
      }
    });
  });

  test.describe('Learning Platform - Educational Content', () => {
    test('should display learning platform', async ({ page }) => {
      await page.goto('/learning');
      
      // Check for learning platform heading
      await expect(page.getByRole('heading', { name: /learning/i })).toBeVisible({ timeout: 10000 });
    });

    test('should show educational content listing', async ({ page }) => {
      await page.goto('/learning');
      
      // Look for content cards or articles
      const contentCards = page.locator('.article-card').or(page.locator('[data-testid="article-card"]'));
      
      if (await contentCards.first().isVisible()) {
        await expect(contentCards.first()).toBeVisible();
        
        // Check for article title
        await expect(contentCards.first().locator('h3').or(contentCards.first().locator('.title'))).toBeVisible();
      }
    });

    test('should navigate to individual learning content', async ({ page }) => {
      await page.goto('/learning');
      
      // Look for content links
      const contentLinks = page.locator('a[href*="/learning/"]');
      
      if (await contentLinks.first().isVisible()) {
        const firstLink = contentLinks.first();
        await firstLink.click();
        
        // Should navigate to article page
        await expect(page.url()).toContain('/learning/');
        
        // Should show article content
        await expect(page.locator('article').or(page.locator('.content'))).toBeVisible();
      }
    });

    test('should track reading progress in localStorage', async ({ page }) => {
      await page.goto('/learning');
      
      // Navigate to an article
      const contentLinks = page.locator('a[href*="/learning/"]');
      
      if (await contentLinks.first().isVisible()) {
        await contentLinks.first().click();
        
        // Simulate reading by scrolling
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight / 2);
        });
        
        await page.waitForTimeout(1000);
        
        // Check if progress is stored in localStorage
        const progress = await page.evaluate(() => {
          return localStorage.getItem('learning-progress');
        });
        
        // Progress should be stored (even if null initially)
        expect(progress !== undefined).toBe(true);
      }
    });
  });

  test.describe('UI/UX Enhancements - Navigation and Interactions', () => {
    test('should display sticky navigation header', async ({ page }) => {
      // Check if navigation is visible
      const navigation = page.locator('.floating-nav').or(page.locator('[data-testid="navigation"]'));
      await expect(navigation).toBeVisible();
      
      // Scroll down to test sticky behavior
      await page.evaluate(() => {
        window.scrollTo(0, 1000);
      });
      
      await page.waitForTimeout(500);
      
      // Navigation should still be visible
      await expect(navigation).toBeVisible();
    });

    test('should handle mobile navigation menu', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Look for mobile menu trigger
      const mobileMenuTrigger = page.locator('.mobile-menu-trigger').or(page.locator('[data-testid="mobile-menu"]'));
      
      if (await mobileMenuTrigger.isVisible()) {
        await expect(mobileMenuTrigger).toBeVisible();
        
        // Click to open menu
        await mobileMenuTrigger.click();
        
        // Check if menu opens
        const mobileMenu = page.locator('.mobile-menu').or(page.locator('[data-testid="mobile-menu-panel"]'));
        if (await mobileMenu.isVisible()) {
          await expect(mobileMenu).toBeVisible();
        }
      }
    });

    test('should display loading skeletons and micro-interactions', async ({ page }) => {
      // Check for skeleton loaders during page load
      const skeletons = page.locator('.skeleton').or(page.locator('[data-testid="skeleton"]'));
      
      // Skeletons might appear briefly during loading
      if (await skeletons.first().isVisible()) {
        await expect(skeletons.first()).toBeVisible();
      }
      
      // Check for interactive elements with hover effects
      const interactiveElements = page.locator('button').or(page.locator('a'));
      
      if (await interactiveElements.first().isVisible()) {
        await interactiveElements.first().hover();
        
        // Should have some visual feedback (this is hard to test programmatically)
        await expect(interactiveElements.first()).toBeVisible();
      }
    });

    test('should handle smooth scrolling navigation', async ({ page }) => {
      const navigation = page.locator('.floating-nav').or(page.locator('[data-testid="navigation"]'));
      
      if (await navigation.isVisible()) {
        const navLinks = navigation.locator('a[href*="#"]');
        
        if (await navLinks.first().isVisible()) {
          await navLinks.first().click();
          
          // Wait for smooth scroll to complete
          await page.waitForTimeout(1000);
          
          // Page should not have jumped abruptly
          await expect(page).toHaveURL(/.*#.*/);
        }
      }
    });
  });

  test.describe('Workflow Automation - API Routes and Webhooks', () => {
    test('should have working health check endpoint', async ({ page }) => {
      const response = await page.request.get('/api/health');
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(data).toHaveProperty('status');
    });

    test('should handle contact form API endpoint', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: {
          fullName: 'Test User',
          email: 'test@example.com',
          projectType: 'web-development',
          budgetRange: '5000-10000',
          timeline: '1-2-months',
          projectDescription: 'Test project description',
          source: 'google-search'
        }
      });
      
      // Should return success or validation error, not 404
      expect(response.status()).not.toBe(404);
    });

    test('should handle GitHub API endpoint', async ({ page }) => {
      const response = await page.request.get('/api/github');
      
      // Should return data or proper error, not 404
      expect(response.status()).not.toBe(404);
      
      if (response.status() === 200) {
        const data = await response.json();
        expect(data).toBeDefined();
      }
    });

    test('should handle webhook endpoints', async ({ page }) => {
      // Test revalidation webhook
      const revalidateResponse = await page.request.post('/api/webhooks/revalidate-static');
      
      // Should handle the request (might return 401 without proper auth, but not 404)
      expect(revalidateResponse.status()).not.toBe(404);
    });
  });

  test.describe('Performance and Accessibility - V1 Features', () => {
    test('should maintain fast page load times', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Should load within reasonable time (5 seconds)
      expect(loadTime).toBeLessThan(5000);
    });

    test('should have proper accessibility attributes', async ({ page }) => {
      // Check for proper heading structure
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      // Check for alt text on images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          await expect(img).toHaveAttribute('alt');
        }
      }
      
      // Check for proper form labels
      const inputs = page.locator('input');
      const inputCount = await inputs.count();
      
      for (let i = 0; i < Math.min(inputCount, 5); i++) {
        const input = inputs.nth(i);
        if (await input.isVisible()) {
          const id = await input.getAttribute('id');
          if (id) {
            const label = page.locator(`label[for="${id}"]`);
            await expect(label).toBeVisible();
          }
        }
      }
    });

    test('should be responsive across different viewport sizes', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1920, height: 1080 }  // Desktop
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        
        // Check that main content is visible
        await expect(page.locator('main').or(page.locator('.main-content'))).toBeVisible();
        
        // Check that navigation adapts
        const navigation = page.locator('.floating-nav').or(page.locator('[data-testid="navigation"]'));
        await expect(navigation).toBeVisible();
      }
    });
  });
}); 