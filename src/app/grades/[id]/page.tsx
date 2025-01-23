import StudentGradeSummary from "@/components/grades/dash/grade";
import { findSubjectsAndGrades } from "@/db/query/getGradePercet";

export default async function Page({ params }: { params: Promise<{id:string,schoolYear:string}> }) {
    const id =  (await params).id
    
    const grade =await findSubjectsAndGrades(id)


    return (
        <div>
            <StudentGradeSummary studentId={id} name={grade?.name || ''} gradesData={grade?.gradesData || {}}/>
        </div>
    );
}