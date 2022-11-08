import classNames from "classnames";
import { HTMLProps } from "react";

export function Table({ className, ...props }: HTMLProps<HTMLTableElement>) {
  return (
    <table
      {...props}
      className={classNames(
        "border-collapse table-fixed w-full text-sm",
        className
      )}
    />
  );
}

export function TableHead({
  className,
  ...props
}: HTMLProps<HTMLTableSectionElement>) {
  return <thead {...props} className={classNames("", className)} />;
}

export function TableBody({
  className,
  ...props
}: HTMLProps<HTMLTableSectionElement>) {
  return <tbody {...props} className={classNames("bg-slate-800", className)} />;
}

export function TableRow({
  className,
  ...props
}: HTMLProps<HTMLTableRowElement>) {
  return <tr {...props} className={classNames("", className)} />;
}

export function TableHeaderCell({
  className,
  ...props
}: HTMLProps<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className={classNames(
        "border-b border-slate-600 font-medium p-4 text-slate-200 text-left",
        className
      )}
    />
  );
}

export function TableDataCell({
  className,
  ...props
}: HTMLProps<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className={classNames(
        "border-b border-slate-700 p-4 text-slate-400",
        className
      )}
    />
  );
}
