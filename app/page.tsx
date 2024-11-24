import SigninButton from '@/components/signin-button'
import SignoutButton from '@/components/signout-button'
import { auth } from '../auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  if (session?.user) redirect('/dashboard')

  return (
    <div>
      <SigninButton />
    </div>
  )
}
