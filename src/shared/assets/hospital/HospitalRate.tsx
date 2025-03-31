import React from "react";

const HospitalRate = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#FC0"
      d="m6 0 1.854 3.62L12 4.205 9 7.02 9.708 11 6 9.12 2.292 11 3 7.021 0 4.205l4.146-.585L6 0Z"
    />
  </svg>
);

export default HospitalRate;