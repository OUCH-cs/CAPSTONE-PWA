import React from "react";


const PlusButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M9.143 1.143a1.143 1.143 0 0 0-2.286 0v5.714H1.143a1.143 1.143 0 0 0 0 2.286h5.714v5.714a1.143 1.143 0 0 0 2.286 0V9.143h5.714a1.143 1.143 0 0 0 0-2.286H9.143V1.143Z"
    />
  </svg>
)
export default PlusButton
