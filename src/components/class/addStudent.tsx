"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addStudentAction } from "@/action/addClass"


interface Student {
  id: number
  name: string
  gradeYear: "7" | "8" | "9" | "10"
  section: string
}

interface AddStudentFormProps {
  //onAddStudent: (student: Omit<Student, "id">) => void
  classId:string
}

export function AddStudentForm({classId}: AddStudentFormProps) {
 const [formState,action,isPending] = useActionState(addStudentAction.bind(null,classId),{errors:{}})


  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="default" className="bg-black text-white">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>Enter the details of the new student here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Learner reference number</Label>
            <Input
              id="name"
            name="studentId"
              required
            />
          </div>
            {formState.errors.studentId &&(<p className="text-red-500 text-sm mt-2">{formState.errors.studentId}</p>)}
            {formState.errors._form &&(<p className="text-red-500 text-sm mt-2">{formState.errors._form}</p>)}
        
          <Button
            type="submit"
          >
        {isPending?'SAVING...':'SAVE'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

