import { forwardRef, InputHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

interface InputProps
extends
Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
VariantProps<typeof inputVariants> {}

const inputVariants = cva(
    "w-full text-neutral-200 text-sm px-5 py-2.5 rounded-md bg-primary-accent outline-none focus:ring-1 focus:ring-primary focus:border-transparent auto-fill-none",
    {
        variants: {
            variant: {
                default: "",
                error: "border border-red-700",
            },
            size: {
                default: "md:w-44",
                lg: "md:w-92",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, size, variant, ...props }, ref) => {
    return <input
        ref={ref} className={cn(inputVariants({ variant, size, className }))} {...props}
    />
});

export { Input, inputVariants };