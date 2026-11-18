import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@/contexts/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registered:', registration.scope)
          })
          .catch((error) => {
            console.log('[PWA] Service Worker registration failed:', error)
          })
      })
    }
  }, [])

  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  )
}
