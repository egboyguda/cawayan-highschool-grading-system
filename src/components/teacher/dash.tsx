'use client'
import AddTeacherForm from '@/components/teacher/add'
import TeacherList from '@/components/teacher/list'
import TeacherSearch from '@/components/teacher/search'
import TeacherStatistics from '@/components/teacher/statistic'
import { useState } from 'react'


interface Teacher {
  id: string
  name: string
  licenseNumber: string
  rank: string
  major: string,
  teacherId:string
}
interface TeacherListProps {
    initialTeachers: Teacher[]
}



const calculateStatistics = (teachers: Teacher[]=[]) => {
  const totalTeachers = teachers.length
  const rankCounts = teachers.reduce((acc, teacher) => {
    acc[teacher.rank] = (acc[teacher.rank] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    totalTeachers,
    rankCounts
  }
}

export default function TeachersPage({ initialTeachers}: TeacherListProps) {
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers)    
  const [searchTerm, setSearchTerm] = useState('')
  const statistics = calculateStatistics(initialTeachers)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">Teachers</h1>
        <AddTeacherForm />
      </div>
      <TeacherStatistics {...statistics} />
      <TeacherSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TeacherList initialTeachers={initialTeachers} searchTerm={searchTerm} />
    </div>
  )
}

