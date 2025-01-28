import { Home, Users, BookOpen, Calendar, Settings, GraduationCap } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarRail } from "@/components/ui/sidebar"
import SidebarItem from "./sidebarItem"

import Image from "next/image"
const sidebarItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/students", icon: Users, label: "Students" },
  { href: "/teachers", icon: Users, label: "Teachers" },
  { href: "/class", icon: BookOpen, label: "Class" },
  { href: "/subject", icon: BookOpen, label: "Subject" },
  { href: "/grades", icon: GraduationCap, label: "Grades" },
  { href: "/schedule", icon: Calendar, label: "Schedule" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

const AppSidebar = () => {
  return (
    <Sidebar className="transition-all duration-300 ease-in-out">
      <SidebarHeader className="bg-blue-700 p-4 flex items-center space-x-2 transition-all duration-300 ease-in-out">
      
        <Image
          src="/Picture1.png"
          alt="School Logo"
          className="w-20 h-20 rounded-full flex-shrink-0"
          width={100}
          height={100}
        />
        <h1 className="text-xl font-bold text-white overflow-hidden transition-all duration-300 ease-in-out">
          School Manager
        </h1>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar

