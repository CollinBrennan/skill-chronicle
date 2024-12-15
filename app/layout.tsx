import type { Metadata } from 'next'
import './globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SigninButton from '@/components/signin-button'

export const metadata: Metadata = {
  title: 'Skill Chronicle',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          {session && <AppSidebar session={session} />}
          <main className="w-full">
            {session && <SidebarTrigger />}
            <div className="flex justify-center w-full">
              <div className="max-w-screen-xl w-full">{children}</div>
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
