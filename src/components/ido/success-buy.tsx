import { useState } from 'react';

export default function SuccessfullyBuyIDO() {
  return (
    <>
      <div className="w-[700px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
        <h1 className="flex shrink-0 items-center justify-center text-center text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">
          Congratulations
        </h1>
        <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal tracking-normal text-black md:flex">
          You have successfully purchased the domain 'fractions'. It will be
          sent to you once one DIO is completed. You can view your fractions in
          your profile.
        </p>
      </div>
    </>
  );
}
