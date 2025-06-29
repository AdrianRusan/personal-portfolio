# Comprehensive Test Suite Documentation

## Overview
This document describes the comprehensive test suite for the personal portfolio application, covering both component tests (using Jest and React Testing Library) and end-to-end tests (using Playwright).

## Test Structure

### 📁 Component Tests (`__tests__/`)
Located in the `__tests__` directory, these tests focus on individual components and their behavior in isolation.

#### Core Components Tested:
- **Hero Component** (`__tests__/components/Hero.test.tsx`)
  - Happy path rendering
  - Text content verification
  - Resume link functionality
  - Responsive design classes
  - Accessibility compliance

- **Projects Component** (`__tests__/components/Projects.test.tsx`)
  - Project data rendering
  - GitHub and website links
  - Technology icons display
  - Responsive layout
  - Edge cases (missing GitHub links, long text)

- **Main Page** (`__tests__/app/page.test.tsx`)
  - Overall structure verification
  - Component integration
  - Navigation setup
  - Dynamic imports handling

#### UI Components Tested:
- **FloatingNav** (`__tests__/components/ui/FloatingNav.test.tsx`)
  - Navigation item rendering
  - Scroll behavior
  - Responsive design
  - Accessibility features

- **MagicButton** (`__tests__/components/ui/MagicButton.test.tsx`)
  - Button rendering with different props
  - Icon positioning (left/right)
  - Click handlers
  - Custom styling
  - Keyboard accessibility

### 🎭 End-to-End Tests (`e2e/`)
Located in the `e2e` directory, these tests simulate real user interactions across the entire application.

#### Main User Journey (`e2e/portfolio-journey.spec.ts`)
- **Happy Path Flow:**
  - Landing on homepage
  - Reading hero content
  - Accessing resume link
  - Navigating through sections
  - Exploring projects
  - Testing all interactive elements

- **Responsive Design Testing:**
  - Mobile viewport (375x667)
  - Tablet viewport (768x1024)
  - Desktop viewport (1920x1080)

- **Accessibility Testing:**
  - Heading hierarchy
  - Keyboard navigation
  - Image alt text
  - Focus management

- **Performance Testing:**
  - Page load times
  - Image loading
  - Network idle states

#### Error Scenarios (`e2e/error-scenarios.spec.ts`)
- JavaScript disabled scenarios
- Network failure handling
- 404 error responses
- Slow loading conditions
- Extreme viewport sizes
- Missing CSS graceful degradation
- Browser navigation (back/forward)
- Focus management edge cases

## Test Coverage Areas

### ✅ Happy Path Coverage
- User successfully navigates through portfolio
- All components render correctly
- Links work as expected
- Interactive elements respond properly
- Content displays accurately

### ⚠️ Edge Cases Covered
- Empty or missing data
- Long text content
- Optional properties (GitHub links)
- Network connectivity issues
- Browser compatibility
- Accessibility edge cases

### 🚫 Error States Covered
- JavaScript disabled
- Network failures
- Slow loading times
- Missing images
- CSS loading failures
- Invalid navigation attempts

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Next.js integration
- Module path mapping
- Coverage collection
- Test environment setup

### Playwright Configuration (`playwright.config.ts`)
- Multi-browser testing (Chromium, Firefox, WebKit)
- Mobile device simulation
- Test parallelization
- Screenshot and video capture on failures
- Local development server integration

### Test Setup (`jest.setup.js`)
- Custom matchers from jest-dom
- Component mocking (Next.js Image, Link, dynamic imports)
- Framer Motion mocking
- Browser API mocking (IntersectionObserver, ResizeObserver)

## Running Tests

### Component Tests
```bash
# Run all component tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run all tests
npm run test:all
```

### Specific Test Runs
```bash
# Run specific test file
npm test Hero.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Happy Path"

# Run E2E tests on specific browser
npx playwright test --project=chromium
```

## Test Patterns and Best Practices

### Component Testing Patterns
1. **Arrange-Act-Assert**: Clear test structure
2. **Mock External Dependencies**: Isolate component behavior
3. **Test User Interactions**: Focus on user-facing behavior
4. **Accessibility First**: Include accessibility assertions
5. **Responsive Testing**: Verify responsive behavior

### E2E Testing Patterns
1. **User Journey Focus**: Test complete workflows
2. **Cross-Browser Validation**: Ensure compatibility
3. **Performance Awareness**: Monitor load times
4. **Error Resilience**: Test failure scenarios
5. **Visual Regression**: Screenshot comparisons

### Assertion Examples
```typescript
// Component tests
expect(screen.getByText('Expected Text')).toBeInTheDocument()
expect(element).toHaveClass('expected-class')
expect(link).toHaveAttribute('href', 'expected-url')

// E2E tests
await expect(page.locator('#section')).toBeVisible()
await expect(page).toHaveTitle(/Expected Title/)
await expect(link).toHaveAttribute('target', '_blank')
```

## Debugging Tests

### Component Test Debugging
```bash
# Debug specific test
npm test -- --testNamePattern="specific test" --no-coverage --verbose

# Run tests with debugger
node --inspect-brk node_modules/.bin/jest --runInBand
```

### E2E Test Debugging
```bash
# Run with headed browser
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Generate trace
npx playwright test --trace on
```

## Continuous Integration

### GitHub Actions Integration
The test suite is designed to run in CI environments with:
- Parallel test execution
- Cross-browser testing
- Coverage reporting
- Artifact collection (screenshots, videos, traces)

### Coverage Goals
- **Component Coverage**: >90% line coverage
- **E2E Coverage**: All critical user paths
- **Accessibility Coverage**: WCAG 2.1 AA compliance

## Maintenance

### Regular Updates
- Update test data when application data changes
- Adjust selectors when UI changes
- Add tests for new features
- Update browser versions in Playwright

### Test Health Monitoring
- Monitor test execution times
- Track flaky tests
- Review coverage reports
- Update deprecated patterns

## Troubleshooting Common Issues

### Jest/RTL Issues
- **Mock not working**: Check mock implementation and placement
- **Component not rendering**: Verify imports and dependencies
- **Assertion failures**: Check element visibility and timing

### Playwright Issues
- **Element not found**: Use better selectors or wait conditions
- **Timeout errors**: Increase timeout or improve wait conditions
- **Flaky tests**: Add proper wait conditions and stable selectors

### Environment Issues
- **Network failures**: Check test environment connectivity
- **Browser crashes**: Update browser versions
- **Permission errors**: Check file system permissions

This test suite provides comprehensive coverage of the portfolio application, ensuring reliability, accessibility, and optimal user experience across all scenarios.