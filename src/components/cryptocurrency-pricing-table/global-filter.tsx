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

export default function GlobalFilter() {
  const { openModal } = useModal();
  const dispatch = useDispatch()
  const { address } = useAccount();
  const {
    mutate: submitCreate,
    data: searchResult,
    isSuccess,
    isError,
    error,
  } = useSubmitFindNameQuery();

  const [inputValue, setInputValue] = useState('');
  console.log(searchResult, "searchResult");

  // Update external state

  // Debounce the API call on input change
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.trim() !== '') {
        try {
          //@ts-ignore
          submitCreate(inputValue.trim());
        } catch (err) {
          console.error(err);
        }
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
    //@ts-ignore
    openModal('OPEN_WIZARD', searchResult?.data)
  }
  const getValue = () => {
    //@ts-ignore
    const name = searchResult?.data?.name;
    const extension = name.split('.')[1]; // returns 'eth'
    console.log(`.${extension}`);
    return `.${extension}`
  }
  return (
    <div className="mb-[40px] flex-1 text-center ltr:ml-auto rtl:mr-auto">
      <div className='gap-[38px] flex flex-col bg-black rounded-[12px]'>
        <h2 className="flex mt-[46px] shrink-0 items-center justify-center text-center text-[32px] font-[500] uppercase tracking-wider text-white">
          Register your name today
        </h2>
        <label className="mb-[46px] relative hidden w-full items-center justify-center  md:flex">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-[59px] w-[550px] appearance-none rounded-tl-[12px] rounded-bl-[12px] bg-[#18181B] text-[16px] font-[400] tracking-tighter text-[#A1A1AA] focus:outline-none focus:ring-0 focus:shadow-none  transition-all placeholder:text-[#A1A1AA] border border-[#3F3F46] rtl:pr-10"
            placeholder="Find your domain name"
          />
          <span className="flex h-[59px] items-center justify-center text-gray-600 hover:text-gray-900 dark:text-white">
            {inputValue?.length > 0 ? (
              // @ts-ignore
              searchResult?.success === false ? (
                <div className="flex h-[59px] w-auto cursor-not-allowed items-center gap-2 bg-red-300 p-4 text-white rounded-tr-[12px] rounded-br-[12px]">
                  NFT Not found
                </div>
              ) : // @ts-ignore
                searchResult?.success === true ? (
                  <div
                    className="flex h-[59px] w-auto cursor-pointer items-center gap-2 bg-green-500  p-4 text-white rounded-tr-[12px] rounded-br-[12px]"
                    // @ts-ignore
                    onClick={() => handleModal()}
                  >
                    {!isSuccess ? 'Loading' : `${getValue()} view`}
                    <FaLongArrowAltRight className="cursor-pointer" />
                  </div>
                ) : (
                  <div className="w-[141px] flex justify-center items-center h-[59px] bg-white rounded-tr-[12px] rounded-br-[12px]">
                <p className='text-[16px] text-black font-[500]'>Search</p>
              </div>
                )
            ) : (
              <div className="w-[141px] flex justify-center items-center h-[59px] bg-white rounded-tr-[12px] rounded-br-[12px]">
                <p className='text-[16px] text-black font-[500]'>Search</p>
              </div>
            )}
          </span>
        </label>

      </div>
    </div>
  );
}
