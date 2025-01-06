import '~/css/global.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { siteURL } from '~/lib/constants'

import { AppHooks } from './app-hooks'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: {
    default: 'matcaps | Tal Hayut',
    template: '%s | Tal Hayut'
  },
  metadataBase: siteURL,
  description: `Exploring matcaps textures with threejs`,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    }
  ],
  manifest: '/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'Matcaps | Tal Hayut',
    creator: 'talhayut',
    siteId: 'matcaps'
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          {children}
          <AppHooks />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
