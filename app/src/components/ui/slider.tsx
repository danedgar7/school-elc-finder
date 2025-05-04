import * as React from "react"

interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  label?: string
}

export function Slider({ value, min = 0, max = 10, step = 1, onChange, label }: SliderProps) {
  return (
    <div className="my-4 w-full">
      {label && <label className="block mb-2 font-medium">{label}: {value}</label>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
    </div>
  )
}
