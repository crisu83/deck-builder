import classNames from "classnames";
import { forwardRef, HTMLProps, LegacyRef } from "react";

export const FormField = forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    className={classNames(
      "form-input p-0 py-1 w-full bg-transparent border-transparent focus:border-transparent focus:ring-0 border-b-slate-500 focus:border-b-slate-500 text-sm",
      className
    )}
    type="text"
    ref={ref}
    {...props}
  />
));

FormField.displayName = "FormField";
