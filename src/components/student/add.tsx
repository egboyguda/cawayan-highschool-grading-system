'use client'
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
import { addStudentAction } from "@/action/studentAction"
import { useActionState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"




const AddStudentForm = () => {
   const [formState,action,isPending] = useActionState(addStudentAction.bind(null),{errors:{}})

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="default">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the details of the new student here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={action} >
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
               name='first_name' 
              required
            />
            {formState.errors.first_name && (
              <p className="text-red-500 text-sm mt-2">
                {formState.errors.first_name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="middle_name">Middle Name</Label>
            <Input
              id="middle_name"
            name='middle_name'
            />
            {
              formState.errors.middle_name && (
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.middle_name}
                </p>
              )
            }
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name='last_name'
                required
            />
            {
              formState.errors.last_name && (
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.last_name}
                </p>
              )
            }
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select  name='gender' required>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                
              </SelectContent>
            </Select>
            {
              formState.errors.gender && (
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.gender}
                </p>
              )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="date"
              name='birthdate'
              required
            />
            {
              formState.errors.birthdate && (
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.birthdate}
                </p>
              )
            }
          </div>
          <Button type="submit" className='border  border-black'>{isPending?'Saving...':'Save'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddStudentForm

