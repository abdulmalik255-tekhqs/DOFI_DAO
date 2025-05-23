'use client';

import { idoActions } from '@/store/reducer/ido-reducer';
import { atom, useAtom } from 'jotai';
import { useDispatch } from 'react-redux';

export type MODAL_VIEW =
  | 'SEARCH_VIEW'
  | 'SHARE_VIEW'
  | 'WALLET_CONNECT_VIEW'
  | 'PROFILE_INFO_VIEW'
  | 'FOLLOWING_VIEW'
  | 'FOLLOWERS_VIEW'
  | 'NFT_PREVIEW'
  | 'FUND_TRANSFER_PREVIEW'
  | 'PROFIT_TRANSFER_PREVIEW'
  | 'DCA_ORDER_HISTORY'
  | 'DCA_STEPPER'
  | 'SWAP_COIN_SELECT'
  | 'FIND_NAME'
  | 'CREATE_IDO'
  | 'PROPOSAL_ACCEPT'
  | 'SUCCESSFULLY_BUY_DIO'
  | 'PAY_TOKEN_AMOUNT'
  | 'OPEN_WIZARD'
  | "ZK_PROOF"
  | "FRACTIONS"
  ;

interface ModalTypes {
  isOpen: boolean;
  view: MODAL_VIEW;
  data: any;
}

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: 'SEARCH_VIEW',
  data: null,
});

export function useModal() {
  const [state, setState] = useAtom(modalAtom);
  const dispatch = useDispatch()
  const openModal = (view: MODAL_VIEW, data?: any) =>
    setState((prev) => ({ ...prev, isOpen: true, view, data }));
  const closeModal = () => {
     dispatch(idoActions.setIsConfetti(false));
    setState((prev) => ({ ...prev, isOpen: false }))
  }

  return {
    ...state,
    openModal,
    closeModal,
  };
}
