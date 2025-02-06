import Dashboard from "@/components/dashboard/Dashboard"


function AdminLayout({children}:Readonly<{children : React.ReactNode}>){
    return(
        <Dashboard>
            {children}
            
        </Dashboard>
    )
}

export default AdminLayout