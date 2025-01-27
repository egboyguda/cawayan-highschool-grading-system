"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import AddClassForm from "./form"
import ClassList from "./list"

interface Class {
    adviser:string,
    number_of_students:number,
    section:string,
    classId:string,
    id:string
    school_year:string,
    students: {
        name: string;
        firstName: string;
        middleName: string | null;
        lastName: string;
        studentId: string;
        gender: string | null;
        birthdata: Date | null;
    }[];
    year_level:string
}

// const initialClasses: Class[] = [
//   {
//     id: 1,
//     section: "A",
//     adviser: "John Doe",
//     teacher: "Jane Smith",
//     schoolYear: "2023-2024",
//     students: 25,
//     gradeYear: "7",
//   },
//   {
//     id: 2,
//     section: "B",
//     adviser: "Alice Johnson",
//     teacher: "Bob Brown",
//     schoolYear: "2023-2024",
//     students: 30,
//     gradeYear: "8",
//   },
//   {
//     id: 3,
//     section: "A",
//     adviser: "Charlie Davis",
//     teacher: "Diana Evans",
//     schoolYear: "2023-2024",
//     students: 22,
//     gradeYear: "9",
//   },
//   {
//     id: 4,
//     section: "C",
//     adviser: "Eve Wilson",
//     teacher: "Frank Thomas",
//     schoolYear: "2023-2024",
//     students: 28,
//     gradeYear: "10",
//   },
// ]
interface ClassesProps{
    initialClasses:Class[]
}

export default function Classes({initialClasses}:ClassesProps){ {
  const [classes, setClasses] = useState(initialClasses)
  const [searchTerm, setSearchTerm] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [gradeYearFilter, setGradeYearFilter] = useState("")
  const [isOpen, setIsOpen] = useState(false)

//   const handleAddClass = (newClass: Omit<Class, "id">) => {
//     const id = classes.length + 1
//     setClasses([...classes, { id, ...newClass }])
//     setIsOpen(false)
//   }

  const filteredClasses = classes.filter(
    (class_) =>
      (class_.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        class_.adviser.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (yearFilter === "" || class_.school_year === yearFilter) &&
      (gradeYearFilter === "" || class_.year_level === gradeYearFilter)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">Classes</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add Class</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] bg-white">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Enter the details of the new class here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <AddClassForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search classes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="2023-2024">2023-2024</SelectItem>
            <SelectItem value="2024-2025">2024-2025</SelectItem>
          </SelectContent>
        </Select>
        <Select value={gradeYearFilter} onValueChange={setGradeYearFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="7">Grade 7</SelectItem>
            <SelectItem value="8">Grade 8</SelectItem>
            <SelectItem value="9">Grade 9</SelectItem>
            <SelectItem value="10">Grade 10</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ClassList initialClasses={filteredClasses} searchTerm={searchTerm} />
    </div>
  )
}
}


