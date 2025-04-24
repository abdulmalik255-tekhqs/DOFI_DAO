import { SearchIcon } from '@/components/icons/search';
import { useModal } from '@/components/modal-views/context';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function GlobalFilter({
  // @ts-ignore
  filter,
  // @ts-ignore
  setFilter,
}) {
  const { openModal } = useModal();
  return (
    <div className="mb-[40px] flex-1 text-center ltr:ml-auto rtl:mr-auto">
      <h2 className="mb-[40px] flex shrink-0 items-center justify-center gap-[20px] pl-[10px] text-center text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white md:pl-0">
        <IoMdArrowDropdown /> Register your name today <IoMdArrowDropdown />
      </h2>
      <label className="relative hidden w-full items-center md:flex">
        <input
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value)}
          className="h-[100px] w-full appearance-none rounded-lg bg-gray-100 py-1 text-[50px] font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 ltr:pl-[80px] rtl:pr-10"
          placeholder="Find Your Name"
        />
        <span className="absolute right-0 flex h-full cursor-pointer items-center justify-center px-4 text-gray-600 hover:text-gray-900 dark:text-white">
          {filter?.length > 0 ? (
            <>
              <div
                className="bg-green flex w-auto cursor-pointer items-center gap-2 bg-green-600 p-6 text-white"
                onClick={() => openModal('FIND_NAME')}
              >
                .eth view
                <FaLongArrowAltRight className="cursor-pointer" />
              </div>
            </>
          ) : (
            <>
              <SearchIcon className="h-[50px] w-[50px]" />
            </>
          )}
        </span>
      </label>
    </div>
  );
}
