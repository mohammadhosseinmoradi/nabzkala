"use client";

import "@/app/globals.css";
import { Button } from "@/components/button";
import { RefreshCwIcon, TriangleAlertIcon } from "lucide-react";
import { Text } from "@/components/text";

export const metadata = {
  title: "بچه‌م",
  description: "My baby",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-us" dir="ltr">
      <body className="bg-neutral-100">
        <div className="relative self-center">
          <TriangleAlertIcon className="text-error-500 relative z-10 size-16" />
          <div className="bg-error-100 absolute top-0 left-0 z-0 size-14 rounded-full" />
        </div>
        <h2 className="mt-6 text-center text-xl font-bold">مشکلی پیش آمد!</h2>
        <Text className="mt-2 text-center text-neutral-500">
          متاسفانه در حال حاضر یک مشکل فنی رخ داده است. لطفاً بعداً تلاش کنید یا
          با پشتیبانی تماس بگیرید.
        </Text>
        <Button
          className="mt-6 self-center"
          onClick={() => reset()}
          size="sm"
          color="secondary"
        >
          <RefreshCwIcon data-slot="icon" />
          تلاش دوباره
        </Button>
      </body>
    </html>
  );
}
