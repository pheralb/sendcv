import Spinner from "@/ui/spinner";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-2">
      <Spinner width={25} className="text-neutral-500 dark:text-neutral-300" />
    </div>
  );
};

export default Loading;
