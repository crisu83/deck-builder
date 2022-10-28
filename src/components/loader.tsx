import { PropsWithChildren } from "react";

type LoaderProps = PropsWithChildren<{ loading: boolean; error?: any }>;

export function Loader({ loading, error, children }: LoaderProps) {
  if (loading) {
    return null;
  }
  if (error) {
    return <>Something went wrong.</>;
  }
  return <>{children}</>;
}
