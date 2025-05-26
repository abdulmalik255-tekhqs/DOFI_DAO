

export default function FractionCardModal({ data }: any) {
    return (
        <div className="w-[650px] 2xl:w-[700px] 3xl:w-[752px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8">

            <h1 className="flex mb-[20px] shrink-0 items-center flex gap-4 justify-start text-end text-[32px] font-[500]  tracking-tighter text-[#1E293B] dark:text-white">
                Fractions <span className='text-[20px] mt-1'>({data?.amount})</span>
            </h1>
            <div className='border border-[#CBD5E1]'></div>
            <div className='flex justify-between mt-[24px]'>
                <div className='border border-[#E2E8F0] bg-[#F1F5F9] p-[20px] flex flex-col gap-[36px] rounded-[12px] max-h-[450px] md:h-[550px] 2xl:max-h-[500px] 3xl:max-h-[720px] overflow-y-auto'>
                    {Array.from({ length: data?.amount }).map((_, index) => (
                        <div key={index}>
                            <img
                                src={data?.imageUrl}
                                alt={`preview-${index}`}
                                className="w-[80px] h-[106px]"
                            />
                        </div>
                    ))}
                </div>
                <div className='w-[80%]'>
                    <img
                        src={data?.imageUrl}
                        alt={`NFT #${data?.tokenId}`}
                        className="w-full max-h-[450px] md:h-[550px] 2xl:max-h-[500px] 3xl:max-h-[720px]"
                    />
                </div>
            </div>
        </div>
    );
}
