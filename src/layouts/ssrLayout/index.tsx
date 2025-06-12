import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/src/api/getQueryClient";
import React from "react";

interface ISSRWrapper {
  queryKey: any;
  apiCall: () => Promise<any>;
  children: React.ReactNode;
  isInfiniteQuery?: boolean;
}

const SSRWrapper = async ({ children, queryKey, apiCall }: ISSRWrapper) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => apiCall(),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};

export default SSRWrapper;
