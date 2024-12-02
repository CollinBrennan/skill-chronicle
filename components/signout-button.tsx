import { signOut } from '@/auth'
import { redirect } from 'next/navigation'

export default function SignoutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  )
}
