import '@testing-library/jest-dom'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...rest }) => {
    return <a {...rest}>{children}</a>
  },
}))

// Mock next/dynamic
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = 'LoadableComponent'
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    nav: 'nav',
    span: 'span',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    section: 'section',
    article: 'article',
  },
  AnimatePresence: ({ children }) => children,
  useScroll: () => ({
    scrollYProgress: { get: () => 0, getPrevious: () => 0 },
  }),
  useMotionValueEvent: () => {},
  useTransform: () => 0,
  useSpring: () => 0,
}))

// Mock react-lottie
jest.mock('react-lottie', () => ({
  __esModule: true,
  default: () => <div data-testid="lottie-animation" />,
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}