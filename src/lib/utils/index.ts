import { isClient } from '~/lib/constants'

export const formatError = (
  error: unknown
): { message: string; name?: string } => {
  try {
    if (error instanceof Error) {
      return { message: error.message, name: error.name }
    }
    return { message: String(error) }
  } catch (error) {
    return { message: 'An unknown error ocurred.' }
  }
}

export const isApiSupported = (api: string) => isClient && api in window

/* Builds responsive sizes string for images */
export const getSizes = (
  entries: ({ breakpoint: string; width: string } | string | number)[]
) => {
  const sizes = entries.map((entry) => {
    if (!entry) {
      return ''
    }

    if (typeof entry === 'string') {
      return entry
    }

    if (typeof entry === 'number') {
      return `${entry}px`
    }

    if (entry.breakpoint.includes('px') || entry.breakpoint.includes('rem')) {
      return `(min-width: ${entry.breakpoint}) ${entry.width}`
    }

    throw new Error(`Invalid breakpoint: ${entry.breakpoint}`)
  })

  return sizes.join(', ')
}

export function getControlsFromUniforms(
  uniforms: Record<string, any>,
  ref: any
) {
  return Object.keys(uniforms).reduce((acc: any, key: any) => {
    const uniform = uniforms[key]
    const isColor = uniform.value?.isColor
    if (key !== 'uTime') {
      acc[key] = {
        value: isColor ? `#${uniform.value.getHexString()}` : uniform.value,
        onChange: (val: any) => {
          if (isColor) {
            ref.current.uniforms[key].value.set(val)
          } else {
            ref.current.uniforms[key].value = val
          }
        }
      }
    }

    return acc
  }, [])
}
