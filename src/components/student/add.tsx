import { useState } from 'react'
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

interface Student {
  id: number
  name: string
  grade: string
}

interface AddStudentFormProps {
  onAddStudent: (student: Omit<Student, 'id'>) => void
}

const AddStudentForm = ({ onAddStudent }: AddStudentFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({ name: '', grade: '' })

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    onAddStudent(newStudent)
    setNewStudent({ name: '', grade: '' })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen}  onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the details of the new student here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Grade</Label>
            <Input
              id="grade"
              value={newStudent.grade}
              onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className='border border-black'>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddStudentForm

