import * as React from "react";
import { cn } from "@/lib/cn";
import { LoaderCircle } from "lucide-react";

const buttonClassNames = cn(
  "inline-flex flex-row items-center justify-center gap-1.5 whitespace-nowrap",
  "px-4 py-2 rounded-md bg-white hover:bg-white/90 transition-colors",
  "text-base font-medium",
  "ring-offset-grey-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey-800 focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading, disabled, children, ...props }, ref) => {
    const isDisabled = loading || disabled;
    return (
      <button
        disabled={isDisabled}
        className={cn(buttonClassNames, className)}
        ref={ref}
        {...props}
      >
        <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
          {children}
        </span>
        {loading && (
          <LoaderCircle className="animate-spin text-blue-500 stroke-2" />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
