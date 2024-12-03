import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import React from 'react'

export function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-900">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}
