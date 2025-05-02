import client from '@/data/utils';
import { useAccount } from 'wagmi';
import { API_ENDPOINTS } from '@/data/utils/endpoints';
import { CoinPaginator, CryptoQueryOptions } from '@/types';
import { useModal } from '@/components/modal-views/context';
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import routes from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import ToastNotification from '@/components/ui/toast-notification';

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
      client.live_pricing.all({ ...options, page: pageParam }, address),
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
  const { openModal } = useModal();
  const dispatch = useDispatch()
  return useMutation({
    //@ts-ignore
    mutationFn: (data: { id: string }) => client.submitBuy.create(data, address),
    onSuccess: (data) => {
      if (data) {
        dispatch(idoActions.setLoading(false))
        //@ts-ignore
        openModal('CREATE_IDO', data?.data);
      }
    },
    onError: (error) => {
      dispatch(idoActions.setLoading(false))
      console.error('Submission failed:', error);
    },
  });
}
export function useCreateIDO() {
  const { address } = useAccount();
  const router = useRouter();
  const dispatch = useDispatch();
  return useMutation({
    //@ts-ignore 
    mutationFn: (data: any) => client.createido.create(data, address),
    onSuccess: (data) => {
      if (data) {
        //@ts-ignore
        dispatch(idoActions.saveIDOdata(data?.data));
        dispatch(idoActions.setLoading(false));
        dispatch(idoActions.setIsConfetti(false));
        router.push(routes.idoDetail);
      }
    },
    onError: (error) => {
      // Optionally handle error
      dispatch(idoActions.setLoading(false))
      console.error('Submission failed:', error);
    },
  });
}
export function useDao() {
  const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dao-latest', address],
    queryFn: () => client.dao.getLatest(address),
    enabled: !!address,
  });
  return {
    dao: data,
    isLoading,
    error,
  };
}

export function useIDO() {
  const { address } = useAccount();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['ido-latest', address],
    queryFn: () => client.ido.getLatestIDO(address),
    enabled: !!address,
  });
  return {
    ido: data,
    isLoading,
    error,
    refetch
  };
}


export function useGetIDODetail() {
  const { address } = useAccount();
  return useMutation({
    //@ts-ignore
    mutationFn: (id: string) => client.idoDetail.getSingleIDO(id, address),
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.error('Submission failed:', error);
    },
  });
}


export function useBuyShareIDO() {
  const { address } = useAccount();
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const dispatch = useDispatch()
  return useMutation({
    //@ts-ignore
    mutationFn: ({ id, data }: { id: string; data: any }) => client.shareIDOBuy.create(id, data, address),
    onSuccess: (data) => {
      // closeModal(); 
      if (data) {
        openModal('SUCCESSFULLY_BUY_DIO');
        dispatch(idoActions.setIsConfetti(true));
        dispatch(idoActions.setLoading(false));
      }
    },
    onError: (error) => {
      dispatch(idoActions.setLoading(false));
      console.error('Submission failed:', error);
    },
  });
}

export function useGetProposal() {
  const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['proposal-latest'],
    queryFn: () => client.proposals.getLatestProposals(address),
  });
  return {
    proposals: data,
    isLoading,
    error,
  };
}

export function useGetProposalDomainDao() {
  const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['proposal-domaindao-latest'],
    queryFn: () => client.proposalsDomainDao.getLatestProposalsDomainDao(address),
  });
  return {
    proposalsDomainDao: data,
    isLoading,
    error,
  };
}

export function useGetNFTS() {
  const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-nfts-latest'],
    queryFn: () => client.all_nfts.getLatestNfts(address),
  });
  return {
    all_nfts: data,
    isLoading,
    error,
  };
}

export function useGetALLPropsalNFTS() {
  const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['all_Propsal_NFTS-latest'],
    queryFn: () => client.all_propsals_nfts.getLatestPropsalNFTS(address),
  });
  return {
    all_Propsal_NFTS: data,
    isLoading,
    error,
  };
}


export function useCreatePropsals(path: any) {
  const { address } = useAccount();
  const router = useRouter();
  const dispatch = useDispatch()
  //  const dispatch= useDispatch();
  return useMutation({
    //@ts-ignore
    mutationFn: (data: any) => client.createPropsals.create(data, address),
    onSuccess: (data) => {
      if (data) {
        // dispatch(idoActions.saveIDOdetailData(data));
        if (path == "child") {
          dispatch(idoActions.setLoading(false));
          router.push(routes.domain);
        } else {
          dispatch(idoActions.setLoading(false));
          router.push(routes.proposals);
        }

      }
    },
    onError: (error) => {
      dispatch(idoActions.setLoading(false));
      // Optionally handle error
      console.error('Submission failed:', error);
    },
  });
}

export function usePostVote() {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  return useMutation({
    //@ts-ignore
    mutationFn: (data: any) => client.postVote.create(data, address),
    onSuccess: (data) => {
      if (data) {
        // dispatch(idoActions.saveIDOdetailData(data));
        dispatch(idoActions.setLoading(false));
        queryClient.invalidateQueries({ queryKey: ['proposal-latest'] });
        router.push(routes.proposals);
      }
    },
    onError: (error) => {
      dispatch(idoActions.setLoading(false));
      // Optionally handle error
      console.error('Submission failed:', error);
    },
  });
}

export function useLatestDomain() {
  const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['domain-latest'],
    queryFn: () => client.latestDomain.getLatestDomain(address),
  });
  return {
    domainData: data,
    isLoading,
    error,
  };
}

export function useFetchOwnerAllNfts() {
  const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-nft-latest'],
    queryFn: () => client.fetchNFT.getOwnerNFT(address),
  });
  return {
    ownerNFT: data,
    isLoading,
    error,
  };
}

export function useFetchNFTSWAP() {
  const { address } = useAccount();
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-nft-swap-latest'],
    queryFn: () => client.fetchNFTSwap.getOwnerNFTSwap(address),
  });
  return {
    NFTSwap: data,
    isLoading,
    error,
  };
}


export function usePostCaculate() {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const router = useRouter();
  //  const dispatch= useDispatch();
  return useMutation({
    //@ts-ignore
    mutationFn: (data: any) => client.postCalulation.create(data, address),
    onSuccess: (data: any) => {
      if (data) {
        // queryClient.invalidateQueries({ queryKey: ['proposal-latest'] });
        // router.push(routes.proposals);
      }
    },
    onError: (error) => {
      // Optionally handle error
      console.error('Submission failed:', error);
    },
  });
}

export function useSwap() {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  return useMutation({
    //@ts-ignore
    mutationFn: (data: any) => client.swapToken.create(data, address),
    onSuccess: (data) => {
      if (data) {
        dispatch(idoActions.setLoading(false));
        ToastNotification('success', 'Successfully swap token!');
        return;
      }
    },
    onError: (error) => {
      dispatch(idoActions.setLoading(false));
      // Optionally handle error
      console.error('Submission failed:', error);
    },
  });
}



export function usePostPayToken() {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  return useMutation({
    //@ts-ignore
    mutationFn: (data: any) => client.postPaytoken.create(data, address),
    onSuccess: (data) => {
      if (data) {
        dispatch(idoActions.setLoading(false));
        ToastNotification('success', 'Successfully Pay!');
        closeModal();
      }
    },
    onError: (error) => {
      dispatch(idoActions.setLoading(false));
      // Optionally handle error
      console.error('Submission failed:', error);
    },
  });
}