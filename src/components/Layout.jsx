import { Outlet } from "react-router-dom"
import SidebarPage from "../pages/admin/Sidebar"

function LayoutPage() {
  return (
        <div className="flex">
        <SidebarPage />
        <div className="h-screen flex-1 p-7">
          <Outlet />
        </div>
    </div>
  )
}

export default LayoutPage