import { cn } from "@/utils/cn";
import { forwardRef, LabelHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

interface LabelProps
extends
LabelHTMLAttributes<HTMLLabelElement>,
VariantProps<typeof labelVariants>{}

const labelVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "text-neutral-200",
                error: "text-red-700",
                valid: "text-green-700",
            },
        },
        defaultVariants: {
            variant: "default",
        }
    }
);

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ variant, className, ...props}, ref) => {
    return <label ref={ref} className={cn(labelVariants({ variant, className }))} {...props} />;
});

export { Label, labelVariants };