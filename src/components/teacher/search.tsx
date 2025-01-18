'use client'

import { Input } from "@/components/ui/input"

interface TeacherSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

const TeacherSearch = ({ searchTerm, onSearchChange }: TeacherSearchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Search teachers..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  )
}

export default TeacherSearch

