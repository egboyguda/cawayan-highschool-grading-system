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
    const doc = new jsPDF('landscape', 'mm', 'legal'); // Landscape orientation with legal size
  
    // Adjusted column width (40% of total page width)
    const totalWidth = doc.internal.pageSize.getWidth();
    const columnWidth = (totalWidth * 0.4); // 40% of page width
    const columnGap = totalWidth * 0.1; // 10% gap between columns
  
    // LEFT COLUMN: Learning Progress and Achievement
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12); // Smaller font size for titles
    doc.text('Report on Learning Progress and Achievement', columnWidth / 2, 10, { align: 'center' });
  
    // Grades Table
    const tableData = Object.entries(grades).map(([subject, gradesList]) => [
      subject,
      gradesList[0] || '-',
      gradesList[1] || '-',
      gradesList[2] || '-',
      gradesList[3] || '-',
      calculateAverage(gradesList),
      parseFloat(calculateAverage(gradesList)) >= 75 ? 'Passed' : 'Failed',
    ]);
  
    const generalAverage = calculateAverage(Object.values(grades).flatMap((g) => g));
    tableData.push([
      '',
      { content: 'General Average', colSpan: 4, styles: { halign: 'center', fontStyle: 'bold' } },
      generalAverage,
      '',
    ]);
  
    autoTable(doc, {
      startY: 20,
      margin: { left: 10, right: columnGap + columnWidth + 10 },
      head: [
        [
          { content: 'Learning Areas', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
          { content: 'Quarter', colSpan: 4, styles: { halign: 'center', valign: 'middle' } },
          { content: 'Final Rating', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
          { content: 'Remarks', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
        ],
        ['1', '2', '3', '4'],
      ],
      body: tableData.map((row) =>
        row.map((cell) =>
          typeof cell === 'object' ? cell : { content: cell || '-', styles: { halign: 'center' } }
        )
      ),
      theme: 'grid',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        lineWidth: 0.5,
      },
      styles: {
        halign: 'center',
        valign: 'middle',
        textColor: 0,
        lineWidth: 0.5,
      },
      columnStyles: {
        0: { halign: 'left' },
      },
    });
  
    // Descriptors Table
    const descriptorsY = doc.lastAutoTable.finalY + 10;
    autoTable(doc, {
      startY: descriptorsY,
      margin: { left: 10, right: columnGap + columnWidth + 10 },
      head: [
        [
          { content: 'Descriptors', styles: { halign: 'center', fontStyle: 'bold' } },
          { content: 'Grading Scale', styles: { halign: 'center', fontStyle: 'bold' } },
          { content: 'Remarks', styles: { halign: 'center', fontStyle: 'bold' } },
        ],
      ],
      body: [
        ['Outstanding', '90-100', 'Passed'],
        ['Very Satisfactory', '85-89', 'Passed'],
        ['Satisfactory', '80-84', 'Passed'],
        ['Fairly Satisfactory', '75-79', 'Passed'],
        ['Did Not Meet Expectations', 'Below 75', 'Failed'],
      ],
      theme: 'plain',
      headStyles: {
        textColor: 0,
      },
      styles: {
        halign: 'center',
        valign: 'middle',
        textColor: 0,
        lineWidth: 0,
      },
      columnStyles: {
        0: { cellWidth: columnWidth / 3 },
        1: { cellWidth: columnWidth / 3 },
        2: { cellWidth: columnWidth / 3 },
      },
    });
  
    // RIGHT COLUMN: Learner's Observed Values
    const valuesStartY = 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12); // Smaller font size for titles
    doc.text("Report on Learner's Observed Values", columnWidth + columnGap + columnWidth / 2, valuesStartY, { align: 'center' });
  
    const observedValues = [
      [
        { content: 'Core Values', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
        { content: 'Behavior Statements', rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
        { content: 'Quarter', colSpan: 4, styles: { halign: 'center', valign: 'middle' } },
      ],
      ['1', '2', '3', '4'],
    ];
  
    const observedValuesBody = [
      [
        '1. Maka-Diyos',
        "Expresses one’s spiritual beliefs while respecting the spiritual beliefs of others.",
        '',
        '',
        '',
        '',
      ],
      [
        '',
        'Shows adherence to ethical principles by upholding truth in all undertakings.',
        '',
        '',
        '',
        '',
      ],
      [
        '2. Makatao',
        'Is sensitive to individual, social, and cultural differences;',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        'Demonstrates contributions towards solidarity.',
        '',
        '',
        '',
        '',
      ],
      [
        '3. Maka-Kalikasan',
        'Cares for the environment and utilizes resources wisely, judiciously, and economically.',
        '',
        '',
        '',
        '',
      ],
      [
        '4. Maka-Bansa',
        'Demonstrates pride in being a Filipino; exercises the rights and responsibilities of a Filipino citizen.',
        '',
        '',
        '',
        '',
      ],
      [
        '',
        'Demonstrates appropriate behavior in carrying out activities in school, community, and country.',
        '',
        '',
        '',
        '',
      ],
    ];
  
    autoTable(doc, {
      startY: valuesStartY + 10,
      margin: { left: columnWidth + columnGap, right: 10 },
      head: observedValues,
      body: observedValuesBody,
      theme: 'grid',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        lineWidth: 0.5,
      },
      styles: {
        halign: 'center',
        valign: 'middle',
        textColor: 0,
        lineWidth: 0.5,
      },
      columnStyles: {
        0: { cellWidth: columnWidth / 5 },
        1: { cellWidth: columnWidth / 2 },
        2: { cellWidth: columnWidth / 10 },
        3: { cellWidth: columnWidth / 10 },
        4: { cellWidth: columnWidth / 10 },
        5: { cellWidth: columnWidth / 10 },
      },
    });
  
    // Non-Numerical Ratings Table
    const ratingsStartY = doc.lastAutoTable.finalY + 10;
    autoTable(doc, {
      startY: ratingsStartY,
      margin: { left: columnWidth + columnGap, right: 10 },
      head: [],
      body: [
        ['Marking', 'Non-Numerical Rating'],
        ['AO', 'Always Observed'],
        ['SO', 'Sometimes Observed'],
        ['RO', 'Rarely Observed'],
        ['NO', 'Not Observed'],
      ],
      theme: 'plain',
      styles: {
        halign: 'left',
        textColor: 0,
        lineWidth: 0,
      },
    });
  
    // Save the PDF
    doc.save(`${name}_Learning_Progress_and_Observed_Values_${schoolYear}.pdf`);
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
