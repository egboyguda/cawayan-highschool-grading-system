'use client'

import { useActionState, useState } from 'react'
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
import { addGrade } from '@/action/addGrade'


interface Grade {
  id: string;
  gradingPeriod: number;
  writtenWork: number;
  quarterlyAssess: number;
  performanceTask: number;
}

interface Student {
  id: string;
  studentId: string;
  name: string;
  grades: Grade[];
}


interface GradePercentage {
  id: string
  name: string
  performanceTask: number
  writtenWork: number
  quarterlyAssessment: number
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
      studentId: string;
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
  
  const [students] = useState<Student[]>(subject?.students || []);

  const [percentages, setPercentages] = useState([
    { performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
    { performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
    { performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
    { performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
  ])
  const [gradePercentages, setGradePercentages] = useState<GradePercentage[]>([
    { id: "1", name: "Default", performanceTask: 40, writtenWork: 40, quarterlyAssessment: 20 },
    { id: "2", name: "Alternative", performanceTask: 30, writtenWork: 50, quarterlyAssessment: 20 },
  ])

  const [selectedPercentageId, setSelectedPercentageId] = useState(gradePercentages[0].id)


  const [selectedGradingPeriod, setSelectedGradingPeriod] = useState(0)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isAddGradeDialogOpen, setIsAddGradeDialogOpen] = useState(false)
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [isPercentageDialogOpen, setIsPercentageDialogOpen] = useState(false)
  const [gradeType, setGradeType] = useState<'performanceTask' | 'writtenWork' | 'quarterlyAssessment'>('performanceTask')
  const [searchTerm, setSearchTerm] = useState('')

 
  const [formState,action ,isPending]=useActionState(addGrade.bind(null,subject?.id|| '',selectedStudent?.id || ''),{errors:{}})
  const handleAddGrade = (studentId:string) => {
    setSelectedStudent(students.find(s => s.id === studentId) || null)
    setIsAddGradeDialogOpen(true)
  }
  if(!subject){
    return null
  }
  const handleAddGradePercentage = (
    name: string,
    performanceTask: number,
    writtenWork: number,
    quarterlyAssessment: number,
  ) => {
    const newId = (Number.parseInt(gradePercentages[gradePercentages.length - 1].id) + 1).toString()
    const newPercentage: GradePercentage = {
      id: newId,
      name,
      performanceTask,
      writtenWork,
      quarterlyAssessment,
    }
    setGradePercentages([...gradePercentages, newPercentage])
    setSelectedPercentageId(newId)
    setIsPercentageDialogOpen(false)
  }

  // const handleGradeSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!selectedStudent) return

  //   const form = e.target as HTMLFormElement
  //   const score = Number(form.score.value)


  //   setIsAddGradeDialogOpen(false)
  // }
  


  // const handleUpdatePercentages = (performanceTask: number, writtenWork: number, quarterlyAssessment: number) => {
  //   const updatedPercentages = [...percentages]
  //   updatedPercentages[selectedGradingPeriod] = { performanceTask, writtenWork, quarterlyAssessment }
  //   setPercentages(updatedPercentages)
  //   setIsPercentageDialogOpen(false)
  // }

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
  const formatGradePercentage = (percentage: GradePercentage) => {
    return `${percentage.name} (PT: ${percentage.performanceTask}%, WW: ${percentage.writtenWork}%, QA: ${percentage.quarterlyAssessment}%)`
  }
  return (
    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="col-span-full">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">{subject.name}</h1>
          <p className="text-lg text-blue-600">School Year: {subject.school_year}</p>
        </div>
        <div className="space-y-2 ">
          <Label htmlFor="gradingPeriod">Grading Period:</Label>
          <Select
            value={selectedGradingPeriod.toString()}
            onValueChange={(value) => setSelectedGradingPeriod(Number(value))}
          >
            <SelectTrigger className="w-full">
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
        <div className="space-y-2">
          <Label htmlFor="gradePercentage">Grade Percentage:</Label>
          <Select
            value={selectedPercentageId}
            onValueChange={(value) => {
              if (value === "add") {
                setIsPercentageDialogOpen(true)
              } else {
                setSelectedPercentageId(value)
                setGradePercentages(gradePercentages.filter(percentage => percentage.id === value))
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select grade percentage" />
            </SelectTrigger>
            <SelectContent>
              {gradePercentages.map((percentage) => (
                <SelectItem key={percentage.id} value={percentage.id}>
                  {formatGradePercentage(percentage)}
                </SelectItem>
              ))}
              <SelectItem value="add">Add New Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>
       
        <div className="space-y-2">
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
      <div className="space-y-2">
        <Button onClick={() => setIsAddStudentDialogOpen(true)} className='bg-black text-white'>Add New Student</Button>
        <Button onClick={() => setIsPercentageDialogOpen(true)}>Set Grade Percentages</Button>
      </div>
      <Card className="bg-white col-span-full">
        <CardHeader>
          <CardTitle className="text-blue-900">Student List - {selectedGradingPeriod + 1}st Grading</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentList
            perCent={gradePercentages.find(percentage => percentage.id === selectedPercentageId)!}
            students={filteredStudents}
            selectedGradingPeriod={selectedGradingPeriod}
            calculateGradingPeriodAverage={calculateGradingPeriodAverage}
            onAddGrade={handleAddGrade}
          />
        </CardContent>
      </Card>
      
      <Dialog open={isAddGradeDialogOpen} onOpenChange={setIsAddGradeDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add Grade for {selectedStudent?.name}</DialogTitle>
            <DialogDescription>
              Enter the grade for the selected component.
            </DialogDescription>
          </DialogHeader>
          <form action={action}  className="space-y-4">
          <div className="flex items-center space-x-4">
          <Label htmlFor="gradingPeriod">Grading Period:</Label>
          <Select
           name='grading'
            //value={selectedGradingPeriod.toString()}
            //onValueChange={(value) => setSelectedGradingPeriod(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select grading period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st Grading</SelectItem>
              <SelectItem value="2">2nd Grading</SelectItem>
              <SelectItem value="3">3rd Grading</SelectItem>
              <SelectItem value="4">4th Grading</SelectItem>
            </SelectContent>
          </Select>
          {formState.errors.grading && <p className="text-red-500">{formState.errors.grading}</p>}
        </div>
            <div className="space-y-2">
              <Label htmlFor="gradeType">Grade Type</Label>
              <Select
              name='type'
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
              {formState.errors.type && <p className="text-red-500">{formState.errors.type}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="score">Grade</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                required
                name='grade'
              />
              
              {formState.errors.grade && <p className="text-red-500">{formState.errors.grade}</p>}
            </div>
            {formState.errors._form && <p className="text-red-500">{formState.errors._form}</p>}
            <Button type="submit">{isPending?'SAVING...':'SAVE'}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the name of the new student.
            </DialogDescription>
          </DialogHeader>
          <AddStudentForm subjectId={subject.id}  />
        </DialogContent>
      </Dialog>

      <Dialog open={isPercentageDialogOpen} onOpenChange={setIsPercentageDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New Grade Percentages</DialogTitle>
            <DialogDescription>
              Enter the percentages for Performance Tasks, Written Works, and Quarterly Assessment. They must add up to
              100%.
            </DialogDescription>
          </DialogHeader>
          <GradePercentagesForm onAddPercentage={handleAddGradePercentage} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

