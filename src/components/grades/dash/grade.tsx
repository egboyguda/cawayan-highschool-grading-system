'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StudentGradeSummaryProps {
  studentId: string
  name: string
  gradesData: Record<string, Record<string, number[]>>
}

export default function StudentGradeSummary({ studentId, name, gradesData }: StudentGradeSummaryProps) {
  const searchParams = useSearchParams()
  const schoolYear = searchParams.get('schoolYear')
  const [grades, setGrades] = useState<Record<string, number[]>>({})

  useEffect(() => {
    if (schoolYear) {
      setGrades(gradesData?.[schoolYear] || {})
    }
  }, [schoolYear])

  if (!schoolYear) {
    return <div>Loading...</div>
  }

  const calculateAverage = (grades: number[]) => {
    const sum = grades.reduce((a, b) => a + b, 0)
    return (sum / grades.length).toFixed(2)
  }

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`Grade Summary for ${name}`, 10, 10);
  
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`School Year: ${schoolYear}`, 10, 20);
  
    // Grades Table
    const tableData = Object.entries(grades).map(([subject, gradesList]) => [
      subject,
      ...gradesList,
      calculateAverage(gradesList),
    ]);
  
    autoTable(doc, {
      head: [['Subject', '1st Grading', '2nd Grading', '3rd Grading', '4th Grading', 'Average']],
      body: tableData,
      startY: 30,
    });
  
    // Overall Average
    const overallAverage = calculateAverage(Object.values(grades).flatMap(g => g));
    doc.text(`Overall Average: ${overallAverage}`, 10, (doc as any).lastAutoTable.finalY + 10);
  
    // Principal's Section
    const principalY = (doc as any).lastAutoTable.finalY + 30;
    doc.text('Principal:', 10, principalY);
    doc.line(10, principalY + 10, 100, principalY + 10); // Signature line
    doc.text('Signature:', 10, principalY + 20);
    doc.text('Date:', 10, principalY + 30);
  
    // Save the PDF
    doc.save(`${name}_Grade_Summary_${schoolYear}.pdf`);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-900">Grade Summary for {name}</h1>
      <h2 className="text-xl font-semibold text-blue-800">School Year: {schoolYear}</h2>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-blue-900">Grades by Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-800">Subject</TableHead>
                <TableHead className="text-blue-800">1st Grading</TableHead>
                <TableHead className="text-blue-800">2nd Grading</TableHead>
                <TableHead className="text-blue-800">3rd Grading</TableHead>
                <TableHead className="text-blue-800">4th Grading</TableHead>
                <TableHead className="text-blue-800">Average</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(grades).map(([subject, gradesList]) => (
                <TableRow key={subject}>
                  <TableCell className="font-medium">{subject}</TableCell>
                  {gradesList.map((grade, index) => (
                    <TableCell key={index}>{grade}</TableCell>
                  ))}
                  <TableCell className="font-bold">{calculateAverage(gradesList)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-blue-900">Overall Average</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-blue-900">
            {calculateAverage(Object.values(grades).flatMap(g => g))}
          </p>
        </CardContent>
      </Card>
      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  )
}
