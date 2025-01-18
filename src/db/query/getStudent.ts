import { verifySession } from "@/lib/dal"
import {db} from '@/db'


export const getAllStudents = async () => {
const session = await verifySession();
if (!session) return null;

    try {
        const students = await db.student.findMany({
            select: {
              id: true,
              studentId: true,
              firstName: true,
              lastName: true,
            },
          });
      
          // Format the result to include full name
          const formattedStudents = students.map(student => ({
            id: student.id,
            studentId: student.studentId,
            name: `${student.firstName} ${student.lastName}`,
          }));
         // console.log('formattedStudents:', formattedStudents);
          return formattedStudents;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}
export const getStudentCount = async () => {
    const session = await verifySession();
    if (!session) return null;
  
    try {
      const studentCount = await db.student.count();
      return studentCount;
    } catch (error) {
      console.error('Error fetching student count:', error);
      return 0;
    }
}