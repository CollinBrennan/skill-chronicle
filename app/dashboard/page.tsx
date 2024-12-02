import { auth } from '@/auth'
import SignoutButton from '@/components/signout-button'
import Timer from '@/components/timer'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()

  return (
    <div>
      <Timer />
    </div>
  )
}
