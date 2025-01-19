import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddStudentFormProps {
  onAddStudent: (name: string) => void
}

export function AddStudentForm() {
  const [newStudent, setNewStudent] = useState({ name: '' })



  return (
    <form  className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="studentName">Student Name</Label>
        <Input
          id="studentName"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          required
        />
      </div>
      <Button type="submit">Add Student</Button>
    </form>
  )
}

