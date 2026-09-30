export type QueryValue = string | number | boolean | null | undefined

export type ImageProxyOptions = {
  img?: string
  ratingKey?: string | number
  width?: number
  height?: number
  opacity?: number
  background?: string
  blur?: number
  fallback?: 'poster' | 'cover' | 'art' | 'poster-live' | 'art-live' | 'art-live-full' | 'user'
}

const useRemoteDevelopmentProxy = import.meta.env.DEV && import.meta.env.VITE_PULSE_REMOTE === 'true'

function queryString(values: Record<string, QueryValue>) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== null) params.set(key, String(value))
  }
  return params.toString()
}

/** Builds an API v2 URL without exposing a remote development URL or API key. */
export function tautulliApiUrl(command: string, parameters: Record<string, QueryValue> = {}) {
  const query = queryString({ cmd: command, ...parameters })
  const endpoint = useRemoteDevelopmentProxy ? '__pulse/remote/api' : 'api/v2'
  return `${endpoint}?${query}`
}

/** Builds a same-origin image URL in production and a Vite-proxied URL in remote development. */
export function tautulliImageUrl(options: ImageProxyOptions) {
  const query = queryString({
    img: options.img,
    rating_key: options.ratingKey,
    width: options.width,
    height: options.height,
    opacity: options.opacity,
    background: options.background,
    blur: options.blur,
    fallback: options.fallback,
  })
  const endpoint = useRemoteDevelopmentProxy ? '__pulse/remote/image' : 'pms_image_proxy'
  return `${endpoint}?${query}`
}

export function isRemoteDevelopmentProxyEnabled() {
  return useRemoteDevelopmentProxy
}
