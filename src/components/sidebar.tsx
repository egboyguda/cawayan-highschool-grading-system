import Link from 'next/link'
import { Home, Users, BookOpen, Calendar, Settings, GraduationCap } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="bg-blue-700 p-6">
        <h1 className="text-2xl font-bold text-white">School Manager</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/students" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <Users size={20} />
                <span>Students</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/teachers" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <Users size={20} />
                <span>Teachers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/subject" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <BookOpen size={20} />
                <span>Subject</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/grades" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <GraduationCap size={20} />
                <span>Grades</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/schedule" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <Calendar size={20} />
                <span>Schedule</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar

