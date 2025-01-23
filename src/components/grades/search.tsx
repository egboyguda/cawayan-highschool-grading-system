"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GradeSearchFormProps {
  onSearch: (schoolYear: string, searchTerm: string) => void
}

export function GradeSearchForm({ onSearch }: GradeSearchFormProps) {
  const [schoolYear, setSchoolYear] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    onSearch(schoolYear, searchTerm)
  }, [schoolYear, searchTerm, onSearch])

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-blue-900">Search Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="schoolYear">School Year</Label>
            <Select value={schoolYear} onValueChange={setSchoolYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2022-2023</SelectItem>
                <SelectItem value="2024">2023-2024</SelectItem>
                <SelectItem value="2025">2024-2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

