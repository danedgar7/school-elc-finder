"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"

// Define ChartContainer props type separately
type ChartContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  config: ChartConfig
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}

// Chart Container
const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config }, ref): React.ReactElement => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex h-full justify-center text-xs",
            "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
            "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
            "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
            "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
            "[&_.recharts-layer_text]:fill-muted-foreground",
            "[&_.recharts-polar-grid[stroke='#ccc']]:stroke-border",
            "[&_.recharts-radial-bar-background-sector]:fill-muted",
            "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
            "[&_.recharts-reference-line[stroke='#ccc']]:stroke-border",
            "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
            "[&_.recharts-sector]:outline-none",
            "[&_.recharts-surface]:outline-none",
            className
          )}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "Chart"

// Chart Context
type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

// Chart Style
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.itemColor || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`,
      }}
    />
  )
}

// Chart Tooltip
const ChartTooltip = RechartsPrimitive.Tooltip

// Chart Tooltip Content
const chartTooltipContentVariants = cva(
  "flex flex-col gap-1 rounded-lg border bg-background p-2.5 text-sm shadow-lg",
  {
    variants: {
      indicator: {
        line: "[&_.chart-tooltip-item]:flex-row",
        dot: "[&_.chart-tooltip-item]:flex-row",
        none: "",
      },
    },
    defaultVariants: {
      indicator: "dot",
    },
  }
)

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof chartTooltipContentVariants> &
    {
      hideLabel?: boolean
      hideIndicator?: boolean
      labelKey?: string
      label?: string
      labelClassName?: string
      formatter?: (value: any) => string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelClassName,
      formatter,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${item.dataKey}` as keyof typeof config
      const itemConfig = key in config ? config[key] : undefined
      const itemLabel = itemConfig?.label ?? item.name

      if (label) {
        return <div className={cn("font-medium", labelClassName)}>{label}</div>
      }

      if (itemLabel) {
        return <div className={cn("font-medium", labelClassName)}>{itemLabel}</div>
      }

      return null
    }, [label, payload, hideLabel, labelClassName, config])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "none" && !hideLabel

    return (
      <div
        ref={ref}
        className={cn(chartTooltipContentVariants({ indicator }), className)}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${item.dataKey}` as keyof typeof config
            const itemConfig = key in config ? config[key] : undefined
            const indicatorColor = itemConfig?.color ?? item.color

            return (
              <ChartTooltipItem
                key={item.dataKey || index}
                value={formatter ? formatter(item.value) : item.value}
                name={itemConfig?.label ?? item.name}
                indicator={indicator ?? "dot"}
                indicatorColor={indicatorColor}
                hideIndicator={hideIndicator}
                className={nestLabel ? "pl-3" : undefined}
              />
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

// Chart Tooltip Item
const ChartTooltipItem = ({
  value,
  name,
  className,
  indicator,
  indicatorColor,
  hideIndicator,
}: {
  value: React.ReactNode
  name?: React.ReactNode
  className?: string
  indicator: "line" | "dot" | "none"
  indicatorColor?: string
  hideIndicator?: boolean
}) => {
  return (
    <div className={cn("chart-tooltip-item grid grid-cols-[auto_1fr] items-center gap-1.5", className)}>
      {hideIndicator || indicator === "none" ? null : (
        <div
          className={cn("h-2 w-2 shrink-0 rounded-[2px]", {
            "border": indicator === "line",
            "bg-[--color-indicator]": indicator === "dot",
          })}
          style={
            {
              "--color-indicator": indicatorColor,
            } as React.CSSProperties
          }
        />
      )}
      {name ? (
        <span className="text-muted-foreground">{name}:</span>
      ) : null}
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  )
}

// Chart Legend
const ChartLegend = RechartsPrimitive.Legend

// Chart Legend Content
type ChartLegendContentProps = React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> &
  {
    hideIcon?: boolean
  }

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(
  (
    {
      className,
      hideIcon = false,
      payload,
      verticalAlign = "bottom",
    },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "mb-4" : "mt-4",
          className
        )}
      >
        {payload.map((item) => {
          const key = item.value as keyof typeof config
          const itemConfig = key in config ? config[key] : undefined

          if (!itemConfig) {
            return null
          }

          const itemLabel = itemConfig?.label ?? key
          const color = itemConfig?.color ?? item.color

          return (
            <ChartLegendItem
              key={item.value}
              value={item.value}
              label={itemLabel}
              color={color}
              hideIcon={hideIcon}
            />
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegendContent"

// Chart Legend Item
const ChartLegendItem = ({
  value,
  label,
  color,
  className,
  hideIcon,
}: {
  value: React.ReactNode
  label?: React.ReactNode
  color?: string
  className?: string
  hideIcon?: boolean
}) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {hideIcon ? null : (
        <div
          className="h-2 w-2 shrink-0 rounded-[2px] bg-[--color-legend]"
          style={{ "--color-legend": color } as React.CSSProperties}
        />
      )}
      <span className="text-muted-foreground">{label || value}</span>
    </div>
  )
}

// Chart Base Config Type
type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    itemColor?: string
  }
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartContext,
  useChart,
  type ChartConfig,
}
