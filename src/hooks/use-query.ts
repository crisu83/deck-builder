import useSWR from "swr";

export function useQuery<Data, Error = any>(key: string, shouldFetch = true) {
  const { data: response, error } = useSWR<{ data: Data }, Error>(
    shouldFetch ? key : null,
    fetcher
  );
  const data = response?.data;

  return {
    loading: !error && !data,
    data,
    error,
  };
}

async function fetcher(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, init);
  return res.json();
}
