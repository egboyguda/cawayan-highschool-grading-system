import GradesPage from "@/components/grades/dash";
import { getAllStudents } from "@/db/query/getStudent";

export default async function Page() {
    const students = await getAllStudents();
    return (
        <div>
   <GradesPage studentData={students ||[]}/>
        </div>
    );
}