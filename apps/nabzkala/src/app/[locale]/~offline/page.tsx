import { WifiOffIcon } from "lucide-react";
import { Text } from "@/components/text";

export default function Page() {
  return (
    <div className="my-auto flex h-dvh flex-col justify-center p-6">
      <div className="relative self-center">
        <WifiOffIcon className="text-secondary-500 relative z-10 size-16" />
        <div className="bg-secondary-100 absolute top-0 left-0 z-0 size-14 rounded-full" />
      </div>
      <h2 className="mt-6 text-center text-xl font-bold">
        اتصال به اینترنت برقرار نیست!
      </h2>
      <Text className="mt-2 text-center text-neutral-500">
        متاسفانه اتصال شما به اینترنت قطع شده است. لطفاً اتصال خود را چک کرده و
        دوباره تلاش کنید.
      </Text>
    </div>
  );
}
