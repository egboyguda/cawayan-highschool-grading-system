'use client'

import { useState } from 'react'



import StudentSearch from '@/components/student/search'
import StudentList from '@/components/student/list'
import AddStudentForm from '@/components/student/add'

interface Student {
  id: number
  name: string
  grade: string
}

const initialStudents = [
  { id: 1, name: "Alice Johnson", grade: "10th" },
  { id: 2, name: "Bob Smith", grade: "11th" },
  { id: 3, name: "Charlie Brown", grade: "9th" },
  { id: 4, name: "Diana Ross", grade: "12th" },
]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const id = students.length + 1
    setStudents([...students, { id, ...newStudent }])
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold text-blue-900">Students</h1>
        <AddStudentForm onAddStudent={handleAddStudent} />
      </div>
      <StudentSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <StudentList students={filteredStudents} />
    </div>
  )
}

