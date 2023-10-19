'use client'

import { signIn , useSession , signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProfileIcon () {
    const {data:session , status} = useSession()
    const router = useRouter()
    if(status === 'authenticated') {
        router.push('/dashboard')
        return (
            <div className="flex items-center gap-4">
                <button onClick={() =>signOut()} type='submit'>Logout</button>
                {<Image src={session?.user?.image} width={40} height={40}  className="rounded-full"/> ||<h1 className="font-bold text-2xl text-white">Guest</h1>}
            </div>
        )
    }

    return (
        <button className="bg-black rounded-full p-1 text-sm" onClick={() => signIn("github")}>GUEST <br/> USER</button>
    )
}