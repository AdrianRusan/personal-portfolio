import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

// Custom render function that includes common providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }

// Common test data
export const mockNavItems = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#about' },
  { name: 'Experience', link: '#experience' },
  { name: 'Contact', link: '#contact' },
]

export const mockProjectData = {
  id: 1,
  title: 'Test Project',
  description: 'This is a test project description',
  img: '/test-image.jpg',
  alt: 'Test project image',
  iconLists: ['/icon1.svg', '/icon2.svg'],
  iconListsAlt: ['React icon', 'TypeScript icon'],
  github: 'https://github.com/test/project',
  link: 'https://test-project.com',
}

// Helper functions for common test patterns
export const expectElementToBeVisible = (element: any) => {
  expect(element).toBeInTheDocument()
}

export const expectElementToHaveClasses = (element: any, classes: string[]) => {
  classes.forEach(className => {
    expect(element).toHaveClass(className)
  })
}

export const expectLinkToOpenInNewTab = (link: any) => {
  expect(link).toHaveAttribute('target', '_blank')
}

// Mock data generators
export const generateMockProjects = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    ...mockProjectData,
    id: index + 1,
    title: `Test Project ${index + 1}`,
    description: `This is test project ${index + 1} description`,
  }))
}

// Common assertions
export const assertAccessibleForm = (form: any) => {
  expect(form).toHaveRole('form')
  // Add more accessibility assertions as needed
}

export const assertResponsiveClasses = (element: any, mobileClasses: string[], desktopClasses: string[]) => {
  mobileClasses.forEach(className => {
    expect(element).toHaveClass(className)
  })
  desktopClasses.forEach(className => {
    expect(element).toHaveClass(className)
  })
}

// Test component wrappers
export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return React.createElement('div', { 'data-testid': 'test-wrapper' }, children)
}

// Dummy test to prevent Jest from complaining
describe('Test Utils', () => {
  it('should provide test utilities', () => {
    expect(typeof customRender).toBe('function')
  })
})