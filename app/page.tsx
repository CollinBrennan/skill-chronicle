import SigninButton from '@/components/signin-button'
import SignoutButton from '@/components/signout-button'
import { auth } from '../auth'

export default async function Home() {
  const session = await auth()

  return <div>{!session?.user ? <SigninButton /> : <SignoutButton />}</div>
}
