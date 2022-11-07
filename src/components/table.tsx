import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export function Table({ className, children, ...props }: Props) {
  return (
    <table
      {...props}
      className={classNames(
        "border-collapse table-fixed w-full text-sm",
        className
      )}
    >
      {children}
    </table>
  );
}

export function TableHead({ className, children, ...props }: Props) {
  return (
    <thead {...props} className={classNames("", className)}>
      {children}
    </thead>
  );
}

export function TableRow({ className, children, ...props }: Props) {
  return (
    <tr {...props} className={classNames("", className)}>
      {children}
    </tr>
  );
}

export function TableHeaderCell({ className, children, ...props }: Props) {
  return (
    <th
      {...props}
      className={classNames(
        "border-b border-slate-600 font-medium p-4 text-slate-200 text-left",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableBody({ className, children, ...props }: Props) {
  return (
    <tbody {...props} className={classNames("bg-slate-800", className)}>
      {children}
    </tbody>
  );
}

export function TableDataCell({ className, children, ...props }: Props) {
  return (
    <td
      {...props}
      className={classNames(
        "border-b border-slate-700 p-4 text-slate-400",
        className
      )}
    >
      {children}
    </td>
  );
}
