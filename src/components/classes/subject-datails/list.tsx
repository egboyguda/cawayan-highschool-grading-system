import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Student {
  id: string;
  studentId: string;
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
interface GradePercentage {

  performanceTask: number
  writtenWork: number
  quarterlyAssessment: number
}
interface StudentListProps {
  students: Student[]
  selectedGradingPeriod: number
  onAddGrade: (studentId:string) => void
  perCent: GradePercentage
  

  //calculateGradingPeriodAverage: (studentId: string, period: number) => number
}


export function StudentList({ students, selectedGradingPeriod ,onAddGrade,perCent}: StudentListProps) {
  if (students.length === 0) {
    return <p className="text-center text-gray-500 my-4">No students found.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-blue-800">Name</TableHead>
          <TableHead className="text-blue-800">Performance Task  ({perCent.performanceTask})</TableHead>
          <TableHead className="text-blue-800">Written Work ({perCent.writtenWork})</TableHead>
          <TableHead className="text-blue-800">Quarterly Assessment ({perCent.quarterlyAssessment})</TableHead>
          <TableHead className="text-blue-800">Grade</TableHead>
          <TableHead className="text-blue-800">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.grades.map(e=>e.gradingPeriod===selectedGradingPeriod+1 && e.performanceTask)}</TableCell>
            <TableCell>{student.grades.map(e=>e.gradingPeriod ===selectedGradingPeriod+1 && e.writtenWork)}</TableCell>
            <TableCell>{student.grades.map(e=>e.gradingPeriod ===selectedGradingPeriod+1 && e.quarterlyAssess)}</TableCell>
            <TableCell>
  {student.grades
    .filter(e => e.gradingPeriod === selectedGradingPeriod + 1)
    .reduce((total, e) => total + e.performanceTask + e.writtenWork + e.quarterlyAssess, 0)}
</TableCell>
            <TableCell>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAddGrade(student.id)}
                
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

