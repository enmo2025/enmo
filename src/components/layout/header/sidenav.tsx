'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Icons, { IconProps } from '~/components/shared/icons';
import LogoutButton from '~/components/shared/logout-button';
import { Button } from '~/components/ui/button';
import { HEADER_HEIGHT } from '~/constants/common';
import { cn } from '~/lib/utils';

interface SidenavProps {
  title: string;
  listNav: {
    name: string;
    href: string;
    icon: React.ComponentType<IconProps>;
  }[];
  className?: string;
}

export default function Sidenav({ title, listNav, className }: SidenavProps) {
  const getPathname = usePathname();
  const navigate = useRouter();

  const isActive = (href: string) => {
    return getPathname.includes(href);
  };

  const getIconColor = (href: string) => {
    return isActive(href) ? 'var(--base-white)' : 'var(--brown-900)';
  };

  return (
    <div className="mr-[20vw]">
      <div
        className={cn(
          `fixed bottom-0 bg-brown-100 top-[${HEADER_HEIGHT}px] h-[calc(100vh-${HEADER_HEIGHT}px)] w-[20vw] overflow-y-auto p-8`,
          className
        )}
      >
        <h1 className="text-center text-display-sm font-bold text-brown-900">{title}</h1>
        <div className="flex flex-col gap-4 py-20">
          {listNav.map((item) => (
            <div key={item.name}>
              <Button
                onClick={() => navigate.push(item.href)}
                className={cn(
                  'w-full bg-white text-title-lg font-bold text-brown-900',
                  isActive(item.href) && 'bg-red-900 text-white'
                )}
                leadingIcon={<item.icon color={getIconColor(item.href)} />}
                size="xl"
                typeStyle="round"
              >
                {item.name}
              </Button>
            </div>
          ))}
        </div>
        <div className="mb-4 flex w-full items-center justify-center gap-2">
          <span>
            <Icons.informationCircle />
          </span>
          <span className="text-body-lg text-brown-700">利用規約</span>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
