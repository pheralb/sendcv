import type { ReactNode } from "react";

const SidebarItem = ({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="flex cursor-pointer items-center space-x-3 rounded-md p-2 duration-75 hover:bg-neutral-300 dark:hover:bg-neutral-800">
      {icon}
      <span>{children}</span>
    </div>
  );
};

export default SidebarItem;
