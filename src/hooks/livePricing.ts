import client from '@/data/utils';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { API_ENDPOINTS } from '@/data/utils/endpoints';
import { useMutation } from '@tanstack/react-query';
import { CoinPaginator, CryptoQueryOptions } from '@/types';
import { useModal } from '@/components/modal-views/context';
import {
  useQuery,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import routes from '@/config/routes';
import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido.reducer';

export function useLivePricing(
  options?: Partial<CryptoQueryOptions>,
  config?: UseInfiniteQueryOptions<CoinPaginator, Error>,
) {
  const { address } = useAccount();
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
      client.live_pricing.all({ ...options, page: pageParam },address),
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
  const { address } = useAccount();
  return useMutation({
    //@ts-ignore
    mutationFn: (name: string) => client.findName.create(name, address),
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('Submission failed:', error);
    },
  });
}

export function useBuyQuery() {
  const { address } = useAccount();
  const { openModal,closeModal  } = useModal();
  
  return useMutation({
    //@ts-ignore
    mutationFn: (data: { id: string }) => client.submitBuy.create(data, address),
    onSuccess: (data) => {
      closeModal(); 
      if(data){
        openModal('CREATE_IDO', data);
      }
    },
    onError: (error) => {
      console.error('Submission failed:', error);
    },
  });
}


  export function useCreateIDO() {
    const { address } = useAccount();
     const router = useRouter();
    //  const dispatch= useDispatch();
    return useMutation({
      //@ts-ignore
      mutationFn: (data: any) => client.createido.create(data,address),
      onSuccess: (data) => {
        if(data){
          // dispatch(idoActions.saveIDOdetailData(data));
          router.push(routes.idoDetail);
        }
      },
      onError: (error) => {
        // Optionally handle error
        console.error('Submission failed:', error);
      },
    });
  }
  export function useDao() {
      const { address } = useAccount();
    const { data, isLoading, error } = useQuery({
      queryKey: ['dao-latest'],
      queryFn: () => client.dao.getLatest(address),
    });
    return {
      dao: data,
      isLoading,
      error,
    };
  }

  export function useIDO() {
    const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['ido-latest'],
    queryFn: () => client.ido.getLatestIDO(address),
  });
  return {
    ido: data,
    isLoading,
    error,
  };
}