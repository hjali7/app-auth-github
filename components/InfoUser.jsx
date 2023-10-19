'use client'
import Image from "next/image";
import { signOut , useSession } from "next-auth/react";

export default function InfoUser() {
    const {data:session , status } = useSession()
    console.log(session?.user?.name)
    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col items-center gap-8 border border-teal-200 rounded-md p-12 bg-slate-400 shadow-xl">
                <h1 className="font-bold text-lg">{session?.user?.name}</h1>
                <p className="text-lg text-white">{session?.user?.email}</p>
                {(<><Image width={40} height={40} src={session?.user?.image} />
                <button onClick={() => signOut()} className="rounded-md bg-teal-400 px-6 py-2 mt-6">sign out</button></>) || null}
            </div>
        </div>
    )
}