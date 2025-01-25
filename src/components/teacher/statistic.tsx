import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TeacherStatisticsProps {
  totalTeachers: number
  
}

const TeacherStatistics = ({ totalTeachers}: TeacherStatisticsProps) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTeachers}</div>
        </CardContent>
      </Card>
     
    </div>
  )
}

export default TeacherStatistics

