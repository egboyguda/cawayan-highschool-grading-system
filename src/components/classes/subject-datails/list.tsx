import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Student {
  id: string;
  name: string;
  grades: Grade[];
}
interface Grade {
  id: string;
  gradingPeriod: number;
  writtenWork: number;
  quarterlyAssess: number;
  performanceTask: number;
}
interface StudentListProps {
  students: Student[]
  selectedGradingPeriod: number

  calculateGradingPeriodAverage: (studentId: string, period: number) => number
}

export function StudentList({ students, selectedGradingPeriod, calculateGradingPeriodAverage }: StudentListProps) {
  if (students.length === 0) {
    return <p className="text-center text-gray-500 my-4">No students found.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-blue-800">Name</TableHead>
          <TableHead className="text-blue-800">Performance Task</TableHead>
          <TableHead className="text-blue-800">Written Work</TableHead>
          <TableHead className="text-blue-800">Quarterly Assessment</TableHead>
          <TableHead className="text-blue-800">Grade</TableHead>
          <TableHead className="text-blue-800">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.grades.map(e=>e.performanceTask)}</TableCell>
            <TableCell>{student.grades.map(e=>e.writtenWork)}</TableCell>
            <TableCell>{student.grades.map(e=>e.quarterlyAssess)}</TableCell>
            <TableCell>
              {calculateGradingPeriodAverage(student.id, selectedGradingPeriod).toFixed(2)}
            </TableCell>
            <TableCell>
              <Button 
                variant="outline" 
                size="sm"
                
              >
                Add Grade
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

