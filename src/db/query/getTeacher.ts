
import {db} from "@/db";
import { verifySession } from "@/lib/dal";

interface Teacher {
    id: number;
    name: string;
    licenseNumber: string;
    rank: string;
    major: string;
  }
  
  interface TeacherListProps {
    initialTeachers: Teacher[];
  }
  
  export const getAllTeachers = async (): Promise<Teacher[] | null> => {
    // Verify session
    const session = await verifySession();
    if (!session) {
      return null;
    }
  
    try {
      // Fetch teachers from the database
      const teachers = await db.teacher.findMany({
        select: {
          id: true,
          name: true,
          licenseNum: true, // Correct the database field to match the schema if needed
          rank: true,
          major: true,
        },
      });
  
      // Map the response to match the `Teacher` interface
      return teachers.map((teacher) => ({
        id: teacher.id,
        name: teacher.name,
        licenseNumber: teacher.licenseNum, // Map `licenseNum` to `licenseNumber`
        rank: teacher.rank,
        major: teacher.major,
      }));
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return [];
    }
  };
  

export const getTeacherCount = async () => {
    const session = await verifySession();
    if (!session) return null;
  
    try {
      const teacherCount = await db.teacher.count();
      return teacherCount;
    } catch (error) {
      console.error('Error fetching teacher count:', error);
      return 0;
    }
  }
