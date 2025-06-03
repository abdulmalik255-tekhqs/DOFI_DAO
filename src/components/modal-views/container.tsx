'use client';

import { Close } from '@/components/icons/close';
import { MODAL_VIEW, useModal } from '@/components/modal-views/context';
import Followers from '@/components/profile/followers-view';
import { Dialog, DialogPanel } from '@/components/ui/dialog';
import { Transition, TransitionChild } from '@/components/ui/transition';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { useLayout } from '@/lib/hooks/use-layout';
import cn from '@/utils/cn';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect } from 'react';
// dynamic imports
const SearchView = dynamic(() => import('@/components/search/view'));
const ShareView = dynamic(() => import('@/components/nft/share-view'));
const SelectWallet = dynamic(() => import('@/components/nft/select-wallet'));
const ProfileInfo = dynamic(
  () => import('@/components/profile/profile-info-view'),
);
const PreviewContent = dynamic(
  () => import('@/components/create-nft/nft-preview-content'),
);
const FundTransfer = dynamic(
  () => import('@/components/trading-bot/modals/fund-transfer'),
);
const ProfitTransfer = dynamic(
  () => import('@/components/trading-bot/modals/profit-transfer'),
);
const DCAOrderHistory = dynamic(
  () => import('@/components/trading-bot/modals/dca-order-history'),
);
const DCAStepper = dynamic(
  () => import('@/components/trading-bot/modals/dca-stepper'),
);

const CoinSelectView = dynamic(
  () => import('@/components/ui/coin-select-view'),
);
const ArbitrageCoinSelectView = dynamic(
  () => import('@/components/ui/arbitrage-coin-select-view'),
  {
    ssr: false,
  },
);
const FindNameView = dynamic(() => import('@/components/search/find-name'), {
  ssr: false,
});
const CreateIDOView = dynamic(() => import('@/components/ido/create-ido'), {
  ssr: false,
});
const ZkProofView = dynamic(() => import('@/components/ido/zk-proof'), {
  ssr: false,
});
const OpenWizardView = dynamic(() => import('@/components/wizard/wizard'), {
  ssr: false,
});
const OpenWizardEnhancveView = dynamic(
  () => import('@/components/wizard-enchance/wizard-enchance'),
  {
    ssr: false,
  },
);
const SuccessBuyView = dynamic(() => import('@/components/ido/success-buy'), {
  ssr: false,
});
const FractionCardView = dynamic(
  () => import('@/components/fractions-card-modal'),
  {
    ssr: false,
  },
);
const PayTokenAmountView = dynamic(
  () => import('@/components/ido/pay-token-amount'),
  {
    ssr: false,
  },
);
const ProposalAcceptView = dynamic(
  () => import('@/components/proposal-accept/proposal-accept'),
);
const ConnectWalletView = dynamic(
  () => import('@/components/connect-wallet-popup/index'),
);
function renderModalContent(view: MODAL_VIEW | string, data?: any) {
  switch (view) {
    case 'SEARCH_VIEW':
      return <SearchView />;
    case 'SHARE_VIEW':
      return <ShareView />;
    case 'WALLET_CONNECT_VIEW':
      return <SelectWallet />;
    case 'PROFILE_INFO_VIEW':
      return <ProfileInfo />;
    case 'FOLLOWING_VIEW':
      return <Followers />;
    case 'FOLLOWERS_VIEW':
      return <Followers />;
    case 'NFT_PREVIEW':
      return <PreviewContent />;
    case 'FUND_TRANSFER_PREVIEW':
      return <FundTransfer />;
    case 'PROFIT_TRANSFER_PREVIEW':
      return <ProfitTransfer />;
    case 'DCA_ORDER_HISTORY':
      return <DCAOrderHistory />;
    case 'DCA_STEPPER':
      return <DCAStepper />;
    case 'FIND_NAME':
      return <FindNameView data={data} />;
    case 'PROPOSAL_ACCEPT':
      return <ProposalAcceptView data={data} />;
    case 'CREATE_IDO':
      return <CreateIDOView data={data} />;
    case 'ZK_PROOF':
      return <ZkProofView data={data} />;
    case 'OPEN_WIZARD':
      return <OpenWizardView data={data} />;
    case 'OPEN_WIZARD_ENCHANCE':
      return <OpenWizardEnhancveView data={data} />;
    case 'SUCCESSFULLY_BUY_DIO':
      return <SuccessBuyView />;
    case 'PAY_TOKEN_AMOUNT':
      return <PayTokenAmountView data={data} />;
    case 'FRACTIONS':
      return <FractionCardView data={data} />;
    case 'SWAP_COIN_SELECT':
      const handleSelectedCoin = data?.handleSelectedCoin;
      return (
        <CoinSelectView
          onSelect={(selectedCoin) => handleSelectedCoin(selectedCoin)}
        />
      );
    case 'ARBITRAGE_COIN_SELECT':
      const handleArbitrageSelectedCoin = data?.handleArbitrageSelectedCoin;
      return (
        <ArbitrageCoinSelectView
          onSelect={(selectedCoin) => handleArbitrageSelectedCoin(selectedCoin)}
        />
      );
    case 'CONNECT_WALLET':
      return <ConnectWalletView />;
    default:
      return null;
  }
}

export default function ModalContainer() {
  const { view, isOpen, closeModal, data } = useModal();
  const { layout } = useLayout();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    closeModal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 !z-[999] h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        onClose={closeModal}
      >
        <div className="flex min-h-full flex-col items-center justify-center">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-10 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur" />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          {view && view !== 'SEARCH_VIEW' && (
            <span
              className="inline-block h-full align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
          )}

          {/* This element is need to fix FocusTap headless-ui warning issue */}
          <div className="sr-only">
            <button
              onClick={closeModal}
              className="opacity-50 hover:opacity-80"
            >
              <Close className="h-auto w-[13px]" />
            </button>
          </div>

          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-105"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-105"
          >
            <DialogPanel className="pointer-event-none relative !z-30 overflow-hidden transition-all">
              <div
                className={cn(
                  'pointer-events-auto relative z-50 inline-block w-full text-left align-middle',
                  layout === LAYOUT_OPTIONS.RETRO ? 'sm:w-auto' : 'xs:w-auto',
                )}
              >
                {view && renderModalContent(view, data)}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
