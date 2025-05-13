'use client';

import React from 'react';
import { useWatchAsset } from 'wagmi'
import cn from '@/utils/cn';
import { FaGoogleWallet } from "react-icons/fa";
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Button from '@/components/ui/button';
import { useDrawer } from '@/components/drawer-views/context';
import { Close } from '@/components/icons/close';
import { defaultMenuItems } from '@/layouts/sidebar/_menu-items';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { useLayout } from '@/lib/hooks/use-layout';
import { useRouter } from 'next/navigation';
import routes from '@/config/routes';
import SimpleBar from '@/components/ui/simplebar';

//images
import AuthorImage from '@/assets/images/author.jpg';

interface SidebarProps {
  className?: string;
  layoutOption?: string;
  menuItems?: any[];
}

export default function Sidebar({
  className,
  layoutOption = '',
  menuItems = defaultMenuItems,
}: SidebarProps) {
  const { watchAsset } = useWatchAsset()
  const { closeDrawer } = useDrawer();
  const { layout } = useLayout();
  const router = useRouter();

  const sideBarMenus = menuItems?.map((item) => ({
    name: item.name,
    icon: item.icon,
    href:
      layoutOption +
      (layoutOption === `/${LAYOUT_OPTIONS.RETRO}` && item.href === '/'
        ? ''
        : item.href),
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem: any) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        href:
          item.name === 'Authentication'
            ? layoutOption + dropdownItem.href
            : dropdownItem.href,
      })),
    }),
  }));
  const handleWalletTransfer = () => {
    watchAsset({
      type: 'ERC20',
      options: {
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        symbol: 'DO.FI',
        decimals: 18,
      },
    })
  }
  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed xl:w-72 2xl:w-80 ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l',
        className,
      )}
    >
      <div className="relative flex h-24 items-center justify-center overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        {/* <h3 className="flex items-center justify-center text-[30px] font-bold uppercase tracking-wide text-gray-800 dark:text-gray-100">
          DO.FI
        </h3> */}
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <SimpleBar className="h-[calc(100%-96px)] relative">
        <div className="px-6 pb-5 2xl:px-8">
          <AuthorCard
            image={AuthorImage}
            name="Cameron Williamson"
            role="admin"
            onClick={() => {
              const newPath =
                layout === LAYOUT_OPTIONS.MODERN
                  ? routes.profile
                  : `/${layout}${routes.profile}`;
              router.push(newPath);
            }}
          />
          <div className="mt-12">
            {sideBarMenus?.map((item, index) => (
              <MenuItem
                key={'default' + item.name + index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
          <div className='flex justify-end absolute bottom-0'>
            <button className='underline pointer gap-2 text-gray-500 flex h-12 cursor-pointer items-center justify-between font-bold text-sm' onClick={() => handleWalletTransfer()}> <FaGoogleWallet /> Add DOFI token to your wallet</button>
          </div>
        </div>
      </SimpleBar>
    </aside>
  );
}
