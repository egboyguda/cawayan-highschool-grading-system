
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteStudentAction } from "@/action/delAndEditAction"
import EditForm from "./edit"

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
              <TableHead className="text-blue-800">LRN</TableHead>
              <TableHead className="text-blue-800">Name</TableHead>
              <TableHead className="text-blue-800">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students && students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.studentId}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
       
                    <Button variant="destructive" className='bg-red-500 text-white'  onClick={async()=>{
                      await deleteStudentAction(student.studentId)
                      window.location.reload()
                    }} size="sm">Delete</Button>
                    <EditForm student={student}/>
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