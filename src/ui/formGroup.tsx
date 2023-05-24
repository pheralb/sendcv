import type { ReactNode } from "react";

interface FormGroupProps {
  children: ReactNode;
}

const FormGroup = (props: FormGroupProps) => {
  return <div className="mb-3 space-y-1 w-full">{props.children}</div>;
};

export default FormGroup;
