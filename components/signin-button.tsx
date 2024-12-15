import { signIn } from '@/auth'
import { Button } from './ui/button'

export default function SigninButton() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <Button type="submit">Continue with Google</Button>
    </form>
  )
}
