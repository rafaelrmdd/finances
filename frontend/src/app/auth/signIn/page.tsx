'use client'

import { signIn, useSession } from "next-auth/react"

export default function SignIn() {
    const { data: session } = useSession();

    console.log('session: ', session);

  return (
    <div>
       <button onClick={() => signIn('github')}>
            Sign in with github
        </button>

        <h1>is signed: {session?.user?.email}</h1>
    </div>
  )
}