'use client'
import { useEffect } from 'react'
export default function SuppressExtensionErrors() {
  useEffect(() => {
    const shouldIgnore = (msg: string) =>
      msg.includes('MetaMask') ||
      msg.includes('Failed to connect') ||
      msg.includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn')

    const onError = (e: ErrorEvent) => {
      if (shouldIgnore(e.message || '')) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    const onRejection = (e: PromiseRejectionEvent) => {
      const msg = (e.reason as unknown as { message?: string })?.message || String(e.reason || '')
      if (shouldIgnore(msg)) {
        e.preventDefault()
      }
    }
    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)
    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])
  return null
}
