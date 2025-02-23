"use client"
import Dashboard from "@/components/dashboard/Dashboard"
import { Role } from "@/database/models/user.schema";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";



function AdminLayout({children}:Readonly<{children : React.ReactNode}>){
    const { data: session, status } = useSession();
 
    useEffect(() => {
        if (status === "loading") return;
        //@ts-ignore
        if (session === undefined || session.user.role !== "admin" ) {
           redirect("/"); // Redirect to home page if not admin
        }
    }, [session, status]);

    if (status === "loading") return <p>Loading...</p>;

    return(
        <Dashboard>
            {children}
            
        </Dashboard>
    )
}

export default AdminLayout