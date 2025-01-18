import StatCard from '@/components/statCart'
import { Users, BookOpen, Calendar } from 'lucide-react'


const stats = [
  { title: "Total Students", value: 1234, icon: Users },
  { title: "Total Classes", value: 56, icon: BookOpen },
  { title: "Upcoming Events", value: 3, icon: Calendar },
]



export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    
    </div>
  )
}

