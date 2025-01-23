"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { GradeSearchForm } from "./search"
import { StudentGradeList } from "./list"


// Mock student data
// const students = [
//   { id: 1, name: "Alice Johnson" },
//   { id: 2, name: "Bob Smith" },
//   { id: 3, name: "Charlie Brown" },
//   { id: 4, name: "Diana Ross" },
// ]
interface student{
    id: string, 
    name: string
    studentId: string
}

 interface GradePageProps{
  studentData:student[]

 }

export default function GradesPage({ studentData }: GradePageProps) {
  const router = useRouter()
  const [schoolYear, setSchoolYear] = useState("")
  const [filteredStudents, setFilteredStudents] = useState(studentData)

  const handleSearch = useCallback((year: string, searchTerm: string) => {
    setSchoolYear(year)
    const filtered = filteredStudents.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredStudents(filtered)
  }, [])

  const handleViewGrades = (studentId: string) => {
    if (schoolYear) {
      router.push(`/grades/${studentId}?schoolYear=${schoolYear}`)
    } else {
      alert("Please select a school year")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Grades</h1>
      <GradeSearchForm onSearch={handleSearch} />
      <StudentGradeList students={filteredStudents} onViewGrades={handleViewGrades} />
    </div>
  )
}

