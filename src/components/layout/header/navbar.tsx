'use client';

import { Session } from '@prisma/client';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { HEADER_HEIGHT } from '~/constants/common';
import { PATH } from '~/constants/routes';
import { cn } from '~/lib/utils';

export default function Navbar({
  session,
  listMenu,
}: {
  session: Session;
  listMenu: { name: string; href: string }[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const isAuth = [...Object.values(PATH.AUTH), PATH.REGISTER_BASIC_INFO, PATH.ADD_FRIEND].includes(
    path as (typeof PATH.AUTH)[keyof typeof PATH.AUTH]
  );
  const style = {
    header: isAuth ? 'bg-primary text-white' : 'bg-white text-brown-700',
  };

  return (
    <header style={{ height: HEADER_HEIGHT }} className={cn(`sticky top-0 z-40 w-full`, style.header)}>
      <div className="container h-full">
        <nav className="flex h-full items-center justify-between">
          <Link href={PATH.HOME} className="flex items-center text-4xl font-bold">
            <p className={cn(style.header, isAuth ? 'text-white' : 'text-primary')}>enmo</p>
          </Link>
          <div className="hidden space-x-4 lg:block">
            {!isAuth &&
              listMenu.map((item) => (
                <Button
                  variant={item.href !== PATH.AUTH.REGISTER ? 'outline' : 'solid'}
                  key={item.name}
                  size="lg"
                  onClick={() => router.push(item.href)}
                  className="font-bold"
                >
                  {item.name}
                </Button>
              ))}
          </div>
          <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
            <SheetTrigger className="lg:hidden">
              <span className="sr-only">Open Menu</span>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className="bg-white">
              <div className="flex flex-col items-center space-y-10 py-10">
                <div className="text-muted-foreground flex w-full flex-col space-y-4 text-center text-sm leading-loose">
                  {listMenu.map((item) => (
                    <Button
                      variant={item.href === PATH.AUTH.REGISTER ? 'outline' : 'solid'}
                      key={item.name}
                      className="w-full"
                      onClick={() => router.push(item.href)}
                      size="lg"
                      typeStyle="round"
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
