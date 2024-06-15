"use client";

import { Toaster as Sonner } from "sonner";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";

export type ToasterProps = ComponentProps<typeof Sonner>;

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="font-[Inter]"
      position="top-center"
      duration={1500}
      cn={cn}
      dir="rtl"
      icons={{
        success: <CircleCheckIcon className="size-5 text-green-500" />,
        error: <CircleAlertIcon className="size-5 text-red-500" />,
      }}
      toastOptions={{
        classNames: {
          title: "text-neutral-600",
          toast: "shadow-xl rounded-lg",
        },
      }}
      {...props}
    />
  );
}
