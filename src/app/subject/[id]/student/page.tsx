
import { ClassStudents } from "@/components/classes/subject-datails/classpage";
import { getSubject } from "@/db/query/getSubject";

export default async function ClassStudentsPage({params,}:{
  params:Promise<{id:string}>
}) {
  const id=(await params).id 
  const subject = await getSubject(id)
  return (
    <ClassStudents subject={subject || null} />
  );
  }



