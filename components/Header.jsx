'use client'

import Image from "next/image"
import { useState } from "react"
import form from '@/public/form.jpg'
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
export default function Header () {
    const router = useRouter()
    const [data , setData] = useState({
        name : '',
        email : '',
        password : '',
    })    
    const [err , setErr] = useState('')
    const handlSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/register',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })
            if(response.ok) {
                const form = e.target
                form.reset()
                router.push('./login')
            }
            return new Response('send data success' , {status : 400})
        } catch (error) {
            return new Response('send data is failed' , {status : 501})
        }
    }

    return (
        <div className="grid grid-cols-2 h-screen pt-12">
            <div className="flex flex-col my-10">
                <form className="flex flex-col gap-6 items-center " onSubmit={handlSubmit}>
                    <input type="text" placeholder="Name" value={data.name} onChange={e => setData({...data , name :e.target.value})} className="focus:outline-none focus:border-teal-500 border-b-2 border-teal-300 rounded-md p-4 w-2/3 shadow-2xl bg-teal-200" required />
                    <input type="email" placeholder="Email" value={data.email} onChange={e => setData({...data , email :e.target.value})} className="focus:outline-none focus:border-teal-500 border-b-2 border-teal-300 rounded-md p-4 w-2/3 shadow-2xl bg-teal-200" required  />
                    <input type="password" placeholder="Password" value={data.password} onChange={e => setData({...data , password :e.target.value})} className="focus:outline-none focus:border-teal-500 border-b-2 border-teal-300 rounded-md p-4 w-2/3 shadow-2xl bg-teal-200" required  />
                    {err && (<p className="font-bold text-lg text-white bg-teal-400 rounded-lg p-3">{err}</p>)}
                    <button type="submit" className="bg-teal-400 rounded-md shadow-xl w-2/4 p-3 hover:bg-teal-500">sign up</button>
                </form>
                <button className="bg-black text-white rounded-lg w-2/4 p-3 mx-auto my-3" onClick={() => signIn('github')}>sign with GIT HUB</button>
                <Link href='/login' className="text-teal-600 text-md text-center">Have An Account <span className="underline">Login</span></Link>
            </div>    
                <div className="object-contain flex">
                    <Image src={form} />
                </div>
        </div>
    )
}