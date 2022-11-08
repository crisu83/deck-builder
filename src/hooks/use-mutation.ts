import { MutatorOptions, useSWRConfig } from "swr";

export function useMutation<T>(
  key: string
): (input: unknown, options?: MutatorOptions) => Promise<T> {
  const updateFn = async (url: string, input: unknown) => {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await res.json();
    return data as T;
  };
  const { mutate } = useSWRConfig();
  return (input, options) => mutate(key, updateFn(key, input), options);
}
