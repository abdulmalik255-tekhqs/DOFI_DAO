/* eslint-disable import/no-anonymous-default-export */
import { API_ENDPOINTS } from '@/data/utils/endpoints';
import type {
  CoinPaginator,
  CoinPrice,
  CryptoQueryOptions,
  GetParams,
  Settings,
  SettingsQueryOptions,
} from '@/types';
import { HttpClient } from '@/data/utils/client';

class client {

  coins = {
    all: ({ id, name, symbol, ...query }: Partial<CryptoQueryOptions> = {}) =>
      HttpClient.get<CoinPaginator>(API_ENDPOINTS.MARKETS, {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '10000',
        page: '1',
        sparkline: 'false',
        price_change_percentage: '1h,24h,7d',
        ...query,
      }),
    get: ({ id }: GetParams) =>
      HttpClient.get<CoinPrice>(`${API_ENDPOINTS.PRICING}/${id}`),
  };

  marketChart = {
    get: ({ id }: GetParams) =>
      HttpClient.get<CoinPrice>(
        `${API_ENDPOINTS.PRICING}/${id}/market_chart?vs_currency=usd&days=30`
      ),
  };
  settings = {
    all: (params?: SettingsQueryOptions) =>
      HttpClient.get<Settings>(API_ENDPOINTS.SETTINGS, { ...params }),
  };
  live_pricing = {
    all: (params?: SettingsQueryOptions, address?: string) =>
      HttpClient.get<Settings>(`${API_ENDPOINTS.LIVE_PRICING}?address=${address}`, { ...params }),
  };
  findName = {
    create: (name: string, address: string) =>
      HttpClient.get(`${API_ENDPOINTS.FIND_NAME}/${encodeURIComponent(name)}?address=${address}`),
  };
  submitBuy = {
    create: async (data: { id: string }, address: string) => {
      const response = await HttpClient.post(`${API_ENDPOINTS.BUY}/${data.id}?address=${address}`);
      return response;  // Return the response directly
    },
  };
  createido = {
    create: (data: any, address: string) =>
      HttpClient.post(`${API_ENDPOINTS.CREATE_IDO}?address=${address}`, data),
  };
  dao = {
    getLatest: (address: any) => HttpClient.get(`${API_ENDPOINTS.LATEST_DAO}?address=${address}`),
  };
  ido = {
    getLatestIDO: (address: any) => HttpClient.get(`${API_ENDPOINTS.LIVE_PRICING}?address=${address}`),
  };
  idoDetail = {
    getSingleIDO: (idoID:string,address:any) => HttpClient.get(`${API_ENDPOINTS.SINGLE_IDO}/${idoID}?address=${address}`),
  };
  shareIDOBuy = {
    create: async (id: string, data: any, address: string) => {
      const response = await HttpClient.post(`${API_ENDPOINTS.BUY_SHARE_IDO}/${id}/invest?address=${address}`, data);
      return response;
    },
  };
  proposals = {
    getLatestProposals: (address: any) => HttpClient.get(`${API_ENDPOINTS.GET_PROPOSALS}?address=${address?.toLowerCase()}&daoId=680a76bce48a31fb65d162dd&daoType=parent`),
  };
  proposalsDomainDao = {
    getLatestProposalsDomainDao: (address: any) => HttpClient.get(`${API_ENDPOINTS.GET_PROPOSALS}?address=${address?.toLowerCase()}&daoId=${localStorage.getItem("Domain_Dao")}&daoType=child`),
  };
  all_nfts = {
    getLatestNfts: (address: any) => HttpClient.get(`${API_ENDPOINTS.GET_NFTS}?address=${address}`),
  };
  all_propsals_nfts = {
    getLatestPropsalNFTS: (address: any) => HttpClient.get(`${API_ENDPOINTS.GET_NFTS_PROPOSAL}?address=${address}`),
  };
  createPropsals = {
    create: (data: any, address: string) =>
      HttpClient.post(`${API_ENDPOINTS.POST_PROPSALS}?address=${address}`, data),
  };
  postVote = {
    create: (data: any, address: string) =>
      HttpClient.post(`${API_ENDPOINTS.POST_VOTE}?address=${address}`, data),
  };
  latestDomain = {
    getLatestDomain: (address:any) => HttpClient.get(`${API_ENDPOINTS.GET_LATEST_DOMAIN}?address=${address}`),
  };
  fetchNFT = {
    getOwnerNFT: (address:any) => HttpClient.get(`${API_ENDPOINTS.OWNER_NFT}?address=${address}`),
  };
}

export default new client();
