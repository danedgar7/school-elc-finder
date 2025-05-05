import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CriteriaProps {
  weights: Record<string, number>;
  onChange: (key: string, value: number) => void;
  criteria: { key: string; label: string }[];
}

export function AssessmentCriteria({ weights, onChange, criteria }: CriteriaProps) {
  return (
    <div className="flex flex-col gap-0">
      {/* Header Row for Slider Labels */}
      <div className="grid grid-cols-[auto_1fr] gap-1 pr-1">
        <div className="w-28"></div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Don't Care</span>
          <span>High Priority</span>
        </div>
      </div>

      {/* Slider Rows */}
      {criteria.map(c => (
        <div key={c.key} className="grid grid-cols-[auto_1fr] items-center gap-1 my-2">
          <Label className="text-sm w-28">{c.label}:</Label>
          <div className="flex-1 pr-1">
            <Slider
              value={[weights[c.key]]} 
              min={0}
              max={10}
              step={1}
              onValueChange={(val: number[]) => onChange(c.key, val[0])} 
              aria-label={`${c.label} weight`} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}
