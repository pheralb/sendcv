import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return <div className="px-7">{props.children}</div>;
};

export default Container;
