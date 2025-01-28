import StudentGradeSummary from "@/components/grades/dash/grade";
import { findSubjectsAndGrades } from "@/db/query/getGradePercet";

export default async function Page({ params }: { params: Promise<{id:string,schoolYear:string}> }) {
    const id =  (await params).id
    
    const grade =await findSubjectsAndGrades(id)


    return (
        <div>
            <StudentGradeSummary studentId={id} name={grade?.name || ''} gradesData={grade?.gradesData || {}} lrn={grade?.lrn || '' } year_level={grade.year_level ||""} gender={grade.gender || ""} age={grade.age?.toString() || ""} section={grade.section || ""}/>
        </div>
    );
}