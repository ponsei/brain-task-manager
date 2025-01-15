import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from './components/SessionProvider'
import { authOptions } from './api/auth/config'
import { Analytics } from '@vercel/analytics/react'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="ja">
      <body>
        <SessionProvider session={session}>
          {children}
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  )
}