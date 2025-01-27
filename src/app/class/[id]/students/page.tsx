import { ClassStudents } from "@/components/class/classStudents";
import { getClass } from "@/db/query/getClass";

export default async function ClassStudentsPage({params}:{params:Promise<{id:string}>}) {
    const id = (await params).id
    const classData = await getClass(id)

    if (!classData ) {
        return <p>Class data not found or unavailable.</p>;
      }
      
  return <ClassStudents classes={classData} />
}

