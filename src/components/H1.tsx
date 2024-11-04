import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes, } from "react";

interface H1Props
extends
HTMLAttributes<HTMLHeadingElement>,
VariantProps<typeof h1Variants>{};

const h1Variants = cva(
    "cursor-default",
    {
        variants: {
            variant: {
                page: "text-4xl md:text-5xl font-bold text-neutral-200",
                section: "text-3xl md:text-4xl font-medium text-primary-light",
                form: "text-3xl md:text-4xl font-medium text-primary-light",
            }
        }
    }
);

const H1 = forwardRef<HTMLHeadingElement, H1Props>(({variant, className, ...props}, ref) => {
    return <h1 ref={ref} className={cn(h1Variants({ variant, className }))} {...props} />
});

export { H1, h1Variants };