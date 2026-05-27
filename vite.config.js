import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env', '')

  const proxyTarget = env.API_PROXY_TARGET || 'http://localhost:8080'

  return {
    plugins: [react()],
    envDir: 'env',
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Vite's `headers: {}` option does not reliably attach to outbound
              // requests. ngrok ERR_NGROK_6024 (HTML on GET) needs these on proxyReq.
              proxyReq.setHeader('ngrok-skip-browser-warning', '69420')
              proxyReq.setHeader('User-Agent', 'SchoolCRM-Vite-Proxy/1.0')
            })
          },
        },
      },
    },
  }
})
