"use client"
import StudentDashboard from "@/components/dashboard/StudentDashboard"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"


function AdminLayout({children}:Readonly<{children : React.ReactNode}>){
    const {data:session,status} = useSession()
    useEffect(()=>{

        if(status === "loading") return;
        // @ts-ignore
        if(!session){
            redirect("/")
        }
    },[session,status])
    if(status === "loading" || status==="unauthenticated") return <p>Loading...</p>
    return(
        <StudentDashboard>
            {children}
            
        </StudentDashboard>
    )
}

export default AdminLayout