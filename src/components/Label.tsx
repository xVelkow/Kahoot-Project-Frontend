import { cn } from "@/utils/cn";
import { forwardRef, LabelHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

interface LabelProps
extends
LabelHTMLAttributes<HTMLLabelElement>,
VariantProps<typeof labelVariants>{
    errorMessage?: string;
}

const labelVariants = cva(
    "text-sm font-light text-primary-light flex items-center gap-x-1",
    {
        variants: {
            variant: {
                default: "text-neutral-200",
                error: "text-red-600",
            },
        },
        defaultVariants: {
            variant: "default",
        }
    }
);

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ variant, className, errorMessage, children, ...props}, ref) => {
    return <label ref={ref} className={cn("relative group",labelVariants({ variant, className }))} {...props}>
        {children}
        {
            variant === "error" &&
            (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <div className="
                        absolute left-0 bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity w-max pointer-events-none
                        bg-red-950 text-red-500 border border-red-500 text-xs font-light px-3 py-1.5 rounded-md    
                    ">{errorMessage}</div>
                </div>
            )
        }

    </label>;
});

export { Label, labelVariants };