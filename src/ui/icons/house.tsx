import type { ComponentProps, FC } from 'react';

const House: FC<ComponentProps<"svg">> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="M218.83 103.77l-80-75.48a1.14 1.14 0 01-.11-.11 16 16 0 00-21.53 0l-.11.11-79.91 75.48A16 16 0 0032 115.55V208a16 16 0 0016 16h48a16 16 0 0016-16v-48h32v48a16 16 0 0016 16h48a16 16 0 0016-16v-92.45a16 16 0 00-5.17-11.78zM208 208h-48v-48a16 16 0 00-16-16h-32a16 16 0 00-16 16v48H48v-92.45l.11-.1L128 40l79.9 75.43.11.1z"></path>
  </svg>
);

export default House;
