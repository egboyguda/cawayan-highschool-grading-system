import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  return (
    <Card className="bg-white border-l-4 border-blue-500">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-blue-800">{title}</CardTitle>
        <Icon className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-900">{value}</div>
      </CardContent>
    </Card>
  )
}

export default StatCard

