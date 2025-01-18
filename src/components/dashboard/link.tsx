import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const links = [
  { title: "Add New Student", href: "/students/new" },
  { title: "Create Class", href: "/classes/new" },
  { title: "View Schedule", href: "/schedule" },
  { title: "Manage Grades", href: "/grades" },
]

const QuickLinks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-900">Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {links.map((link, index) => (
          <Button key={index} asChild variant="outline" className="w-full">
            <Link href={link.href}>{link.title}</Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

export default QuickLinks

