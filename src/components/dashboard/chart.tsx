'use client'

import { Bar } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
}

const data = {
  labels: ['9th Grade', '10th Grade', '11th Grade', '12th Grade'],
  datasets: [
    {
      label: 'Number of Students',
      data: [320, 280, 310, 324],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    },
  ],
}

const StudentEnrollmentChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-blue-900">Student Enrollment by Grade</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  )
}

export default StudentEnrollmentChart

