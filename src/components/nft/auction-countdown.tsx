import React from 'react';
import cn from '@/utils/cn';
import Countdown, { zeroPad } from 'react-countdown';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

function CountdownDisplayWrapper({ days, hours, minutes, seconds }: any) {
  const { layout } = useLayout();

  return (
    <div
      className={cn(
        'flex items-center text-base font-medium -tracking-wider text-gray-900 dark:text-gray-100 xs:text-lg md:text-xl xl:text-xl 2xl:text-2xl',
        // {
        //   'gap-3 md:gap-2.5 lg:gap-gap-4 xl:gap-5':
        //     layout !== LAYOUT_OPTIONS.RETRO,
        //   'gap-4 lg:gap-2.5 3xl:gap-3.5 rtl:lg:gap-4':
        //     layout === LAYOUT_OPTIONS.RETRO,
        // },
      )}
    >
      {!!days && (
        <div
          className={cn('shrink-0 3xl:w-20', {
            '3xl:w-auto': layout === LAYOUT_OPTIONS.RETRO,
          })}
        >
          <span className="">{zeroPad(days)}</span>
          <span
            className={cn({
              'md:hidden': layout !== LAYOUT_OPTIONS.RETRO,
              'lg:hidden': layout === LAYOUT_OPTIONS.RETRO,
            })}
          >
            d
          </span>
          <span
            className={cn(
              'hidden truncate pt-2.5 text-sm -tracking-wide text-gray-600 dark:text-gray-400 ',
              {
                'md:block': layout !== LAYOUT_OPTIONS.RETRO,
                'lg:block': layout === LAYOUT_OPTIONS.RETRO,
              },
            )}
          >
            Days
          </span>
        </div>
      )}
      <div
        className={cn(
          'shrink-0 3xl:w-20 flex items-center flex-col ',
          {
            '3xl:w-auto': layout === LAYOUT_OPTIONS.RETRO,
          }
        )}
      >
        {/* Custom border span with fixed height */}
       

        <span>{zeroPad(hours)}</span>

        <span
          className={cn({
            'md:hidden': layout !== LAYOUT_OPTIONS.RETRO,
            'lg:hidden': layout === LAYOUT_OPTIONS.RETRO,
          })}
        >
          h
        </span>

        <span
          className={cn(
            'hidden truncate pt-[4px] text-[14px] font-[400] -tracking-wide text-[#334155]',
            {
              'md:block': layout !== LAYOUT_OPTIONS.RETRO,
              'lg:block': layout === LAYOUT_OPTIONS.RETRO,
            }
          )}
        >
          Hours
        </span>
      </div>
       <span className="mt-[10px] border-r border-r-[#CBD5E1] h-[32px] flex items-center justify-center self-stretch  pr-[20px] md:pr-[28px] lg:pr-[50px] xl:pr-[63px] "></span>
      <div
        className={cn('shrink-0 3xl:w-20 flex items-center flex-col pl-[20px] md-pl-[28px] lg:pl-[50px] xl:pl-[63px]', {
          '3xl:w-auto': layout === LAYOUT_OPTIONS.RETRO,
        })}
      >
        <span className="">{zeroPad(minutes)}</span>
        <span
          className={cn({
            'md:hidden': layout !== LAYOUT_OPTIONS.RETRO,
            'lg:hidden': layout === LAYOUT_OPTIONS.RETRO,
          })}
        >
          m
        </span>
        <span
          className={cn(
            'hidden truncate pt-[4px] text-[14px] font-[400] -tracking-wide text-[#334155]',
            {
              'md:block': layout !== LAYOUT_OPTIONS.RETRO,
              'lg:block': layout === LAYOUT_OPTIONS.RETRO,
            },
          )}
        >
          Minutes
        </span>
      </div>
      <span className="mt-[10px] border-r border-r-[#CBD5E1] h-[32px] self-stretch pr-[20px] md:pr-[28px] lg:pr-[50px] xl:pr-[63px] "></span>
      <div
        className={cn('shrink-0 3xl:w-20 flex items-center flex-col pl-[20px] md:pl-[28px] lg:pl-[50px] xl:pl-[63px]', {
          '3xl:w-auto': layout === LAYOUT_OPTIONS.RETRO,
        })}
      >
        <span className="">{zeroPad(seconds)}</span>
        <span
          className={cn({
            'md:hidden': layout !== LAYOUT_OPTIONS.RETRO,
            'lg:hidden': layout === LAYOUT_OPTIONS.RETRO,
          })}
        >
          s
        </span>
        <span
          className={cn(
            'hidden truncate pt-[4px] text-[14px] font-[400] -tracking-wide text-[#334155]',
            {
              'md:block': layout !== LAYOUT_OPTIONS.RETRO,
              'lg:block': layout === LAYOUT_OPTIONS.RETRO,
            },
          )}
        >
          Seconds
        </span>
      </div>
    </div>
  );
}

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <CountdownDisplayWrapper
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default function AuctionCountdown({
  date,
}: {
  date: string | number | Date | undefined;
}) {
  const isValidDate = date && !isNaN(new Date(date).getTime());

  if (!isValidDate) {
    return (
      <CountdownDisplayWrapper
        days={0}
        hours={0}
        minutes={0}
        seconds={0}
      />
    );
  }

  return <Countdown date={date} renderer={renderer} />;
}
