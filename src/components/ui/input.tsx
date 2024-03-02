import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
}

const Input: React.FC<InputProps> = ({
  className,
  type,
  register = () => {},
  ...props
}) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...register(props.name as string)}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };

export interface InputBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputBox = React.forwardRef<HTMLDivElement, InputBoxProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("flex flex-col gap-2 w-full", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputBox.displayName = "InputBox";

export { InputBox };

type InputErrorProps = React.HTMLAttributes<HTMLParagraphElement>;

const InputError = React.forwardRef<HTMLParagraphElement, InputErrorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p className={cn("text-xs text-red-500", className)} ref={ref} {...props}>
        {children}
      </p>
    );
  }
);

InputError.displayName = "InputError";

export { InputError };
