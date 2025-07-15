'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ChevronRightIcon, InformationCircleIcon } from '~/components/shared/icons';
import LogoutButton from '~/components/shared/logout-button';
import { Button } from '~/components/ui/button';
import { Spinner } from '~/components/ui/spinner';
import { HEADER_HEIGHT } from '~/constants/common';
import { useIsMobile } from '~/hooks/use-mobile';
import { cn } from '~/lib/utils';
import { IconProps } from '~/types';

// ========== TYPES ==========
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<IconProps>;
}

interface SidenavProps {
  title: string;
  listNav: NavItem[];
  className?: string;
  children?: React.ReactNode;
}

interface SideNavHeaderProps {
  title: string;
  isMobile: boolean;
  openSideNav?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}

// ========== CONSTANTS ==========
const WIDTH_SIDE_NAV = 350;

// ========== HOOKS ==========
const useNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string): boolean => pathname.includes(href);
  const getIconColor = (href: string): string => (isActive(href) ? 'var(--base-white)' : 'var(--brown-900)');
  const navigateTo = (href: string): void => router.push(href);

  return { isActive, getIconColor, navigateTo };
};

const useActiveNavItem = (listNav: NavItem[]) => {
  const { isActive } = useNavigation();

  const activeItem = listNav.find((item) => isActive(item.href));
  return activeItem;
};

// ========== UTILITIES ==========
const getSidenavStyles = (isMobile: boolean) => ({
  width: isMobile ? '100%' : `${WIDTH_SIDE_NAV}px`,
  top: `${HEADER_HEIGHT}px`,
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
});

const getMarginStyle = (isMobile: boolean) => (isMobile ? {} : { marginRight: `${WIDTH_SIDE_NAV}px` });

// ========== COMPONENTS ==========
const SideNavHeader: React.FC<SideNavHeaderProps> = React.memo(
  ({ title, isMobile, onToggle, children, openSideNav }) => (
    <div className="flex flex-col items-center gap-2 px-3 md:flex-row md:justify-center">
      <div className={cn('flex w-full items-center justify-between gap-2 p-4', openSideNav && 'p-0')}>
        {isMobile && (
          <button
            onClick={onToggle}
            className="cursor-pointer"
            aria-label={openSideNav ? 'Close sidebar' : 'Open sidebar'}
          >
            <ChevronRightIcon />
          </button>
        )}
        <h1 className="text-center text-body-xl font-bold text-brown-900 md:text-display-sm">{title}</h1>
        {isMobile && <ChevronRightIcon className="opacity-0" />}
      </div>
      {children}
    </div>
  )
);
SideNavHeader.displayName = 'SideNavHeader';

const NavigationList: React.FC<{ listNav: NavItem[]; onToggle?: () => void }> = React.memo(({ listNav, onToggle }) => {
  const { isActive, getIconColor, navigateTo } = useNavigation();

  return (
    <div className="flex flex-col gap-4 py-20">
      {listNav.map((item) => {
        const isItemActive = isActive(item.href);

        return (
          <Button
            key={item.name}
            onClick={() => {
              navigateTo(item.href);
              onToggle?.();
            }}
            className={cn(
              'w-full bg-white text-title-lg font-bold text-brown-900',
              isItemActive && 'bg-red-900 text-white'
            )}
            leadingIcon={<item.icon color={getIconColor(item.href)} />}
            size="xl"
            typeStyle="round"
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
});
NavigationList.displayName = 'NavigationList';

const SideNavFooter: React.FC = React.memo(() => (
  <div className="mt-auto">
    <div className="mb-4 flex w-full items-center justify-center gap-2">
      <InformationCircleIcon />
      <span className="text-body-lg text-brown-700">利用規約</span>
    </div>
    <LogoutButton />
  </div>
));
SideNavFooter.displayName = 'SideNavFooter';

const SideNavContent: React.FC<{
  title: string;
  listNav: NavItem[];
  isMobile: boolean;
  openSideNav?: boolean;
  onToggle?: () => void;
}> = ({ title, listNav, isMobile, openSideNav, onToggle }) => (
  <div className="flex h-full flex-col">
    <SideNavHeader title={title} isMobile={isMobile} openSideNav={openSideNav} onToggle={onToggle} />
    <NavigationList listNav={listNav} onToggle={onToggle} />
    <SideNavFooter />
  </div>
);

const SideNavContainer: React.FC<{
  title: string;
  listNav: NavItem[];
  className?: string;
  isMobile: boolean;
  openSideNav?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}> = ({ title, listNav, className, isMobile, openSideNav, onToggle, children }) => {
  const sidenavStyles = getSidenavStyles(isMobile);
  const marginStyle = getMarginStyle(isMobile);

  return (
    <div className="flex flex-col md:flex-row">
      <div style={marginStyle}>
        <div className={cn('fixed bottom-0 overflow-y-auto bg-brown-100 p-4 md:p-8', className)} style={sidenavStyles}>
          <SideNavContent
            title={title}
            listNav={listNav}
            isMobile={isMobile}
            openSideNav={openSideNav}
            onToggle={onToggle}
          />
        </div>
      </div>
      <div className="flex-1 p-4 md:p-8 lg:p-16">{!openSideNav && children}</div>
    </div>
  );
};

// ========== MOBILE/DESKTOP VARIANTS ==========
const SideNavMobile: React.FC<SidenavProps> = ({ title, listNav, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const activeNavItem = useActiveNavItem(listNav);

  // Use active nav item's name as title, fallback to original title
  const mobileTitle = activeNavItem?.name || title;

  if (isOpen) {
    return (
      <SideNavContainer title={mobileTitle} listNav={listNav} isMobile openSideNav={isOpen} onToggle={toggleSidebar}>
        {children}
      </SideNavContainer>
    );
  }

  return (
    <SideNavHeader openSideNav={isOpen} title={mobileTitle} isMobile onToggle={toggleSidebar}>
      {children}
    </SideNavHeader>
  );
};

const SideNavDesktop: React.FC<SidenavProps> = ({ title, listNav, className, children }) => (
  <SideNavContainer title={title} listNav={listNav} className={className} isMobile={false}>
    {children}
  </SideNavContainer>
);

// ========== MAIN COMPONENT ==========
const Sidenav: React.FC<SidenavProps> = ({ title, listNav, className, children }) => {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return isMobile ? (
    <SideNavMobile title={title} listNav={listNav}>
      {children}
    </SideNavMobile>
  ) : (
    <SideNavDesktop title={title} listNav={listNav} className={className}>
      {children}
    </SideNavDesktop>
  );
};

export default Sidenav;
