
import ToastNotification from './toast-notification';
import { useModal } from '../modal-views/context';




export default function FractionCard({ item, className = '' }: any) {
  const {
    name,
    slug,
    title,
    imageUrl,
    image,
    number_of_artwork,
    user,
    tokenId,
    contractAddress,
    amount,
  } = item ?? {};
const { openModal } = useModal();
  const shadowColor = name.includes('eth')
    ? '#9F5EF7'
    : name.includes('.shib')
      ? '#FF6B35'
      : '#FF6B35';
  return (
    <div
      className={`relative max-w-[220px] overflow-visible rounded-lg group transition-all duration-300 cursor-pointer ${className}`}
    >
      {/* Card Stack */}
      <div className="relative flex w-full justify-center items-center  max-h-[291px]">
        {/* Bottom layer - hover */}
        {/* <div
          className="absolute w-full h-full  z-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out scale-[0.97] translate-x-[15px] blur-md shadow-lg"
          style={{ backgroundColor: shadowColor }}
        /> */}

        {/* Middle layer - hover */}
        {/* <div
          className="absolute w-full h-full rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out scale-[0.985] translate-y-[10px] blur-sm shadow-md"
          style={{ backgroundColor: shadowColor }}
        /> */}

        {/* Top card - image */}
        <div className="relative z-20 w-full h-full overflow-hidden rounded-lg transition-transform duration-300 ease-in-out">
          <img
            src={imageUrl}
            alt={`NFT #${tokenId}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Floating Overlay */}
      <div className="absolute left-0 top-0  z-[25]  flex h-full w-[220px] flex-col justify-between"
      onClick={()=>openModal('FRACTIONS', item)}
      >
        <div className="relative group cursor-pointer">
          <div className="inline-flex h-[29px] w-full items-center rounded-2xl bg-white/40 px-4 text-[10px] font-[400]  tracking-wide text-[#0F172A]">
            Amount: <span className="ml-1 font-[400]">{amount}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col">
        <div className="inline-flex mt-2 items-center text-[14px] font-[500] tracking-wide">
          Token ID: <span className="ml-2 font-bold">{tokenId}</span>
        </div>
        <div
          role="button"
          tabIndex={0}
          className="z-[100] mt-2 inline-flex cursor-pointer items-center text-[14px] font-[500] tracking-wide text-black"
          title="Click to copy"
          onClick={() => {
            if (contractAddress) {
              ToastNotification("success", "Copied!");
              navigator.clipboard.writeText(contractAddress);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigator.clipboard.writeText(contractAddress);
              ToastNotification("success", "Copied!");
            }
          }}
        >
          {contractAddress?.slice(0, 6)}...{contractAddress?.slice(-6)}
        </div>
      </div>
    </div>
  );
}
