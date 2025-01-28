'use client'

import { useState, useEffect } from 'react'
import {  useSearchParams } from 'next/navigation'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StudentGradeSummaryProps {
  studentId: string
  lrn: string
  name: string
  year_level:string
  gender:string 
  age:string
  section:string
  gradesData: Record<string, Record<string, number[]>>
}

export default function StudentGradeSummary({ name, gradesData,lrn,year_level ,gender,age,section}: StudentGradeSummaryProps) {
  const searchParams = useSearchParams()
  const schoolYear = searchParams.get('schoolYear')
  const [grades, setGrades] = useState<Record<string, number[]>>({})

  useEffect(() => {
    if (schoolYear) {
      setGrades(gradesData?.[schoolYear] || {})
    }
  }, [schoolYear,gradesData])

  if (!schoolYear) {
    return <div>Loading...</div>
  }

  const calculateAverage = (grades: number[]) => {
    console.log(grades)
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
        /* eslint-disable @typescript-eslint/no-explicit-any */
        { content: 'General Average', colSpan: 4, styles: { halign: 'center', fontStyle: 'bold' } } as any,
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const descriptorsY = (doc as any).lastAutoTable.finalY + 10;
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

      /* eslint-disable @typescript-eslint/no-explicit-any */
      const observedValues = [
        [
          { content: 'Core Values', rowSpan: 2, styles: { halign: 'center' as any, valign: 'middle' as any } },
          { content: 'Behavior Statements', rowSpan: 2, styles: { halign: 'center' as any, valign: 'middle' as any } },
          { content: 'Quarter', colSpan: 4, styles: { halign: 'center' as any, valign: 'middle' as any } },
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const ratingsStartY = (doc as any).lastAutoTable.finalY + 10;
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

      doc.addPage(); // Add a second page

      // LEFT COLUMN: Attendance Table
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('ATTENDANCE RECORD', columnWidth / 2, 10, { align: 'center' });
      
      // Month headers (including "TOTAL")
      const months = [
          '', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'TOTAL'
      ];
      
      const attendanceData = [
          { label: 'No. of School Days', data: Array(12).fill('') },
          { label: 'No. of Days Present', data: Array(12).fill('') },
          { label: 'No. of Days Absent', data: Array(12).fill('') }
      ];
      
      // Reduce font size for the months header row to fit in the columns
      doc.setFontSize(4);
      
      // Adjust the column widths (increase the width for the months header column)
      autoTable(doc, {
          startY: 20,
          margin: { left: 10, right: columnGap + columnWidth + 10 }, // Adjust the margins for left column
          head: [months],
          headStyles: {
              fillColor: [255, 255, 255],
          },
          body: attendanceData.map(row => [row.label, ...row.data]),
          theme: 'grid',
          styles: {
              halign: 'center',
              valign: 'middle',
              textColor: 0,
              lineWidth: 0.5,
          },
          columnStyles: {
              0: { halign: 'left', cellWidth: columnWidth / 6 }, // First column (labels) is left-aligned, and smaller width
              1: { cellWidth: columnWidth / 12 }, // Each month column width adjusted
              2: { cellWidth: columnWidth / 12 },
              3: { cellWidth: columnWidth / 12 },
              4: { cellWidth: columnWidth / 12 },
              5: { cellWidth: columnWidth / 12 },
              6: { cellWidth: columnWidth / 12 },
              7: { cellWidth: columnWidth / 12 },
              8: { cellWidth: columnWidth / 12 },
              9: { cellWidth: columnWidth / 12 },
              10: { cellWidth: columnWidth / 12 },
              11: { cellWidth: columnWidth / 12 },
              12: { cellWidth: columnWidth / 12 }, // Last column for TOTAL
          },
      });
      
  // Add Parent/Guardian's Signature section after the attendance record
  
  const signatureStartY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8); // Adjust font size for the signature part

  // Label and content for Parent/Guardian's Signature
  doc.text('PARENT / GUARDIAN’S SIGNATURE', columnWidth / 2, signatureStartY, { align: 'center' });

  const signatureY = signatureStartY + 10;
  const quarters = ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter'];

  quarters.forEach((quarter, index) => {
    const yPosition = signatureY + (index * 10); // Adjust space between quarters
    doc.text(`${quarter}_____________________________`, columnWidth / 2, yPosition, { align: 'center' });
  });

  // Add space before Certificate of Transfer section
  const certificateStartY = signatureY + (quarters.length * 10) + 10; // Added 10 units gap after the last signature

  // Certificate of Transfer Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10); // Slightly larger font for the certificate title
  doc.text('Certificate of Transfer', columnWidth / 2, certificateStartY, { align: 'center' });

  // Content for Certificate of Transfer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8); // Adjust font size for the content

  const certificateY = certificateStartY + 4;
  doc.text('Admitted to Grade: _________      Section: __________________________', columnWidth / 2-50, certificateY);

  const certificateY2 = certificateY + 6;
  doc.text('Eligibility for Admission to Grade: __________________________________', columnWidth / 2-50, certificateY2);

  const certificateY3 = certificateY2 + 6;
  doc.text('Approved:', columnWidth / 2-50, certificateY3);

  // Signature lines for Principal and Teacher
  const certificateY4 = certificateY3 + 10;
  doc.text('______________________________ ', columnWidth / 2 - 50, certificateY4); // Principal line
  doc.text('Principal', columnWidth / 2 -25, certificateY4 + 4, { align: 'center' });

  const certificateY5 = certificateY3 + 10;
  doc.text('____________________________', columnWidth / 2 + 50, certificateY5); // Teacher line
  doc.text('Teacher', columnWidth / 2 + 60, certificateY5 + 4, { align: 'center' });


  // Add space before Cancellation of Eligibility section
  const cancellationStartY = certificateY5 + 20; // Added 20 units gap after the last signature

  // Cancellation of Eligibility Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10); // Slightly larger font for the cancellation title
  doc.text('Cancellation of Eligibility to Transfer', columnWidth / 2, cancellationStartY, { align: 'center' });

  // Content for Cancellation of Eligibility to Transfer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8); // Adjust font size for the content

  const cancellationY1 = cancellationStartY + 4;
  doc.text('Admitted in: ___________________', columnWidth / 2 - 50, cancellationY1);

  const cancellationY2 = cancellationY1 + 6;
  doc.text('Date: _________________________', columnWidth / 2 - 50, cancellationY2);

  const cancellationY3 = cancellationY1 + 6;
  doc.text('______________________________', columnWidth / 2 + 48, cancellationY3); // Line for signature

  const cancellationY4 = cancellationY1 + 6;

  const cancellationY5 = cancellationY4 + 6;
  doc.text('Principal', columnWidth / 2 + 60, cancellationY5, { align: 'center' });

  //2nd column
  // Second Column: Centered and Larger Content (Divided by 4)
const secondColumnStartY = 10; // Start at the very top of the second column
const secondColumnX = columnWidth * 3 / 2 + columnGap; // Adjust the starting X position (3/4 of the total width)

// Define a larger font size for the main titles
doc.setFont('helvetica');
doc.setFontSize(8); // Increased font size for main headings
doc.text('SF 9 - JHS',  secondColumnX-40, secondColumnStartY,);

doc.addImage('/Picture2.jpg', secondColumnX -40, secondColumnStartY, 30, 40,);
doc.addImage('/Picture1.png', secondColumnX + 65, secondColumnStartY, 30, 40,);

const secondColumnDetailsY = secondColumnStartY + 10;
doc.setFontSize(12); // Slightly smaller font size for subheadings
doc.text('Republic of the Philippines', secondColumnX + columnWidth / 4, secondColumnDetailsY, { align: 'center'});

const regionY = secondColumnDetailsY + 8;
doc.text('Department of Education', secondColumnX + columnWidth / 4, regionY, { align: 'center' });

doc.setFont('helvetic','bold')
const divisionY = regionY + 8;
doc.text('Region VII', secondColumnX + columnWidth / 4, divisionY, { align: 'center' });

const districtY = divisionY + 8;
doc.text('Division of Northern Samar', secondColumnX + columnWidth / 4, districtY, { align: 'center' });

doc.setFontSize(20)
const catarmanY = districtY + 8;
doc.text('CATARMAN IV', secondColumnX + columnWidth / 4, catarmanY, { align: 'center' });

doc.setFont('helvetica','normal')
doc.setFontSize(8)
const schoolY = catarmanY + 4;
doc.text('District', secondColumnX + columnWidth / 4, schoolY, { align: 'center' });

doc.setFont('helvetica','bold')
const schoolNameY = schoolY + 10;
doc.setFontSize(9); // Slightly smaller size for long text
doc.text('CAWAYAN INTEGRATED SCHOOL-SECONDARY', secondColumnX + columnWidth / 4, schoolNameY, { align: 'center' });

doc.setFont('helvetica','normal')
const schoolName =schoolNameY+4
doc.setFontSize(8)
doc.text('School',secondColumnX+columnWidth/4,schoolName,{align:'center'})

const schoolIdY = schoolName + 8;
doc.setFontSize(12); // Reset to normal size for ID
doc.text('SCHOOL ID: 500236', secondColumnX + columnWidth / 4, schoolIdY, { align: 'center' });

//
const schoolLearner =schoolIdY +20;
doc.setFont('helvetica','bold')
doc.setFontSize(15)
doc.text("LEARNER'S PROGRESS REPORT CARD",secondColumnX+columnWidth/4,schoolLearner,{align:'center'})
 
 const studnetNamey= schoolLearner+20;
 doc.setFont('helvetica','normal')
 doc.setFontSize(12)
 doc.text(`Name: ${name.toUpperCase()}`,secondColumnX-40,studnetNamey)

 const studentIdY = studnetNamey+8
 doc.text(`Learner's Refereance Number: ${lrn}`,secondColumnX-40,studentIdY)

 const ageY = studentIdY+8
 doc.text(`Age: ${age}`,secondColumnX-40,ageY)
 doc.text(`Sex: ${gender}`,secondColumnX+15,ageY)

const gradey = ageY+8
doc.text(`Grade: ${year_level}`,secondColumnX-40,gradey)
doc.text(`Section: ${section} `,secondColumnX+15,gradey)

const nameSchoolY = gradey+8
doc.text(`School Year: ${parseInt(schoolYear)-1}-${schoolYear} `,secondColumnX-40,nameSchoolY)


const sentence = nameSchoolY+12
doc.text('Dear Parent,',secondColumnX-40,sentence)

const sentence1 = sentence + 8;
doc.text('This report card shows the ability and progress your child has', secondColumnX -35, sentence1);

const sentence2= sentence1+4
doc.text('made in different learning areas as well as his/her core values.',secondColumnX-40,sentence2)

const sentence3 = sentence2 + 8;
doc.text('The school welcomes you should you desire to know more ', secondColumnX -35, sentence3);

const sentence4= sentence3+4
doc.text('about your childs progress.',secondColumnX-40,sentence4);

const sign = sentence4+8;
doc.text('_____________',secondColumnX-35,sign)
doc.text('_____________',secondColumnX+28,sign)

const lab = sign+4;
doc.text('Principal',secondColumnX-30,lab)
doc.text('Teacher',secondColumnX+35,lab)


// Save the PDF



      // Save the PDF
      doc.save(`${name}_CARD_${schoolYear}.pdf`);
      
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
