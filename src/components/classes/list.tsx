'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Subject {
  id: string
  name: string
  teacherName: string
  year_level: string
  subjectId: string
  school_year: string
}
interface ClassListProps {
  initialClasses: Subject[]
  searchTerm: string
}

const ClassList: React.FC<ClassListProps> = ({ initialClasses, searchTerm }) => {
  const [classes, setClasses] = useState(initialClasses)

  useEffect(() => {
    const filteredClasses = initialClasses && initialClasses.filter(class_ =>
      class_.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      class_.subjectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      class_.school_year.toLowerCase().includes(searchTerm.toLowerCase()) ||
      class_.teacherName.toLowerCase().includes(searchTerm.toLowerCase())

    )
    setClasses(filteredClasses)
  }, [searchTerm, initialClasses])

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-blue-900">Subject List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-800">Subject ID</TableHead>
              <TableHead className="text-blue-800">Subject</TableHead>
              <TableHead className="text-blue-800">Teacher</TableHead>
              <TableHead className="text-blue-800">Grade</TableHead>
              <TableHead className="text-blue-800">School Year</TableHead>
              <TableHead className="text-blue-800">Actions</TableHead>
          
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes && classes.map((class_) => (
              <TableRow key={class_.id}>
                <TableCell>{class_.subjectId}</TableCell>
                <TableCell className="font-medium">{class_.name}</TableCell>
                <TableCell>{class_.teacherName}</TableCell>
                <TableCell>{class_.year_level}</TableCell>
                <TableCell>{class_.school_year}</TableCell>
                
                <TableCell>
                  <Link href={`/classes/${class_.id}/students`}>
                    <Button variant="outline" size="sm">View Students</Button>
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

