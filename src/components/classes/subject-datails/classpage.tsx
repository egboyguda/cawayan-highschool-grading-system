'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GradePercentagesForm } from './grade-percentage'
import { AddStudentForm } from './addStudent'
import { StudentList } from './list'


interface Grade {
  id: string;
  gradingPeriod: number;
  writtenWork: number;
  quarterlyAssess: number;
  performanceTask: number;
}

interface Student {
  id: string;
  name: string;
  grades: Grade[];
}



interface SubjectWithStudent{
  id: string;
  name: string;
  teacherName: string;
  year_level: string;
  subjectId: string;
  school_year: string;
  students: {
      id: string;
      name: string;
      grades: {
          id: string;
          gradingPeriod: number;
          writtenWork: number;
          quarterlyAssess: number;
          performanceTask: number;
      }[];
  }[];

}
interface ClassStudentsProps{
  subject:SubjectWithStudent | null
}

export function ClassStudents({subject}:ClassStudentsProps) {
  if(!subject){
    return <div>not found</div>
  }

  const [students, setStudents] = useState<Student[]>(subject.students)

  const [percentages, setPercentages] = useState([
    { performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
    { performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
    { performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
    { performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
  ])

  const [selectedGradingPeriod, setSelectedGradingPeriod] = useState(0)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isAddGradeDialogOpen, setIsAddGradeDialogOpen] = useState(false)
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [isPercentageDialogOpen, setIsPercentageDialogOpen] = useState(false)
  const [gradeType, setGradeType] = useState<'performanceTask' | 'writtenWork' | 'quarterlyAssessment'>('performanceTask')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddGrade = (studentId:string) => {
    setSelectedStudent(students.find(s => s.id === studentId) || null)
    setIsAddGradeDialogOpen(true)
  }

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStudent) return

    const form = e.target as HTMLFormElement
    const score = Number(form.score.value)


    setIsAddGradeDialogOpen(false)
  }



  const handleUpdatePercentages = (performanceTask: number, writtenWork: number, quarterlyAssessment: number) => {
    const updatedPercentages = [...percentages]
    updatedPercentages[selectedGradingPeriod] = { performanceTask, writtenWork, quarterlyAssessment }
    setPercentages(updatedPercentages)
    setIsPercentageDialogOpen(false)
  }

  const calculateGradingPeriodAverage = (studentId: string, period: number) => {
    const student = students.find(s => s.id === studentId)
    if (!student) return 0

    const ptScore = student.grades.map(e =>e.performanceTask)[0]
    const wwScore = student.grades.map(e=>e.writtenWork)[0]
    const qaScore = student.grades.map(e=>e.quarterlyAssess)[0]

    return (
      (ptScore * percentages[period].performanceTask / 100) +
      (wwScore * percentages[period].writtenWork / 100) +
      (qaScore * percentages[period].quarterlyAssessment / 100)
    )
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">{subject.name}</h1>
          <p className="text-lg text-blue-600">School Year: {subject.school_year}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="gradingPeriod">Grading Period:</Label>
          <Select
            value={selectedGradingPeriod.toString()}
            onValueChange={(value) => setSelectedGradingPeriod(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select grading period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">1st Grading</SelectItem>
              <SelectItem value="1">2nd Grading</SelectItem>
              <SelectItem value="2">3rd Grading</SelectItem>
              <SelectItem value="3">4th Grading</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="search">Search:</Label>
          <Input
            id="search"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px]"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button onClick={() => setIsAddStudentDialogOpen(true)}>Add New Student</Button>
        <Button onClick={() => setIsPercentageDialogOpen(true)}>Set Grade Percentages</Button>
      </div>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-blue-900">Student List - {selectedGradingPeriod + 1}st Grading</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentList 
            students={filteredStudents}
            selectedGradingPeriod={selectedGradingPeriod}
            calculateGradingPeriodAverage={calculateGradingPeriodAverage}
          />
        </CardContent>
      </Card>
      
      <Dialog open={isAddGradeDialogOpen} onOpenChange={setIsAddGradeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Grade for {selectedStudent?.name}</DialogTitle>
            <DialogDescription>
              Enter the grade for the selected component.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGradeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gradeType">Grade Type</Label>
              <Select
                value={gradeType}
                onValueChange={(value: 'performanceTask' | 'writtenWork' | 'quarterlyAssessment') => setGradeType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performanceTask">Performance Task</SelectItem>
                  <SelectItem value="writtenWork">Written Work</SelectItem>
                  <SelectItem value="quarterlyAssessment">Quarterly Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                required
              />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the name of the new student.
            </DialogDescription>
          </DialogHeader>
          <AddStudentForm  />
        </DialogContent>
      </Dialog>

      <Dialog open={isPercentageDialogOpen} onOpenChange={setIsPercentageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Grade Percentages for {selectedGradingPeriod + 1}st Grading</DialogTitle>
            <DialogDescription>
              Enter the percentages for Performance Tasks, Written Works, and Quarterly Assessment. They must add up to 100%.
            </DialogDescription>
          </DialogHeader>
          <GradePercentagesForm 
            selectedGradingPeriod={selectedGradingPeriod}
            percentages={percentages}
            onUpdatePercentages={handleUpdatePercentages}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

