import { useQuery } from "@tanstack/react-query";

interface Props<T> {
  fetcher: () => Promise<T>;
  children: (data: T) => React.ReactNode;
}

function Fetcher<T extends object>({ fetcher, children }: Props<T>) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [location.href],
    queryFn: fetcher,
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>{JSON.stringify(error)}</div>;

  return <>{children(data)}</>;
}

export default Fetcher;
