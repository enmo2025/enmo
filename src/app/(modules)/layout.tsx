import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Header from '~/components/layout/header';
import ThemeProvider from '~/components/shared/theme-provider';
import { Toaster } from '~/components/ui/toaster';
import { QueryProvider } from '~/services/clientService/query-provider';
import { cn } from '~/lib/utils';
import '../globals.css';
import { siteConfig, siteUrl } from '~/config/site';
import AuthProvider from '~/providers/auth-provider';
import 'react-quill-new/dist/quill.snow.css';
import { getCurrentSession } from '~/lib/server/auth/session';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = siteConfig();

  // const siteOgImage = `${siteUrl}/api/og?locale=${locale}`;

  return {
    title: {
      default: site.name,
      template: `%s - ${site.name}`,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
    },
    manifest: `${siteUrl}/manifest.json`,
    keywords: ['イベント', 'Events', 'Enmo'],
    description: 'Enmoのイベントページでは、最新のイベント情報や参加方法をご紹介します',
    openGraph: {
      title: site.name,
      description: 'イベントページ',
      images: [site.url + '/ogp.png'],
    },
    twitter: {
      title: site.name,
      description: 'イベントページ',
      images: [site.url + '/ogp.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL(site.url ?? ''),
    alternates: {
      canonical: '/',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: site.name,
    },
  };
}

export const viewport = {
  width: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: '../../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { session } = await getCurrentSession();
  return (
    <html suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <AuthProvider>
              <Header session={session!} />
              <main>{children}</main>
              <Toaster />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
