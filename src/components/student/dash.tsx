'use client'

import { useState } from 'react'



import StudentSearch from '@/components/student/search'
import StudentList from '@/components/student/list'
import AddStudentForm from '@/components/student/add'

interface Student {
  id: string
  studentId: string
  name: string
  firstName: string
  middleName: string | null
  lastName: string
  gender: string | null
  birthdata: Date | null
  year_level: string | null

}
interface StudentListProps {
    students: Student[]
    }



export default function StudentsPage({ students: initialStudents }: StudentListProps) {
  const [students] = useState<Student[]>(initialStudents)
  const [searchTerm, setSearchTerm] = useState('')

  // const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
  //   const id = (students.length + 1).toString()
  //   setStudents([...students, { id, ...newStudent }])
  // }
  console.log(students)

  const filteredStudents = students && students.filter(student => 
    student && student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold text-blue-900">Students</h1>
        <AddStudentForm  />
      </div>
      <StudentSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <StudentList students={filteredStudents} />
    </div>
  )
}

