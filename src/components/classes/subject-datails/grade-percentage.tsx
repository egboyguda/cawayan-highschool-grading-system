import { useState, useEffect, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addGradePercent } from "@/action/addGradePercent"

interface GradePercentagesFormProps {
  onAddPercentage: (name: string, performanceTask: number, writtenWork: number, quarterlyAssessment: number) => void
}

export function GradePercentagesForm({ onAddPercentage }: GradePercentagesFormProps) {
  const [formState,action,isPending]= useActionState(addGradePercent.bind(null),{errors:{}})
  const [name, setName] = useState("")
  const [performanceTask, setPerformanceTask] = useState(0)
  const [writtenWork, setWrittenWork] = useState(0)
  const [quarterlyAssessment, setQuarterlyAssessment] = useState(0)
  const [totalPercentage, setTotalPercentage] = useState(0)

  useEffect(() => {
    setTotalPercentage(performanceTask + writtenWork + quarterlyAssessment)
  }, [performanceTask, writtenWork, quarterlyAssessment])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (performanceTask + writtenWork + quarterlyAssessment === 100) {
      onAddPercentage(name, performanceTask, writtenWork, quarterlyAssessment)
    } else {
      alert("Percentages must add up to 100%")
    }
  }

  return (
    <form action={action} className="space-y-4 ">
      <div className="space-y-2">
        <Label htmlFor="name">Configuration Name</Label>
        <Input id="name" value={name} name="name" onChange={(e) => setName(e.target.value)} required />
        {formState.errors.name &&(<p className="text-red-500 text-sm mt-2">{formState.errors.name}</p>)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="performanceTask">Performance Task %</Label>
        <Input
          id="performanceTask"
          type="number"
          max={100}
          value={performanceTask}
          name="performanceTask"
          onChange={(e) => setPerformanceTask(Number(e.target.value))}
          required
        />
        {formState.errors.performanceTask &&(<p className="text-red-500 text-sm mt-2">{formState.errors.performanceTask}</p>)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="writtenWork">Written Work %</Label>
        <Input
          id="writtenWork"
          type="number"
          
          name="writtenWork"
          max={100}
          value={writtenWork}
          onChange={(e) => setWrittenWork(Number(e.target.value))}
          required
        />
        {formState.errors.writtenWork &&(<p className="text-red-500 text-sm mt-2">{formState.errors.writtenWork}</p>)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="quarterlyAssessment">Quarterly Assessment %</Label>
        <Input
          id="quarterlyAssessment"
          type="number"
          name="quarterlyAssessment"
   
          max="100"
          value={quarterlyAssessment}
          onChange={(e) => setQuarterlyAssessment(Number(e.target.value))}
          required
        />
        {formState.errors.quarterlyAssessment &&(<p className="text-red-500 text-sm mt-2">{formState.errors.quarterlyAssessment}</p>)}
      </div>
      <div className="text-sm text-gray-600 mb-2">Current Total: {totalPercentage}%</div>
      {formState.errors._form &&(<p className="text-red-500 text-sm mt-2">{formState.errors._form}</p>)}
      <Button type="submit" disabled={totalPercentage !== 100}>
        {isPending?'SAVING...':'SAVE'}
      </Button>
    </form>
  )
}

