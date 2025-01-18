
import TeachersPage from '@/components/teacher/dash'
import { getAllTeachers } from '@/db/query/getTeacher'


export default async function Page() {
  const teachers = await getAllTeachers()
  return (
    <TeachersPage initialTeachers={teachers }/>
  )
}

