import Dashboard from "@/components/dashboard/Dashboard"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"


async function AdminLayout({children}:Readonly<{children : React.ReactNode}>){
    const session = await getServerSession(authOptions)
    console.log(session,"Session")
    return(
        <Dashboard>
            {children}
            
        </Dashboard>
    )
}

export default AdminLayout