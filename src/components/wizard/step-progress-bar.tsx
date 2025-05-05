
import { useSelector } from 'react-redux';
import { CheckCircle } from 'lucide-react'; // Icon library

export default function SegmentedProgressBar() {
  const currentStep = useSelector((state: any) => state.ido.currentStep);
  const steps = ['Purchase', 'Confirm', 'Launch', 'Validate'];

  return (
    <div className="w-full flex justify-between items-center py-4 gap-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex flex-col items-center flex-1">
            {/* Step Label */}
            <span
              className={`text-sm mb-2 transition-colors duration-300 ${
                isActive ? 'text-black font-semibold' : 'text-gray-500'
              }`}
            >
              {step}
            </span>

            {/* Progress Bar */}
            <div
              className={`h-2 w-full rounded-full transition-all duration-500 ${
                isCompleted || isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />

            {/* Tick Icon */}
            <CheckCircle
              className={`mt-2 h-5 w-5 transition-all duration-500 ${
                isCompleted ? 'text-green-500 scale-100' : 'text-gray-400 scale-90'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}


// import { useSelector } from 'react-redux';

// export default function SegmentedProgressBar() {
//   const currentStep = useSelector((state:any) => state.ido.currentStep);
//     // Define the steps
//     const steps = ['Register', 'NFT', 'DIO', 'Confirm'];

//   return (
//     <div className="w-full flex justify-between items-center py-4">
//       {steps.map((_, index) => {
//         const isCompleted = index < currentStep;
//         const isActive = index === currentStep;

//         return (
//           <div
//             key={index}
//             className={`
//               h-2 w-full mx-1 rounded
//               ${isCompleted || isActive ? 'bg-green-500' : 'bg-gray-300'}
//             `}
//           />
//         );
//       })}
//     </div>
//   );
// };




// import { useSelector } from 'react-redux'; // Import useSelector for Redux
// import { useDispatch } from 'react-redux'; // To dispatch actions

// export default function WizardProgressBar() {
//   // Get the current step from Redux state
//   const currentStep = useSelector((state:any) => state.ido.currentStep);
  
//   // Define the steps
//   const steps = ['Register', 'NFT', 'DIO', 'Confirm'];



//   return (
//     <div className="relative w-full px-4 py-8">
//       {/* Background line connecting all steps, adjusted to center */}
//       <div className="absolute top-[40%] left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2 z-0" />

//       <div className="flex justify-between items-center relative z-10">
//         {steps.map((label, index) => {
//           // Determine if the step is completed or active
//           const isCompleted = index < currentStep; // Previous steps are completed
//           const isActive = index === currentStep;  // Current step is active

//           return (
//             <div key={index} className="flex flex-col items-center text-center">
//               <div
//                 className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
//                   isCompleted || isActive ? 'bg-green-500' : 'bg-gray-300'
//                 }`}
//               >
//                 {index + 1}
//               </div>
//               <div className="mt-2 text-sm font-mono text-gray-700">{label}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

