"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Student {
  id: string
  studentId:string
  name: string
}

interface StudentGradeListProps {
  students: Student[]
  onViewGrades: (studentId: string) => void
}

export function StudentGradeList({ students, onViewGrades }: StudentGradeListProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-blue-900">Student List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-800">Name</TableHead>
              <TableHead className="text-blue-800">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => onViewGrades(student.id)}>
                    View Grades
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

