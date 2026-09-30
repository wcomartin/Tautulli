import { defineConfig, loadEnv, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function remoteProxyPath(path: string, command?: string, apiKey?: string) {
  const url = new URL(path, 'http://pulse.local')
  if (command) url.searchParams.set('cmd', command)
  if (apiKey) url.searchParams.set('apikey', apiKey)
  return `/api/v2?${url.searchParams.toString()}`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const remoteUrl = env.TAUTULLI_REMOTE_URL ? new URL(env.TAUTULLI_REMOTE_URL) : undefined
  const apiKey = env.TAUTULLI_API_KEY
  const remoteBasePath = remoteUrl?.pathname.replace(/\/$/, '') ?? ''
  const remoteProxy = remoteUrl && apiKey
    ? {
        target: remoteUrl.origin,
        changeOrigin: true,
        secure: env.TAUTULLI_REMOTE_INSECURE !== 'true',
      }
    : undefined

  const proxy: Record<string, string | ProxyOptions> = {}
  if (remoteProxy) {
    proxy['/__pulse/remote/api'] = {
      ...remoteProxy,
      rewrite: (path) => `${remoteBasePath}${remoteProxyPath(path, undefined, apiKey)}`,
    }
    proxy['/__pulse/remote/image'] = {
      ...remoteProxy,
      rewrite: (path) => `${remoteBasePath}${remoteProxyPath(path, 'pms_image_proxy', apiKey)}`,
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    base: './',
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      proxy,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
