import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('combines class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('handles conditional class names', () => {
    const isActive = true
    const result = cn(
      'base-class',
      isActive && 'active-class',
      !isActive && 'inactive-class'
    )
    expect(result).toBe('base-class active-class')
  })

  it('merges conflicting Tailwind classes correctly', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4') // Should keep the last conflicting class
  })

  it('handles arrays of classes', () => {
    const result = cn(['text-sm', 'font-bold'], 'text-blue-500')
    expect(result).toBe('text-sm font-bold text-blue-500')
  })

  it('handles objects with conditional classes', () => {
    const result = cn({
      'text-red-500': true,
      'text-blue-500': false,
      'font-bold': true
    })
    expect(result).toBe('text-red-500 font-bold')
  })

  it('handles mixed input types', () => {
    const result = cn(
      'base',
      ['array', 'classes'],
      { 'conditional': true, 'false-condition': false },
      'final'
    )
    expect(result).toBe('base array classes conditional final')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn(null)).toBe('')
    expect(cn(undefined)).toBe('')
  })

  it('deduplicates identical classes', () => {
    const result = cn('text-red-500', 'text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('handles complex Tailwind merge scenarios', () => {
    // Test that conflicting margin classes are properly merged
    const result = cn('m-2', 'mx-4', 'ml-6')
    expect(result).toBe('m-2 mx-4 ml-6') // twMerge should handle the precedence
  })

  it('preserves arbitrary values', () => {
    const result = cn('text-[#ff0000]', 'bg-[rgb(0,255,0)]')
    expect(result).toBe('text-[#ff0000] bg-[rgb(0,255,0)]')
  })
})