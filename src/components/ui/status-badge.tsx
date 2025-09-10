import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        success: "bg-accent/10 text-accent border border-accent/20",
        pending: "bg-pending-light text-pending border border-pending/20", 
        error: "bg-error-light text-error border border-error/20",
        warning: "bg-warning-light text-warning border border-warning/20",
        "manual-review": "bg-manual-review-light text-manual-review border border-manual-review/20",
        processing: "bg-secondary text-secondary-foreground border border-secondary-vibrant/20",
        completed: "bg-accent/10 text-accent border border-accent/20",
        failed: "bg-error-light text-error border border-error/20",
        expired: "bg-muted text-muted-foreground border border-border",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "default",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: 'success' | 'pending' | 'error' | 'warning' | 'manual-review' | 'processing' | 'completed' | 'failed' | 'expired';
}

function StatusBadge({ className, status, size, ...props }: StatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ status, size }), className)}
      {...props}
    />
  );
}

export { StatusBadge, statusBadgeVariants };