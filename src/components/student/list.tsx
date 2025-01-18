import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Student {
  id: number
  name: string
  grade: string
}

interface StudentListProps {
  students: Student[]
}

const StudentList = ({ students }: StudentListProps) => {
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
              <TableHead className="text-blue-800">Grade</TableHead>
              <TableHead className="text-blue-800">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>
                  <Link href={`/students/${student.id}/grading`}>
                    <Button variant="outline" size="sm">View Grades</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Export the StudentList component using the default export syntax
export default StudentList