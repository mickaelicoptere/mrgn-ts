import React, { FC, SVGProps } from "react";

const PieChart: FC<SVGProps<SVGSVGElement>> = ({ color = "#868E95", ...props }) => (
    <svg fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11 2.04932V12.9999H21.9506C21.4489 18.0533 17.1853 21.9999 12 21.9999C6.47715 21.9999 2 17.5228 2 11.9999C2 6.81459 5.94668 2.55104 11 2.04932ZM13 2.04932C17.7244 2.51839 21.4816 6.27552 21.9506 10.9999H13V2.04932Z" />
    </svg>
);

export { PieChart };
