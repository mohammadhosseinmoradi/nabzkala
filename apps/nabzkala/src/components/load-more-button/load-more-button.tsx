import { Button } from "@/components/button";
import { ThreeDotLoading } from "@/components/loading";

type LoadMoreButtonProps = {
  page?: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
};

export function LoadMoreButton({
  page,
  onPageChange,
  isLoading,
}: LoadMoreButtonProps) {
  return (
    <Button
      onClick={() => {
        if (!page) return;
        onPageChange(page + 1);
      }}
      disabled={isLoading}
      size="sm"
    >
      {isLoading && <ThreeDotLoading color="white" />}
      بیشتر
    </Button>
  );
}
