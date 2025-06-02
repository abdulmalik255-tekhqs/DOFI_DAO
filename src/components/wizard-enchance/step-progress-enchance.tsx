import { useSelector } from 'react-redux';
import { Check } from 'lucide-react';

export default function SegmentedProgressBarEnhance() {
  const currentStep = useSelector((state: any) => state.ido.currentStep);
  const steps = ['Purchase', 'Mint Domain', 'Tokenize', 'Validate'];
  return (
    <div className="relative flex w-full items-center justify-between px-4 py-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const showLine = index !== steps.length - 1;
        const lineColored = index > currentStep;
        return (
          <div
            key={index}
            className="relative flex flex-1 items-center justify-center border-b border-[#CBD5E1] pb-[32px]"
          >
            <div className="z-10 flex flex-col items-center">
              <div className="relative mb-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#F3F4F6]">
                <div
                  className={`flex h-[20px] w-[20px] items-center justify-center rounded-full transition-all duration-300 ${
                    isCompleted || isActive
                      ? 'bg-[#0D1321] text-white'
                      : 'bg-[#F3F4F6] text-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-[14px] ${
                    isActive
                      ? 'font-[700] text-[#0F172A]'
                      : 'font-[600] text-[#344054]'
                  }`}
                >
                  {step}
                </div>
                <div
                  className={`text-[14px] font-[400] ${
                    isActive ? 'text-[#0F172A]' : 'text-gray-500'
                  }`}
                >
                  {index === 0 && 'Register your domain'}
                  {index === 1 && 'Mint your Domain NFT'}
                  {index === 2 && 'Tokenize your identity'}
                  {index === 3 && 'Validate your claim'}
                </div>
              </div>
            </div>
            {showLine && (
              <div className="absolute left-[47%] top-3 z-0 h-1 w-full">
                <div
                  className={`h-full transition-all duration-300 ${
                    !lineColored ? 'bg-[#0D1321]' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
