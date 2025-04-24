import client from '@/data/utils';
import { API_ENDPOINTS } from '@/data/utils/endpoints';
import { useMutation } from '@tanstack/react-query';
import { CoinPaginator, CoinPrice, CryptoQueryOptions } from '@/types';
import {
  useQuery,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export function useLivePricing(
  options?: Partial<CryptoQueryOptions>,
  config?: UseInfiniteQueryOptions<CoinPaginator, Error>,
) {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: [API_ENDPOINTS.LIVE_PRICING, options],
    queryFn: ({ pageParam }) =>
      client.live_pricing.all({ ...options, page: pageParam }),
    initialPageParam: 1,
    ...options,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      null,
    getPreviousPageParam: (
      firstPage,
      allPages,
      firstPageParam,
      allPageParams,
    ) => null,
  });
  return {
    liveData: result,
    paginatorInfo: Array.isArray(result.data?.pages)
      ? result.data?.pages[result.data.pages.length - 1]
      : null,
    isLoading: result.isLoading,
    error: result.error,
    hasNextPage,
    isFetching: result.isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: fetchNextPage(),
  };
}


export function useSubmitFindNameQuery() {
    return useMutation({
      mutationFn: (data: any) => client.findName.create(data),
      onSuccess: (data) => {
        // Optionally handle success (e.g. show toast, refetch queries, etc.)
        console.log('Submitted successfully:', data);
      },
      onError: (error) => {
        // Optionally handle error
        console.error('Submission failed:', error);
      },
    });
  }
  export function useBuyQuery() {
    return useMutation({
      mutationFn: (data: any) => client.submitBuy.create(data),
      onSuccess: (data) => {
        // Optionally handle success (e.g. show toast, refetch queries, etc.)
        console.log('Submitted successfully:', data);
      },
      onError: (error) => {
        // Optionally handle error
        console.error('Submission failed:', error);
      },
    });
  }
  export function useDao() {
    const { data, isLoading, error } = useQuery({
      queryKey: ['dao-latest'],
      queryFn: () => client.dao.getLatest(),
    });
  
    return {
      dao: data,
      isLoading,
      error,
    };
  }