'use client'

import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addSubjectAction } from '@/action/subjectAction'

const AddClassForm= () => {
  const [formState,action,isPending] = useActionState(addSubjectAction.bind(null),{errors:{}})
  return (
    <form action={action}  className="space-y-4 bg-white">
      <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name='subjectName'
            required
          />
          {formState.errors.subjectName && <p className="text-red-500">{formState.errors.subjectName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher">Teacher ID</Label>
          <Input
            id="teacher"
            name='teacherId'
            required
          />
          {formState.errors.teacherId && <p className="text-red-500">{formState.errors.teacherId}</p>}
        </div>
       
        <div className="space-y-2 bg-white">
          <Label htmlFor="year">Grade Year</Label>
          <Select name='grade_level' >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="7">GRADE 7</SelectItem>
              <SelectItem value="8">GRADE 8</SelectItem>
              <SelectItem value="9">GRADE 9</SelectItem>
              <SelectItem value="10">GRADE 10</SelectItem>
            </SelectContent>
          </Select>
          {formState.errors.grade_level && <p className="text-red-500">{formState.errors.grade_level}</p>}
        </div>
    
        <div className="space-y-2">
          <Label htmlFor="schoolYear">School Year</Label>
          <Input
          name='school_year'
            id="schoolYear"
            required
          />
          {formState.errors.school_year && <p className="text-red-500">{formState.errors.school_year}</p>}
        </div>
      {
        formState.errors._form && <p className="text-red-500">{formState.errors._form}</p>
      }
      </div>
      <Button type="submit" className="w-full border border-black">{isPending?'SAVING...':'SAVE'}</Button>
    </form>
  )
}

export default AddClassForm

