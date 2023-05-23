import { Edit } from "lucide-react";
import React from "react";

const EditBtn = () => {
  return (
    <div className="p-2 border border-neutral-700 rounded-full hover:bg-neutral-700">
      <Edit width={14} height={14} className="text-yellow-200" />
    </div>
  );
};

export default EditBtn;
