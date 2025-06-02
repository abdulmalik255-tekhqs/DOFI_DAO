import { useEffect, useState } from 'react';
import { SearchIcon } from '@/components/icons/search';
import { useModal } from '@/components/modal-views/context';
import { useSubmitFindNameQuery } from '@/hooks/livePricing';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useAccount } from 'wagmi';
import ToastNotification from '../ui/toast-notification';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { idodetailActions } from '@/store/reducer/dio-detail.reducer';
import Bg from '@/assets/images/dao/BG-REGISTER.png';
import Image from 'next/image';

export default function GlobalFilter() {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const { address } = useAccount();
  const {
    mutate: submitCreate,
    data: searchResult,
    isSuccess,
    isError,
    error,
  }: any = useSubmitFindNameQuery();

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.trim() !== '') {
        try {
          submitCreate(inputValue.trim());
        } catch (err) {}
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, submitCreate]);
  const handleModal = () => {
    if (!address) {
      ToastNotification('error', 'Connect wallet first!');
      return;
    }
    if (inputValue.trim() === '') {
      ToastNotification('error', 'Enter domain name');
      return;
    }
    dispatch(idoActions.setLoading(false));
    dispatch(idodetailActions.saveIDOdata({}));
    dispatch(idoActions.goToStep(0));
    openModal('OPEN_WIZARD_ENCHANCE', searchResult?.data);
    // openModal('OPEN_WIZARD', searchResult?.data)
  };
  const getValue = () => {
    const name = searchResult?.data?.name;
    const extension = name.split('.')[1]; // returns 'eth'
    return `.${extension}`;
  };
  return (
    <div className="mb-[40px] flex-1 text-center ltr:ml-auto rtl:mr-auto">
      <div
        className="flex flex-col gap-[38px] rounded-[12px] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Bg.src})` }}
      >
        {' '}
        <h2 className="mt-[46px] flex shrink-0 items-center justify-center text-center text-[32px] font-[800] text-[#0F172A]">
          Register Your Domain Name
        </h2>
        <label className="relative mb-[46px] hidden w-full items-center justify-center md:flex">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-[59px] w-[550px] appearance-none rounded-bl-[12px] rounded-tl-[12px] border border-gray-400 bg-transparent text-[16px] font-[400] tracking-tighter text-[#A1A1AA] transition-all placeholder:text-[#A1A1AA] focus:shadow-none focus:outline-none focus:ring-0 rtl:pr-10"
            placeholder="Find your domain name"
          />
          <span className="flex h-[59px] items-center justify-center text-gray-600 hover:text-gray-900 dark:text-white">
            {inputValue?.length > 0 ? (
              searchResult?.success === false ? (
                <div className="flex h-[59px] w-auto cursor-not-allowed items-center gap-2 rounded-br-[12px] rounded-tr-[12px] bg-red-300 p-4 text-white">
                  NFT Not found
                </div>
              ) : searchResult?.success === true ? (
                <div
                  className="flex h-[59px] w-auto cursor-pointer items-center gap-2 rounded-br-[12px] rounded-tr-[12px] bg-green-500 p-4 text-white"
                  onClick={() => handleModal()}
                >
                  {!isSuccess ? 'Loading' : `${getValue()} view`}
                  <FaLongArrowAltRight className="cursor-pointer" />
                </div>
              ) : (
                <div className="flex h-[59px] w-[141px] items-center justify-center rounded-br-[12px] rounded-tr-[12px] bg-black">
                  <p className="text-[16px] font-[500] text-white">Search</p>
                </div>
              )
            ) : (
              <div className="flex h-[59px] w-[141px] items-center justify-center rounded-br-[12px] rounded-tr-[12px] bg-black">
                <p className="text-[16px] font-[500] text-white">Search</p>
              </div>
            )}
          </span>
        </label>
      </div>
    </div>
  );
}
