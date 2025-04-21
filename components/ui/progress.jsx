"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

function Progress({ className, value, ...props }) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "bg-gray-200 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full transition-all",
          value === 100 ? "bg-green-500" : "bg-blue-500" // Verde si está completo, azul si no
        )}
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }