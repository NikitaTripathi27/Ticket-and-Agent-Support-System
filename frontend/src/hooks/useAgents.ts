import { FetchAgents } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useAgents = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => await FetchAgents(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
