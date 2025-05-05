import { useSelector } from 'react-redux';
import WizardProgressBar from './step-progress-bar';
import FindName from '../search/find-name';
import CreateIDO from '../ido/create-ido';
import CreateIDOWizard from './create-dio-wizard';
import BuyTransaction from './buy-transaction';
import DIOTransaction from './dio-transaction';

export default function WizardModal({ data }: { data: any }) {
  const {currentStep} = useSelector((state: any) => state.ido);

  return (
    <div className="w-[700px] rounded-2xl border bg-white px-5 pb-7 pt-5">
      <WizardProgressBar />

      {currentStep === 0 && <FindName data={data} />}
      {currentStep === 1 && <BuyTransaction  data={data}/>}
      {currentStep === 2 && <CreateIDOWizard data={data} />}
      {currentStep === 3 && <DIOTransaction  data={data} />}
    </div>
  );
}
