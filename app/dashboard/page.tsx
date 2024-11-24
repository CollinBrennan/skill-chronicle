import { auth } from '@/auth'
import SignoutButton from '@/components/signout-button'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) redirect('/')

  return (
    <div>
      Dashboard Hello, {session?.user.name}
      <SignoutButton />
    </div>
  )
}
