import { useSelector } from 'react-redux';
import BuyTransactionEnchance from './buy-transaction-enchance';
import CreateIDOWizardEnhance from './create-dio-enchance';
import DIOTransactionEnchance from './dio-transaction-enchance';
import SegmentedProgressBarEnchance from './step-progress-enchance';
import NFTMintEnchance from './nft-mint-enchance';

export default function WizardModal({ data }: { data: any }) {
  const { currentStep } = useSelector((state: any) => state.ido);

  return (
    <div className="w-[500px] rounded-2xl border bg-white px-5 pb-7 pt-5 md:w-[700px] xl:w-[950px]">
      <SegmentedProgressBarEnchance />

      {currentStep === 0 && <NFTMintEnchance data={data} />}
      {currentStep === 1 && <BuyTransactionEnchance data={data} />}
      {currentStep === 2 && <CreateIDOWizardEnhance data={data} />}
      {currentStep === 3 && <DIOTransactionEnchance data={data} />}
    </div>
  );
}
