import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-[#172e27] text-white hover:bg-[#284b3f]",secondary:"bg-[#edf2ef] text-[#172e27] hover:bg-[#dfe9e4]"},size:{default:"h-10 px-4",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{asChild?:boolean}
export const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,size,asChild=false,...props},ref)=>{const Comp=asChild?Slot:"button";return <Comp className={cn(buttonVariants({variant,size,className}))} ref={ref} {...props}/>});
Button.displayName="Button";
