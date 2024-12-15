import SigninButton from '@/components/signin-button'
import { auth } from '../auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  if (session?.user) redirect('/dashboard')

  return (
    <div className="flex w-screen h-screen">
      <div className="bg-black text-white w-full h-full flex flex-col md:flex-row justify-center items-center">
        <div className="md:border-r pr-16 mr-16 border-r-neutral-800 py-8">
          <h1 className="text-lg">
            Welcome to
            <br />
            <span className="text-5xl font-bold">Skill Chronicle</span>
          </h1>
          <p className="pt-8 text-neutral-400">
            Track the progress of skills you have been learning!
          </p>
        </div>
        <div>
          <h1 className="pb-8 text-lg text-center">Sign in to continue</h1>
          <SigninButton />
        </div>
      </div>
    </div>
  )
}
