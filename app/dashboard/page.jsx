'use client'

import InfoUser from "@/components/InfoUser";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
    // const {data:session , status} = useSession()
    // const router = useRouter()
    // if(!session) {
    //     router.push('/')
    // }
    
    return (
        <>
            <InfoUser />
        </>
    )
}