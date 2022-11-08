import { DependencyList, KeyboardEvent, useEffect } from "react";

export function useOnKeyDown(handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener("keydown", handler as never);
    return () => {
      document.removeEventListener("keydown", handler as never);
    };
  }, [handler]);
}
