import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface SidebarItemProps {
  href: string
  icon: LucideIcon
  label: string
}

const SidebarItem = ({ href, icon: Icon, label }: SidebarItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={href} className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50">
          <Icon size={20} />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default SidebarItem

