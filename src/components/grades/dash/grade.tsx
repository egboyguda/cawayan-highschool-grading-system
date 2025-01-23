'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock student data
const students = [
  { id: '1', name: "Alice Johnson" },
  { id: '2', name: "Bob Smith" },
  { id: '3', name: "Charlie Brown" },
  { id: '4', name: "Diana Ross" },
]

// Mock grade data
const mockGrades = {
  '1': {
    "2023-2024": {
      "Math": [85, 88, 90, 92],
      "Science": [78, 82, 85, 88],
      "English": [92, 90, 88, 95],
      "History": [88, 85, 90, 92]
    }
  },
  // ... add mock data for other students
}
interface StudentGradeSummaryProps {
studentId: string;
name:string
gradesData: Record<string, Record<string, number[]>>;
}

export default function StudentGradeSummary( {studentId,name,gradesData}: StudentGradeSummaryProps) {
  const params = useParams()
  const searchParams = useSearchParams()
  
  const schoolYear = searchParams.get('schoolYear')
 // const [ setStudent] = useState<{ id: string; name: string } | null>(null)
  const [grades, setGrades] = useState<Record<string, number[]>>({})

  useEffect(() => {
    
    if ( schoolYear) {
      setGrades(gradesData?.[schoolYear] || {})
    }
  }, [ schoolYear])

  if ( !schoolYear) {
    return <div>Loading...</div>
  }

  const calculateAverage = (grades: number[]) => {
    const sum = grades.reduce((a, b) => a + b, 0)
    return (sum / grades.length).toFixed(2)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Grade Summary for {name}</h1>
      <h2 className="text-xl font-semibold text-blue-800">School Year: {schoolYear}</h2>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-blue-900">Grades by Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-800">Subject</TableHead>
                <TableHead className="text-blue-800">1st Grading</TableHead>
                <TableHead className="text-blue-800">2nd Grading</TableHead>
                <TableHead className="text-blue-800">3rd Grading</TableHead>
                <TableHead className="text-blue-800">4th Grading</TableHead>
                <TableHead className="text-blue-800">Average</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(grades).map(([subject, gradesList]) => (
                <TableRow key={subject}>
                  <TableCell className="font-medium">{subject}</TableCell>
                  {gradesList.map((grade, index) => (
                    <TableCell key={index}>{grade}</TableCell>
                  ))}
                  <TableCell className="font-bold">{calculateAverage(gradesList)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-blue-900">Overall Average</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-blue-900">
            {calculateAverage(Object.values(grades).flatMap(g => g))}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

