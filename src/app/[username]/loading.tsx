import Spinner from "@/ui/spinner";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-2">
      <Spinner width={25} color="#ffff" />
    </div>
  );
};

export default Loading;
