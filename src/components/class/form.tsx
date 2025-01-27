"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addClassAction } from "@/action/addClass"

interface ClassFormData {
  section: string
  adviser: string
  teacher: string
  schoolYear: string
  students: number
  gradeYear: "7" | "8" | "9" | "10"
}

interface AddClassFormProps {
  onSubmit: (data: ClassFormData) => void
}

const AddClassForm = () => {
  const [newClass, setNewClass] = useState<ClassFormData>({
    section: "",
    adviser: "",
    teacher: "",
    schoolYear: "",
    students: 0,
    gradeYear: "9", // Default value
  })
  const [formState,action,isPending]=useActionState(addClassAction.bind(null),{errors:{}})
  

  return (
    <form action={action} className="space-y-4 bg-white">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="section">Section</Label>
          <Input
          name="section"
            id="section"
            value={newClass.section}
            onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
            required
          />
          {formState.errors.section &&(<p className="text-red-500 text-sm mt-2">{formState.errors.section}</p>)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="adviser">Adviser</Label>
          <Input
            name="adviser"
            id="adviser"
            value={newClass.adviser}
            placeholder="Enter The Teacher Id"
            onChange={(e) => setNewClass({ ...newClass, adviser: e.target.value })}
            required
          />
          {formState.errors.adviser &&(<p className="text-red-500 text-sm mt-2">{formState.errors.adviser}</p>)}
        </div>

        <div className="space-y-2">
          <Label htmlFor="schoolYear">School Year</Label>
          <Input
          name="schoolYear"
            id="schoolYear"
            value={newClass.schoolYear}
            onChange={(e) => setNewClass({ ...newClass, schoolYear: e.target.value })}
            required
          />
          {formState.errors.schoolYear &&(<p className="text-red-500 text-sm mt-2">{formState.errors.schoolYear}</p>)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gradeYear">Grade Year</Label>
          <Select
            name="gradeYear"
            value={newClass.gradeYear}
            onValueChange={(value: "7" | "8" | "9" | "10") => setNewClass({ ...newClass, gradeYear: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select grade year" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="7">7th Grade</SelectItem>
              <SelectItem value="8">8th Grade</SelectItem>
              <SelectItem value="9">9th Grade</SelectItem>
              <SelectItem value="10">10th Grade</SelectItem>
            </SelectContent>
          </Select>
          {formState.errors.gradeYear &&(<p className="text-red-500 text-sm mt-2">{formState.errors.gradeYear}</p>)}
        </div>
      </div>
      {formState.errors._form &&(<p className="text-red-500 text-sm mt-2">{formState.errors._form}</p>)}
      <Button type="submit" className="w-full">
        {isPending?'SAVING...':'SAVE'}
      </Button>
    </form>
  )
}

export default AddClassForm

