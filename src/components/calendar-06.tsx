"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"
import Calendar from "./ui/calendar"



export default function Calendar06() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={1}
        min={5}
        className="rounded-lg border shadow-sm"
      />
    </div>
  )
}
