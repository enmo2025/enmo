import React from 'react';
import { IconProps } from '~/types';

const ChevronRightIcon = ({ size = 20, color = '#CF8E76', className }: IconProps) => (
  <svg
    width="10"
    height="18"
    viewBox="0 0 10 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size }}
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.3248 16.8248C8.86918 17.2804 8.13049 17.2804 7.67488 16.8248L0.674878 9.8248C0.219267 9.36918 0.219267 8.63049 0.674878 8.17488L7.67488 1.17488C8.13049 0.719267 8.86918 0.719267 9.32479 1.17488C9.78041 1.63049 9.78041 2.36918 9.32479 2.8248L3.14975 8.99984L9.32479 15.1749C9.78041 15.6305 9.78041 16.3692 9.3248 16.8248Z"
      fill="#CF8E76"
    />
  </svg>
);

export default ChevronRightIcon;
