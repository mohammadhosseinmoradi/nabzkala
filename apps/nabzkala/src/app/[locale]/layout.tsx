import "swiper/css";
import "./app.css";
import { ReactNode } from "react";
import NextIntlProvider from "@/app/[locale]/providers/next-intl-provider";
import { SWRProvider } from "@/app/[locale]/providers/swr-provider";
import AuthProvider from "@/app/[locale]/providers/auth-provider";
import { Metadata, Viewport } from "next";
import { Toaster } from "@/components/sonner";

const APP_NAME = "Nabzkala";
const APP_DESCRIPTION = "Next generation e-commerce platform";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: "dark",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: {
    locale: string;
  };
}) {
  return (
    <html dir="ltr" lang={locale} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-black text-neutral-200">
        <SWRProvider>
          <NextIntlProvider locale={locale}>
            <AuthProvider>{children}</AuthProvider>
            <Toaster />
          </NextIntlProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
