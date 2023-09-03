import React from "react";

export const RoutesSVG: React.FC<React.SVGAttributes<SVGElement>> = ({
  width = "20",
  height = "20",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.11894 4.99859H4.79173C5.96242 4.99859 6.92699 4.04958 6.94255 2.89521C6.94255 1.72452 5.97798 0.791834 4.79173 0.791834L2.75212 0.791092C2.54675 0.332152 2.08781 0 1.5503 0C0.822978 0 0.237252 0.601291 0.237252 1.31305C0.237252 2.0248 0.838542 2.62609 1.5503 2.62609C2.10414 2.62609 2.56232 2.29394 2.75212 1.835H4.79248C5.40934 1.835 5.91573 2.34139 5.91573 2.91079C5.91573 3.4802 5.40934 3.98659 4.79248 3.98659H2.15083C0.980134 3.98659 0.0155637 4.93559 0 6.08997C0 7.27622 0.964571 8.19334 2.15083 8.19334H4.34911C4.55447 8.65228 5.01341 9 5.55093 9C6.27825 9 6.86398 8.39871 6.86398 7.68695C6.86398 6.95964 6.26269 6.37391 5.55093 6.37391C4.99709 6.37391 4.53891 6.70606 4.34911 7.165L2.13527 7.16574C1.51841 7.16574 1.01202 6.65935 1.01202 6.08995C1.01202 5.50498 1.50209 5.01415 2.11894 4.99859Z"
        fill="white"
        fillOpacity="0.5"
      />
    </svg>
  );
};
