import { Users, BookOpen, GraduationCap } from 'lucide-react'
import StatCard from '@/components/statCart'
import StudentEnrollmentChart from '@/components/dashboard/chart'
import QuickLinks from '@/components/dashboard/link'

const stats = [
  { 
    title: "Total Students", 
    value: 1234, 
    icon: Users
  },
  { 
    title: "Total Classes", 
    value: 56, 
    icon: BookOpen
  },
  { 
    title: "Total Teachers", 
    value: 78, 
    icon: GraduationCap
  },
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StudentEnrollmentChart />
        <QuickLinks />
      </div>
    </div>
  )
}

