import { Users, BookOpen, GraduationCap } from 'lucide-react'
import StatCard from '@/components/statCart'
import StudentEnrollmentChart from '@/components/dashboard/chart'
import QuickLinks from '@/components/dashboard/link'
import { getStudentCount } from '@/db/query/getStudent'
import { getTeacherCount } from '@/db/query/getTeacher'

const stats = [
        
  { 
    title: "Total Classes", 
    value: 56, 
    icon: BookOpen
  },
 
]

export default async function Dashboard() {
  const studentCount =await getStudentCount()
  const teachers = await getTeacherCount()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Students" value={studentCount|| 0} icon={Users} />
        <StatCard title="Total Teachers" value={teachers || 0} icon={GraduationCap} />
       
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
      </div>
    </div>
  )
}

