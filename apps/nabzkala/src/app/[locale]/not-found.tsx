"use client";

import { HomeIcon, SearchXIcon } from "lucide-react";
import { Button } from "@/components/button";
import { Text } from "@/components/text";
import Link from "next/link";
import { routes } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="lg:max-w-mobile my-auto mx-auto flex h-dvh flex-col justify-center p-6">
      <div className="relative self-center">
        <SearchXIcon className="text-secondary-500 relative z-10 size-16" />
        <div className="bg-secondary-100 absolute top-0 left-0 z-0 size-12 rounded-full" />
      </div>
      <h2 className="mt-6 text-center text-xl font-bold">
        صفحه‌ای که به دنبال آن بودید یافت نشد!
      </h2>
      <Text className="mt-2 text-center text-neutral-500">
        متاسفانه صفحه‌ای که به دنبال آن بودید یافت نشد. ممکن است این صفحه حذف
        شده باشد یا آدرس آن تغییر کرده باشد.
      </Text>
      <Button
        as={Link}
        href={routes.home.getPath()}
        className="mt-6 self-center"
        size="sm"
        color="secondary"
      >
        <HomeIcon data-slot="icon" />
        صفحه اصلی
      </Button>
    </div>
  );
}
