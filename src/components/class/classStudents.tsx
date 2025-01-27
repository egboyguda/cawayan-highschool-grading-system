"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StudentList } from "./listStudents";
import { StudentDetailsModal } from "./modal";
import { AddStudentForm } from "./addStudent";

interface Student {
  studentId: string;
  name: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: string | null;
  birthdata: Date | null;

}

interface ClassData {
  adviser: string | null;
  students: Student[];
  classId: string;
  section: string;
  id: string;
}

interface ClassStudentsProps {
  classes: ClassData;
}

export function ClassStudents({ classes }: ClassStudentsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Combine student names for search purposes
  const formattedStudents = classes.students.map((student) => ({
    ...student,
    name: `${student.firstName} ${student.middleName || ""} ${student.lastName}`.trim(),
  }));

  const filteredStudents = formattedStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };
  
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">
        Class Students - Section {classes.section.toUpperCase()}
        
      </h1>
      <p className="text-lg text-gray-600">Adviser: {classes.adviser?.toUpperCase() || "N/A"}</p>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <AddStudentForm classId={classes.id} />
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-blue-900">Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentList students={filteredStudents} onViewDetails={handleOpenModal} />
        </CardContent>
      </Card>
      {selectedStudent && (
        <StudentDetailsModal student={selectedStudent} onClose={handleCloseModal} />
      )}
    </div>
  );
}
