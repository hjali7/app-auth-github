'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function LoginForm () {
        const router = useRouter()
        const [data , setData] = useState({
            email: "",
            password : "" ,
        })
    
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await signIn('credentials',{
                ...data , 
                redirect : false
            })
            if(response.error) {
                return Response.json({message : 'connection lost'} , {status : 501})
            }

            router.push('/dashboard')
            
        } catch (error) {
            alert('sometime went wrong ... please try again')
        }

    }

    return (
        <div className="grid place-items-center h-screen ">
            <div className="flex flex-col gap-6 border-2 p-10 rounded-md border-teal-400 shadow-xl">
                <h1 className="font-bold text-2xl">Enter the details</h1>
                <form className="flex flex-col  items-start gap-4 " onSubmit={handleSubmit}>
                    <input onChange={e => setData({...data , email : e.target.value})} value={data.email} type="email" placeholder="Email"  className="border-2 p-3"/>
                    <input onChange={e => setData({...data , password :e.target.value})} value={data.password} type="password" placeholder="Password" className="border-2 p-3" />
                    <button type="submit" className="text-white bg-teal-600 text-center w-full mt-4 p-2 rounded-md cursor-pointer">Login</button>
                    <p className="text-right text-sm">Don't have an account?<Link href='/' className="underline">Register</Link></p>
                </form>
            </div>
        </div>
    )
}