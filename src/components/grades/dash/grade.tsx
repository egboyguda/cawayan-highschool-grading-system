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
    const doc = new jsPDF('landscape'); // Set orientation to landscape
  
    // Add Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Report on Learning Progress and Achievement', 148, 15, { align: 'center' }); // Centered title
  
    // Prepare Table Data
    const tableData = Object.entries(grades).map(([subject, gradesList]) => [
      subject, // Learning Areas
      gradesList[0] || '-', // Quarter 1
      gradesList[1] || '-', // Quarter 2
      gradesList[2] || '-', // Quarter 3
      gradesList[3] || '-', // Quarter 4
      calculateAverage(gradesList), // Final Rating
      parseFloat(calculateAverage(gradesList)) >= 75 ? 'Passed' : 'Failed', // Remarks
    ]);
  
    // Calculate General Average
    const generalAverage = calculateAverage(Object.values(grades).flatMap(g => g));
  
    // Add General Average Row
    tableData.push([
      '', // Blank for "Learning Areas"
      { content: 'General Average', colSpan: 4, styles: { halign: 'center', fontStyle: 'bold' } }, // Merged across all Quarter columns
      generalAverage, // Final Rating column: General Average
      '', // Remarks (empty)
    ]);
  
    // Add Table with Headers and Sub-Headers
    autoTable(doc, {
      startY: 30,
      head: [
        [
          { content: 'Learning Areas', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
          { content: 'Quarter', colSpan: 4, styles: { halign: 'center', valign: 'middle' } },
          { content: 'Final Rating', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
          { content: 'Remarks', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
        ],
        ['1', '2', '3', '4'], // Sub-headers for Quarter
      ],
      body: tableData.map((row) =>
        row.map((cell) =>
          typeof cell === 'object' ? cell : { content: cell || '-', styles: { halign: 'center' } }
        )
      ),
      theme: 'grid', // Grid theme to ensure borders
      headStyles: {
        fillColor: [255, 255, 255], // White background
        textColor: 0, // Black text
        lineWidth: 0.5, // Black border width for headers
      },
      styles: {
        halign: 'center',
        valign: 'middle',
        textColor: 0, // Black text for all cells
        lineWidth: 0.5, // Add thin black borders around cells
      },
      columnStyles: {
        0: { halign: 'left' }, // Align "Learning Areas" to the left
      },
    });
  
    // Add Descriptors Table Below (without borders and resized columns)
    const finalY = doc.lastAutoTable.finalY + 10; // Position below the table
    autoTable(doc, {
      startY: finalY,
      head: [
        [
          { content: 'Descriptors', styles: { halign: 'center', fontStyle: 'bold', cellWidth: 'auto' } },
          { content: 'Grading Scale', styles: { halign: 'center', fontStyle: 'bold', cellWidth: 'auto' } },
          { content: 'Remarks', styles: { halign: 'center', fontStyle: 'bold', cellWidth: 'auto' } },
        ],
      ],
      body: [
        ['Outstanding', '90-100', 'Passed'],
        ['Very Satisfactory', '85-89', 'Passed'],
        ['Satisfactory', '80-84', 'Passed'],
        ['Fairly Satisfactory', '75-79', 'Passed'],
        ['Did Not Meet Expectations', 'Below 75', 'Failed'],
      ],
      theme: 'plain', // No grid for this table
      headStyles: {
        textColor: 0, // Black text for headers
      },
      styles: {
        halign: 'center',
        valign: 'middle',
        textColor: 0, // Black text for all cells
        lineWidth: 0, // Remove borders for this table
      },
      columnStyles: {
        0: { cellWidth: 40 }, // Descriptors column width
        1: { cellWidth: 40 }, // Grading Scale column width
        2: { cellWidth: 40 }, // Remarks column width
      },
    });
  
    // Save the PDF
    doc.save(`${name}_Learning_Progress_Report_${schoolYear}.pdf`);
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
