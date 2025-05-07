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
      <h2 className="mb-[40px] flex shrink-0 items-center justify-center gap-[20px] pl-[10px] text-center text-[28px] font-bold uppercase tracking-wider text-gray-900 dark:text-white md:pl-0">
        <IoMdArrowDropdown /> Register your name today <IoMdArrowDropdown />
      </h2>
      <label className="relative hidden w-full items-center md:flex">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-[100px] w-full appearance-none rounded-lg bg-gray-100 py-1 text-[50px] font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus-none border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 ltr:pl-[80px] rtl:pr-10"
          placeholder="Find Your Name"
        />
        <span className="absolute right-0 flex h-full cursor-pointer items-center justify-center px-4 text-gray-600 hover:text-gray-900 dark:text-white">
          {inputValue?.length > 0 ? (
            //@ts-ignore
            searchResult?.success === false ? (
              <div className="flex w-auto cursor-not-allowed items-center gap-2 bg-red-300 border border-red-600 p-4 text-white rounded-lg">
                NFT Not found
              </div>
            ) : //@ts-ignore
              searchResult?.success === true ? (
                <div
                  className="flex w-auto cursor-pointer items-center gap-2 bg-green-500 border border-green-600 p-4 text-white rounded-lg"
                  //@ts-ignore
                  onClick={() => handleModal()}
                >
                  {!isSuccess ? 'Loading' : `${getValue()} view`}
                  <FaLongArrowAltRight className="cursor-pointer" />
                </div>
              ) : (
                <SearchIcon className="h-[50px] w-[50px]" />
              )
          ) : (
            <SearchIcon className="h-[50px] w-[50px]" />
          )}
        </span>
      </label>
    </div>
  );
}
