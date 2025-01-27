'use server';

import { verifySession } from "@/lib/dal";
import { db } from "..";

export const getAllClass = async () => {
    const session = await verifySession();
    if (!session) return null;
  
    try {
      const classes = await db.classroom.findMany({
        select: {
          id: true,
          section: true,
          adviser: {
            select: {
              name: true,
            },
          },
          students: {
            select: {
              studentId: true,
              firstName: true,
              middleName: true,
              lastName: true,
              birthdata: true,
              gender: true,
            },
          },
          classId: true,
          school_year: true,
          year_level: true,
          _count: {
            select: {
              students: true,
            },
          },
        },
      });
  
      // Transform data to exclude `_count` and format students' full names
      const formattedClasses = classes.map(({ _count, adviser, students, ...classroom }) => ({
        ...classroom,
        adviser: adviser?.name || '', // Flatten adviser to just `name`
        number_of_students: _count.students, // Add this field instead of `_count`
        students: students.map((student) => ({
          ...student,
          name: `${student.firstName} ${student.middleName} ${student.lastName}`.trim(), // Concatenate full name
        })),
      }));
  
      return formattedClasses;
    } catch (error) {
      console.error('Error fetching classes:', error);
      return [];
    }
  };
  

  export interface Student {
    studentId: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    birthdata: Date | null;
    gender: string | null;
    name: string; // Full name generated from first, middle, and last names
  }
  
  export interface ClassData {
    id: string;
    section: string;
    adviser: string; // Adviser name flattened
    students: Student[];
    classId: string;
  }
  
  export const getClass = async (id: string): Promise<ClassData | null> => {
    const session = await verifySession();
    if (!session) return null;
  
    try {
      const classroom = await db.classroom.findUnique({
        where: { id },
        select: {
          id: true,
          section: true,
          adviser: {
            select: {
              name: true,
            },
          },
          students: {
            select: {
              studentId: true,
              firstName: true,
              middleName: true,
              lastName: true,
              birthdata: true,
              gender: true,
            },
          },
          classId: true,
        },
      });
  
      if (!classroom) {
        return null; // Return null if no classroom is found
      }
  
      // Transform the response data
      const formattedClassroom: ClassData = {
        ...classroom,
        adviser: classroom.adviser?.name || '', // Flatten adviser to just the name
        students: classroom.students.map((student) => ({
          ...student,
          name: `${student.firstName} ${student.middleName || ''} ${student.lastName}`.trim(), // Concatenate full name
        })),
      };
  
      return formattedClassroom;
    } catch (error) {
      console.error('Error fetching class:', error);
      return null; // Return null in case of an error
    }
  };
  