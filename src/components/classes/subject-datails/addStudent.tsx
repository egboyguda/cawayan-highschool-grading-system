import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addStudent } from '@/action/subjectAction'


interface addStudentProps{
  subjectId:string
}
export function AddStudentForm({subjectId}:addStudentProps) {
  const[formState,action,isPending] =useActionState(addStudent.bind(null,subjectId),{errors:{}})  

  return (
    <form action={action}  className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="studentName">Student Name</Label>
        <Input
          id="studentName"
          name='studentId'
          required
        />
      {formState.errors.studentId &&(<p className="text-red-500 text-sm mt-2">
                {formState.errors.studentId}
              </p>)}
      </div>
      {formState.errors._form &&(<p className="text-red-500 text-sm mt-2">
                {formState.errors._form}
              </p>)}
      <Button type="submit">{isPending?'SAVING...':'SAVE'}</Button>
    </form>
  )
}

