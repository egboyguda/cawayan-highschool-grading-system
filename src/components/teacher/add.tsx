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
import { useActionState } from "react"
import { addTeacherAction } from "@/action/teacherAction"

const AddTeacherForm = () => {
const [formState,action,isPending]=useActionState(addTeacherAction.bind(null),{errors:{}})

  
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="default">Add Teacher</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
          <DialogDescription>
            Enter the details of the new teacher here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name='username'
                type='text'
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
               name='name'
               type='text'
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                name='licenseNumber'
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rank">Rank</Label>
              <Input
                id="rank"
                name='rank'
                required
              />
            </div>
           
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name='password'
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retypePassword">Retype Password</Label>
              <Input
                id="retypePassword"
                type="password"
                name='password1'
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
              name='major'
                required
              />
            </div>
          </div>
          {formState.errors._form && <p className="text-red-500 text-sm col-span-2">{formState.errors._form}</p>}
          <Button type="submit" className="w-full border-black border">{isPending?'Saving':'Save'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTeacherForm

