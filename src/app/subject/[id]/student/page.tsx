
import { ClassStudents } from "@/components/classes/subject-datails/classpage";
import { getAllGradesPercent } from "@/db/query/getGradePercet";
import { getSubject } from "@/db/query/getSubject";

export default async function ClassStudentsPage({params,}:{
  params:Promise<{id:string}>
}) {
  const id=(await params).id 
  const subject = await getSubject(id)
  const gradePercentage= await getAllGradesPercent()
  return (
    <ClassStudents subject={subject || null } gradePercentage={gradePercentage || []}/>
  );
  }



