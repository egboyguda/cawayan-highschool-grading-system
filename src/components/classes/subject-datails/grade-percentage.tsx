import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface GradePercentagesFormProps {
  selectedGradingPeriod: number
  percentages: { performanceTask: number; writtenWork: number; quarterlyAssessment: number }[]
  onUpdatePercentages: (performanceTask: number, writtenWork: number, quarterlyAssessment: number) => void
}

export function GradePercentagesForm({ selectedGradingPeriod, percentages, onUpdatePercentages }: GradePercentagesFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const pt = Number(form.performanceTask.value)
    const ww = Number(form.writtenWork.value)
    const qa = Number(form.quarterlyAssessment.value)
    if (pt + ww + qa === 100) {
      onUpdatePercentages(pt, ww, qa)
    } else {
      alert("Percentages must add up to 100%")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="performanceTask">Performance Task %</Label>
        <Input
          id="performanceTask"
          type="number"
          min="0"
          max="100"
          defaultValue={percentages[selectedGradingPeriod].performanceTask}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="writtenWork">Written Work %</Label>
        <Input
          id="writtenWork"
          type="number"
          min="0"
          max="100"
          defaultValue={percentages[selectedGradingPeriod].writtenWork}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quarterlyAssessment">Quarterly Assessment %</Label>
        <Input
          id="quarterlyAssessment"
          type="number"
          min="0"
          max="100"
          defaultValue={percentages[selectedGradingPeriod].quarterlyAssessment}
          required
        />
      </div>
      <Button type="submit">Save Percentages</Button>
    </form>
  )
}

