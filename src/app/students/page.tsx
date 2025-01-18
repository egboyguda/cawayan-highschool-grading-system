import StudentsPage from "@/components/student/dash";
import { getAllStudents } from "@/db/query/getStudent";



export default async function Page() {

  const students= await getAllStudents();
  return (
   <StudentsPage students={students||[] }/>
  )
}

