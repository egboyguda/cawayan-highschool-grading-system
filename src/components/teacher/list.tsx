'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteTeacherAction } from '@/action/delAndEditAction'

interface Teacher {
  id: string
  name: string
  licenseNumber: string
  rank: string
  major: string
  teacherId:string
}

interface TeacherListProps {
  initialTeachers: Teacher[]
  searchTerm: string
}

const TeacherList = ({ initialTeachers, searchTerm }: TeacherListProps) => {
  const [teachers, setTeachers] = useState(initialTeachers)

  useEffect(() => {
    const filteredTeachers =initialTeachers && initialTeachers.filter(teacher =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.major.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setTeachers(filteredTeachers)
  }, [searchTerm, initialTeachers])

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-blue-900">Teacher List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-800">Name</TableHead>
              <TableHead className="text-blue-800">License Number</TableHead>
              <TableHead className="text-blue-800">Rank</TableHead>
              <TableHead className="text-blue-800">Major</TableHead>
              <TableHead className='text-blue-800'>Teacher ID</TableHead>
              <TableHead className="text-blue-800">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers && teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>

                <TableCell>{teacher.licenseNumber}</TableCell>
                <TableCell>{teacher.rank}</TableCell>
                <TableCell>{teacher.major}</TableCell>
                <TableCell>{teacher.teacherId}</TableCell>
                <TableCell>
                  <Button variant="destructive" className='bg-red-500 text-white' size="sm" onClick={async()=>{
                    await deleteTeacherAction(teacher.teacherId);
                    window.location.reload();

                  }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TeacherList

