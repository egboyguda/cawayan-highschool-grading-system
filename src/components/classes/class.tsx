'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ClassList from './list'
import AddClassForm from './form'

interface Subject {
  id: string
  name: string
  teacherName: string
  year_level: string
  subjectId: string
  school_year: string
}
interface ClassListProps {
  initialClasses: Subject[]
  
}




export default function Classes( {initialClasses}: ClassListProps) {
  const [classes] =useState<Subject[]>(initialClasses)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

 

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">Subject</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-black text-white rounded-sm'>Add Subject</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] bg-white">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Enter the details of the new Subject here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <AddClassForm  />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search classes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <ClassList initialClasses={classes} searchTerm={searchTerm} />
    </div>
  )
}

