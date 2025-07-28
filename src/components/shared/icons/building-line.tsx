import React from 'react';
import { IconProps } from '~/types';

const BuildingLineIcon = ({ size = 24, color = '#604237', className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_37_2341)">
      <path d="M8 7H6V9H8V7Z" fill={color} />
      <path d="M6 11H8V13H6V11Z" fill={color} />
      <path d="M12 11H10V13H12V11Z" fill={color} />
      <path d="M10 7H12V9H10V7Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 3C2 2.44772 2.44772 2 3 2H15C15.5523 2 16 2.44772 16 3V8.38197L21.4472 11.1056C21.786 11.275 22 11.6212 22 12V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3ZM8 20H10V17H8V20ZM12 20V16C12 15.4477 11.5523 15 11 15H7C6.44772 15 6 15.4477 6 16V20H4V4H14V20H12ZM16 20V10.618L20 12.618V20H16Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_37_2341">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>
);

export default BuildingLineIcon;
