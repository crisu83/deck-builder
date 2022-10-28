import classNames from "classnames";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export function Table({ className, children }: Props) {
  return (
    <table
      className={classNames(
        "border-collapse table-fixed w-full text-sm",
        className
      )}
    >
      {children}
    </table>
  );
}

export function TableHeading({ className, children }: Props) {
  return (
    <th
      className={classNames(
        "border-b border-slate-600 font-medium p-4 pl-8 text-slate-200 text-left",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableBody({ className, children }: Props) {
  return (
    <tbody className={classNames("bg-slate-800", className)}>{children}</tbody>
  );
}

export function TableRow({ className, children }: Props) {
  return (
    <td
      className={classNames(
        "border-b border-slate-700 p-4 pl-8 text-slate-400",
        className
      )}
    >
      {children}
    </td>
  );
}
