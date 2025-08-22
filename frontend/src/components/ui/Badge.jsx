$
import { cn } from "@/lib/utils"

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: "approved" | "pending" | "default"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        {
          "bg-blue-50 text-blue-700": variant === "approved",
          "bg-orange-50 text-orange-700": variant === "pending",
          "bg-gray-100 text-gray-800": variant === "default",
        },
        className,
      )}
      {...props}
    />
  )
}

function BadgeIndicator({
  className,
  variant = "default",
}: { className?: string; variant?: "approved" | "pending" | "default" }) {
  return (
    <span
      className={cn(
        "h-2 w-2 rounded-full",
        {
          "bg-blue-500": variant === "approved",
          "bg-orange-500": variant === "pending",
          "bg-gray-500": variant === "default",
        },
        className,
      )}
    />
  )
}

export { Badge, BadgeIndicator }
