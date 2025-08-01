import React from 'react';
import { IconProps } from '~/types';

export default function HomeIcon({ size = 20, color = '#604237', className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7071 0.292893C10.3166 -0.0976311 9.68342 -0.0976311 9.29289 0.292893L0.292893 9.29289C-0.0976311 9.68342 -0.0976311 10.3166 0.292893 10.7071C0.683417 11.0976 1.31658 11.0976 1.70711 10.7071L2 10.4142V18C2 18.5523 2.44772 19 3 19H8C8.55228 19 9 18.5523 9 18V13H11V18C11 18.5523 11.4477 19 12 19H17C17.5523 19 18 18.5523 18 18V10.4142L18.2929 10.7071C18.6834 11.0976 19.3166 11.0976 19.7071 10.7071C20.0976 10.3166 20.0976 9.68342 19.7071 9.29289L10.7071 0.292893ZM16 8.41421L10 2.41421L4 8.41421V17H7V12C7 11.4477 7.44772 11 8 11H12C12.5523 11 13 11.4477 13 12V17H16V8.41421Z"
        fill={color}
      />
    </svg>
  );
}
