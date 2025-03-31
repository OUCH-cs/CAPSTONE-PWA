import React from "react";

const MinusButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M1.143 7.143a1.143 1.143 0 0 0 0 2.286h13.714a1.143 1.143 0 0 0 0-2.286H1.143Z"
    />
  </svg>
);

export default MinusButton;
