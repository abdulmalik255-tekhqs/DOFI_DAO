import Image from "next/image";
import CopyIcon from '@/assets/images/dao/copyicon.png';
import { useCopyToClipboard } from "react-use";
import ToastNotification from "../ui/toast-notification";

export default function ZKProof({ data }: any) {
  const [_, copyToClipboard] = useCopyToClipboard();

  const excludedKeys = ["curve", "protocol"];
  const handleCopy = () => {
    //@ts-ignore
  const jsonString = JSON.stringify(data, null, 2);
  // @ts-ignore
  copyToClipboard(jsonString);
  ToastNotification("success", "Copied!");
  }
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-6 max-w-3xl mx-auto">
      {/* Top-level info */}
      <div className="w-full flex justify-center items-center">
        <h1 className='text-[#334155] text-[24px] font-[500]'>
          ZK Proof Details
        </h1>
      </div>
      <div className="flex justify-end items-center cursor-pointer">
        <Image src={CopyIcon} alt="no-icon" width={15} onClick={() => handleCopy()} />
      </div>
      <div className="mt-8">
        <pre className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto max-h-98">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
