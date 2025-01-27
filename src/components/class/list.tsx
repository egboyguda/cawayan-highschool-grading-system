"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Class {
    adviser:string,
    number_of_students:number,
    section:string,
    classId:string,
    id:string
    school_year:string,
    year_level:string
}

interface ClassListProps {
  initialClasses: Class[]
  searchTerm: string
}

const ClassList: React.FC<ClassListProps> = ({ initialClasses, searchTerm }) => {
  const [classes, setClasses] = useState(initialClasses)

  useEffect(() => {
    const filteredClasses = initialClasses.filter(
      (class_) =>
        class_.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        class_.adviser.toLowerCase().includes(searchTerm.toLowerCase()) ||
       
        class_.school_year.includes(searchTerm) ||
        class_.year_level.includes(searchTerm),
    )
    setClasses(filteredClasses)
  }, [searchTerm, initialClasses])

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-blue-900">Class List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-800">ID</TableHead>
              <TableHead className="text-blue-800">Section</TableHead>
              <TableHead className="text-blue-800">Adviser</TableHead>
         
              <TableHead className="text-blue-800">School Year</TableHead>
              <TableHead className="text-blue-800">Students</TableHead>
              <TableHead className="text-blue-800">Grade Year</TableHead>
              <TableHead className="text-blue-800">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((class_) => (
              <TableRow key={class_.id}>
                <TableCell>{class_.classId}</TableCell>
                <TableCell>{class_.section}</TableCell>
                <TableCell>{class_.adviser}</TableCell>
        
                <TableCell>{class_.school_year}</TableCell>
                <TableCell>{class_.number_of_students}</TableCell>
                <TableCell>{class_.year_level}</TableCell>
                <TableCell>
                  <Link href={`/class/${class_.id}/students`}>
                    <Button variant="outline" size="sm">
                      View Students
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ClassList

