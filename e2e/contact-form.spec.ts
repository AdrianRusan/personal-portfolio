import { test, expect } from '@playwright/test';

test.describe('Contact Form - TDD Implementation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section - use different methods for different devices
    const userAgent = await page.evaluate(() => navigator.userAgent);
    const isMobile = userAgent.includes('Mobile');
    
    if (isMobile) {
      // For mobile devices, use scrolling
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    } else {
      // For desktop, use mouse wheel
      await page.mouse.wheel(0, 5000);
    }
    
    await page.waitForTimeout(1000);
    
    // Wait for contact form to be visible
    await expect(page.getByRole('heading', { name: /let's work together/i })).toBeVisible({ timeout: 10000 });
  });

  test.describe('Form Structure and Accessibility', () => {
    test('should render all required form fields with proper labels', async ({ page }) => {
      // Check form heading
      await expect(page.getByRole('heading', { name: /let's work together/i })).toBeVisible();
      
      // Check all required fields are present with proper labels
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
      await expect(page.getByLabel(/project type/i)).toBeVisible();
      await expect(page.getByLabel(/budget range/i)).toBeVisible();
      await expect(page.getByLabel(/timeline/i)).toBeVisible();
      await expect(page.getByLabel(/project description/i)).toBeVisible();
      await expect(page.getByLabel(/how did you find me/i)).toBeVisible();
      
      // Check optional fields
      await expect(page.getByLabel(/company/i)).toBeVisible();
      await expect(page.getByLabel(/phone number/i)).toBeVisible();
      
      // Check submit button
      await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
    });

    test('should have proper accessibility attributes', async ({ page }) => {
      // Check required field indicators
      const requiredFields = [
        page.getByLabel(/full name/i),
        page.getByLabel(/email address/i),
        page.getByLabel(/project type/i),
        page.getByLabel(/budget range/i),
        page.getByLabel(/timeline/i),
        page.getByLabel(/project description/i),
        page.getByLabel(/how did you find me/i)
      ];

      for (const field of requiredFields) {
        // Check that required fields have proper ARIA attributes
        await expect(field).toHaveAttribute('aria-invalid', 'false');
      }

      // Check form has proper structure
      const form = page.locator('form');
      await expect(form).toBeVisible();
    });

    test('should be responsive on different screen sizes', async ({ page }) => {
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.getByRole('heading', { name: /let's work together/i })).toBeVisible();
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.getByRole('heading', { name: /let's work together/i })).toBeVisible();
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      
      // Test desktop view
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.getByRole('heading', { name: /let's work together/i })).toBeVisible();
      await expect(page.getByLabel(/full name/i)).toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test('should show validation errors for empty required fields', async ({ page }) => {
      // Try to submit empty form
      await page.getByRole('button', { name: /send message/i }).click();
      
      // Wait for validation errors to appear
      await page.waitForTimeout(500);
      
      // Check that validation errors are displayed
      await expect(page.getByText(/name must be at least 2 characters/i)).toBeVisible();
      await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
      await expect(page.getByText(/please select a project type/i)).toBeVisible();
      await expect(page.getByText(/please select a budget range/i)).toBeVisible();
      await expect(page.getByText(/please select a timeline/i)).toBeVisible();
      await expect(page.getByText(/description must be at least 10 characters/i)).toBeVisible();
      await expect(page.getByText(/please select how you found us/i)).toBeVisible();
    });

         test('should validate email format', async ({ page }) => {
       // Enter invalid email
       await page.getByLabel(/email address/i).fill('invalid-email');
       await page.getByLabel(/full name/i).focus(); // Use focus instead of click
       
       // Check email validation error
       await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
       
       // Enter valid email
       await page.getByLabel(/email address/i).fill('test@example.com');
       await page.getByLabel(/full name/i).focus();
       
       // Error should disappear
       await expect(page.getByText(/please enter a valid email address/i)).not.toBeVisible();
     });

         test('should validate phone number format', async ({ page }) => {
       // Enter invalid phone number
       await page.getByLabel(/phone number/i).fill('abc123');
       await page.getByLabel(/full name/i).focus(); // Use focus instead of click
       
       // Check phone validation error
       await expect(page.getByText(/please enter a valid phone number/i)).toBeVisible();
       
       // Enter valid phone number
       await page.getByLabel(/phone number/i).fill('+1234567890');
       await page.getByLabel(/full name/i).focus();
       
       // Error should disappear
       await expect(page.getByText(/please enter a valid phone number/i)).not.toBeVisible();
     });

         test('should validate name format', async ({ page }) => {
       // Enter invalid name with numbers
       await page.getByLabel(/full name/i).fill('John123');
       await page.getByLabel(/email address/i).focus(); // Use focus instead of click
       
       // Check name validation error
       await expect(page.getByText(/name can only contain letters/i)).toBeVisible();
       
       // Enter valid name
       await page.getByLabel(/full name/i).fill('John Doe');
       await page.getByLabel(/email address/i).focus();
       
       // Error should disappear
       await expect(page.getByText(/name can only contain letters/i)).not.toBeVisible();
     });

         test('should validate description length', async ({ page }) => {
       // Enter too short description
       await page.getByLabel(/project description/i).fill('Short');
       await page.getByLabel(/full name/i).focus(); // Use focus instead of click
       
       // Check description validation error
       await expect(page.getByText(/description must be at least 10 characters/i)).toBeVisible();
       
       // Enter valid description
       await page.getByLabel(/project description/i).fill('This is a detailed project description that meets the minimum length requirement.');
       await page.getByLabel(/full name/i).focus();
       
       // Error should disappear
       await expect(page.getByText(/description must be at least 10 characters/i)).not.toBeVisible();
     });
  });

  test.describe('Conditional Field Logic', () => {
    test('should show source details field when referral is selected', async ({ page }) => {
      // Initially, source details should not be visible
      await expect(page.getByLabel(/source details/i)).not.toBeVisible();
      
      // Select referral option
      await page.getByLabel(/how did you find me/i).selectOption('referral');
      
      // Source details field should now be visible
      await expect(page.getByLabel(/source details/i)).toBeVisible();
      
      // Select a different option
      await page.getByLabel(/how did you find me/i).selectOption('google');
      
      // Source details field should be hidden again
      await expect(page.getByLabel(/source details/i)).not.toBeVisible();
    });

    test('should show source details field when other is selected', async ({ page }) => {
      // Select other option
      await page.getByLabel(/how did you find me/i).selectOption('other');
      
      // Source details field should be visible
      await expect(page.getByLabel(/source details/i)).toBeVisible();
      
      // Field should be required when visible
      await page.getByRole('button', { name: /send message/i }).click();
      await page.waitForTimeout(500);
      
      await expect(page.getByText(/please provide details when selecting/i)).toBeVisible();
    });

    test('should validate source details when required', async ({ page }) => {
      // Select referral to show source details
      await page.getByLabel(/how did you find me/i).selectOption('referral');
      
      // Try to submit without source details
      await page.getByRole('button', { name: /send message/i }).click();
      await page.waitForTimeout(500);
      
      // Should show validation error
      await expect(page.getByText(/please provide details when selecting/i)).toBeVisible();
      
      // Fill source details
      await page.getByLabel(/source details/i).fill('Referred by a colleague');
      
             // Error should disappear
       await page.getByLabel(/full name/i).focus();
       await expect(page.getByText(/please provide details when selecting/i)).not.toBeVisible();
    });
  });

  test.describe('Form Submission', () => {
    test('should handle successful form submission', async ({ page }) => {
      // Fill out valid form data
      await page.getByLabel(/full name/i).fill('John Doe');
      await page.getByLabel(/email address/i).fill('john.doe@example.com');
      await page.getByLabel(/company/i).fill('Test Company');
      await page.getByLabel(/phone number/i).fill('+1234567890');
      await page.getByLabel(/project type/i).selectOption('web-development');
      await page.getByLabel(/budget range/i).selectOption('5k-15k');
      await page.getByLabel(/timeline/i).selectOption('2-3-months');
      await page.getByLabel(/project description/i).fill('I need a modern website for my business with e-commerce functionality.');
      await page.getByLabel(/how did you find me/i).selectOption('google');
      
      // Submit form
      await page.getByRole('button', { name: /send message/i }).click();
      
      // Check loading state
      await expect(page.getByRole('button', { name: /sending/i })).toBeVisible();
      
      // Wait for success message
      await expect(page.getByText(/thank you for your message/i)).toBeVisible({ timeout: 10000 });
      
      // Check success page elements
      await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible();
      await expect(page.getByText(/I'll review your project details/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /send another message/i })).toBeVisible();
    });

    test('should reset form after successful submission', async ({ page }) => {
      // Fill and submit form
      await page.getByLabel(/full name/i).fill('Jane Doe');
      await page.getByLabel(/email address/i).fill('jane.doe@example.com');
      await page.getByLabel(/project type/i).selectOption('consultation');
      await page.getByLabel(/budget range/i).selectOption('discuss');
      await page.getByLabel(/timeline/i).selectOption('flexible');
      await page.getByLabel(/project description/i).fill('I need consultation on my existing project architecture.');
      await page.getByLabel(/how did you find me/i).selectOption('linkedin');
      
      await page.getByRole('button', { name: /send message/i }).click();
      
      // Wait for success and click send another message
      await expect(page.getByRole('button', { name: /send another message/i })).toBeVisible({ timeout: 10000 });
      await page.getByRole('button', { name: /send another message/i }).click();
      
      // Form should be reset
      await expect(page.getByLabel(/full name/i)).toHaveValue('');
      await expect(page.getByLabel(/email address/i)).toHaveValue('');
      await expect(page.getByLabel(/project description/i)).toHaveValue('');
    });

    test('should prevent multiple submissions', async ({ page }) => {
      // Fill form
      await page.getByLabel(/full name/i).fill('Test User');
      await page.getByLabel(/email address/i).fill('test@example.com');
      await page.getByLabel(/project type/i).selectOption('web-development');
      await page.getByLabel(/budget range/i).selectOption('5k-15k');
      await page.getByLabel(/timeline/i).selectOption('1-month');
      await page.getByLabel(/project description/i).fill('Test project description that meets minimum length.');
      await page.getByLabel(/how did you find me/i).selectOption('direct');
      
      // Click submit button
      await page.getByRole('button', { name: /send message/i }).click();
      
      // Button should show loading state and be disabled
      const submitButton = page.getByRole('button', { name: /sending/i });
      await expect(submitButton).toBeVisible();
      
      // Try to click again - should not trigger another submission
      await submitButton.click();
      
      // Should still be in loading state
      await expect(submitButton).toBeVisible();
    });
  });

  test.describe('User Experience', () => {
    test('should provide helpful placeholder text', async ({ page }) => {
      await expect(page.getByPlaceholder(/your full name/i)).toBeVisible();
      await expect(page.getByPlaceholder(/your.email@example.com/i)).toBeVisible();
      await expect(page.getByPlaceholder(/your company name \(optional\)/i)).toBeVisible();
      await expect(page.getByPlaceholder(/your phone number \(optional\)/i)).toBeVisible();
      await expect(page.getByPlaceholder(/tell me about your project/i)).toBeVisible();
    });

    test('should show toast notifications', async ({ page }) => {
      // Fill and submit valid form
      await page.getByLabel(/full name/i).fill('Toast Test');
      await page.getByLabel(/email address/i).fill('toast@example.com');
      await page.getByLabel(/project type/i).selectOption('web-development');
      await page.getByLabel(/budget range/i).selectOption('5k-15k');
      await page.getByLabel(/timeline/i).selectOption('1-month');
      await page.getByLabel(/project description/i).fill('Testing toast notifications functionality.');
      await page.getByLabel(/how did you find me/i).selectOption('github');
      
      await page.getByRole('button', { name: /send message/i }).click();
      
      // Toast notification should appear
      await expect(page.getByText(/thank you for your message/i)).toBeVisible({ timeout: 5000 });
    });

         test('should maintain form state during interaction', async ({ page }) => {
       // Fill some fields
       await page.getByLabel(/full name/i).fill('State Test');
       await page.getByLabel(/email address/i).fill('state@example.com');
       await page.getByLabel(/project type/i).selectOption('e-commerce');
       
       // Navigate away and back (scroll up and down)
       const userAgent = await page.evaluate(() => navigator.userAgent);
       const isMobile = userAgent.includes('Mobile');
       
       if (isMobile) {
         await page.evaluate(() => window.scrollTo(0, 0));
         await page.waitForTimeout(500);
         await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
       } else {
         await page.mouse.wheel(0, -2000);
         await page.waitForTimeout(500);
         await page.mouse.wheel(0, 5000);
       }
       await page.waitForTimeout(500);
       
       // Form should maintain state
       await expect(page.getByLabel(/full name/i)).toHaveValue('State Test');
       await expect(page.getByLabel(/email address/i)).toHaveValue('state@example.com');
       await expect(page.getByLabel(/project type/i)).toHaveValue('e-commerce');
     });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support keyboard navigation through form fields', async ({ page }) => {
      // Start from first field
      await page.getByLabel(/full name/i).focus();
      await expect(page.getByLabel(/full name/i)).toBeFocused();
      
      // Tab through fields
      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/email address/i)).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/company/i)).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/phone number/i)).toBeFocused();
      
      // Continue through remaining fields
      await page.keyboard.press('Tab');
      await expect(page.getByLabel(/project type/i)).toBeFocused();
    });

    test('should allow form submission via Enter key', async ({ page }) => {
      // Fill form
      await page.getByLabel(/full name/i).fill('Keyboard User');
      await page.getByLabel(/email address/i).fill('keyboard@example.com');
      await page.getByLabel(/project type/i).selectOption('consultation');
      await page.getByLabel(/budget range/i).selectOption('discuss');
      await page.getByLabel(/timeline/i).selectOption('flexible');
      await page.getByLabel(/project description/i).fill('Testing keyboard submission functionality.');
      await page.getByLabel(/how did you find me/i).selectOption('referral');
      await page.getByLabel(/source details/i).fill('Referred by a friend');
      
      // Focus on submit button and press Enter
      await page.getByRole('button', { name: /send message/i }).focus();
      await page.keyboard.press('Enter');
      
      // Should submit successfully
      await expect(page.getByText(/thank you for your message/i)).toBeVisible({ timeout: 10000 });
    });
  });
}); 