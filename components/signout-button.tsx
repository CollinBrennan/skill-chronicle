import { signOut } from '@/auth'

export default function SignoutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type="submit" className="h-full w-full text-left">
        Sign out
      </button>
    </form>
  )
}
