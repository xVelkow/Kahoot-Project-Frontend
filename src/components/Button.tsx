import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

interface ButtonProps
extends
ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
    "rounded-md",
    {
        variants: {
            variant: {
                default: "bg-primary text-white",
                outline: "bg-white text-primary border border-primary",
            },
            size: {
                default: "px-6 py-2 text-base font-medium",
                sm: "px-4 py-1.5 text-sm font-regular",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, size, variant, ...props }, ref) => {
    return <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
});

export { Button, buttonVariants };