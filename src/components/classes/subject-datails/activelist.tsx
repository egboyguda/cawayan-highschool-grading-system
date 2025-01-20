import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Activity {
  id: number
  name: string
  maxScore: number
}

interface ActivityListProps {
  performanceTasks: Activity[]
  writtenWorks: Activity[]
  percentages: { performanceTask: number; writtenWork: number }
  selectedGradingPeriod: number
  getHighestScore: (activityType: 'performanceTasks' | 'writtenWorks', activityIndex: number) => number
}

export function ActivityList({ performanceTasks, writtenWorks, percentages,/* selectedGradingPeriod*/ getHighestScore }: ActivityListProps) {
  return (
    <Tabs defaultValue="performanceTasks">
      <TabsList>
        <TabsTrigger value="performanceTasks">
          Performance Tasks ({percentages.performanceTask}%)
        </TabsTrigger>
        <TabsTrigger value="writtenWorks">
          Written Works ({percentages.writtenWork}%)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="performanceTasks">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-800">Activity Name</TableHead>
              <TableHead className="text-blue-800">Max Score</TableHead>
              <TableHead className="text-blue-800">Highest Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performanceTasks.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.maxScore}</TableCell>
                <TableCell>{getHighestScore('performanceTasks', index)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="writtenWorks">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-800">Activity Name</TableHead>
              <TableHead className="text-blue-800">Max Score</TableHead>
              <TableHead className="text-blue-800">Highest Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {writtenWorks.map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.maxScore}</TableCell>
                <TableCell>{getHighestScore('writtenWorks', index)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}

