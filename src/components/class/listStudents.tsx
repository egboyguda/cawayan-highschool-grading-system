import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Student {
    studentId: string;
    name: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    gender: string | null;
    birthdata: Date | null;
}

interface StudentListProps {
  students: Student[]
  onViewDetails: (student: Student) => void
}

export function StudentList({ students, onViewDetails }: StudentListProps) {
  if (students.length === 0) {
    return <p className="text-center text-gray-500 my-4">No students found.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-blue-800">Name</TableHead>
          <TableHead className="text-blue-800">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.studentId}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => onViewDetails(student)}>
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

