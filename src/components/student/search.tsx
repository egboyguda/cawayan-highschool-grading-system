import { Input } from "@/components/ui/input"

interface StudentSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

const StudentSearch = ({ searchTerm, onSearchChange }: StudentSearchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  )
}

export default StudentSearch

