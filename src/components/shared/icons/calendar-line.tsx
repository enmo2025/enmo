import React from 'react';
import { IconProps } from '~/types';

const CalendarLineIcon = ({ size = 20, color = '#CF8E76', className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_37_2618)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2C8.55228 2 9 2.44772 9 3V4L15 4V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4H18C20.2091 4 22 5.79086 22 8V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V8C2 5.79086 3.79086 4 6 4H7V3C7 2.44772 7.44772 2 8 2ZM15 6V7C15 7.55228 15.4477 8 16 8C16.5523 8 17 7.55228 17 7V6H18C19.1046 6 20 6.89543 20 8V10L4 10L4 8C4 6.89543 4.89543 6 6 6H7V7C7 7.55228 7.44772 8 8 8C8.55229 8 9 7.55228 9 7V6L15 6ZM4 12L20 12V20H4L4 12Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_37_2618">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>
);

export default CalendarLineIcon;
