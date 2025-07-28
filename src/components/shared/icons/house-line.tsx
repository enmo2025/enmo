import React from 'react';
import { IconProps } from '~/types';

const HouseLineIcon = ({ size = 24, color = '#604237', className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.7071 2.29289C12.3166 1.90237 11.6834 1.90237 11.2929 2.29289L2.29289 11.2929C1.90237 11.6834 1.90237 12.3166 2.29289 12.7071C2.68342 13.0976 3.31658 13.0976 3.70711 12.7071L4 12.4142V20C4 20.5523 4.44772 21 5 21H10C10.5523 21 11 20.5523 11 20V15H13V20C13 20.5523 13.4477 21 14 21H19C19.5523 21 20 20.5523 20 20V12.4142L20.2929 12.7071C20.6834 13.0976 21.3166 13.0976 21.7071 12.7071C22.0976 12.3166 22.0976 11.6834 21.7071 11.2929L12.7071 2.29289ZM18 10.4142L12 4.41421L6 10.4142V19H9V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V19H18V10.4142Z"
      fill={color}
    />
  </svg>
);

export default HouseLineIcon;
