import React from 'react';
import { IconProps } from '~/types';

const EditIcon = ({ size = 20, className }: IconProps) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size }}
  >
    <g clipPath="url(#clip0_981_6829)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.744 1.74408C12.0695 1.41864 12.5971 1.41864 12.9225 1.74408L15.4225 4.24408C15.748 4.56951 15.748 5.09715 15.4225 5.42259L8.33922 12.5059C8.24774 12.5974 8.13622 12.6663 8.01348 12.7072L4.26348 13.9572C3.96404 14.0571 3.6339 13.9791 3.4107 13.7559C3.18751 13.5327 3.10957 13.2026 3.20939 12.9031L4.45939 9.15314C4.5003 9.03041 4.56922 8.91889 4.6607 8.82741L11.744 1.74408ZM13.6548 4.83333L13.1666 5.32149L11.8451 4L12.3333 3.51184L13.6548 4.83333ZM11.9881 6.5L10.6666 5.17851L5.97832 9.86682L5.31758 11.8491L7.29981 11.1883L11.9881 6.5Z"
        fill="#8D8574"
      />
      <path
        d="M1.49996 15.6667C1.03972 15.6667 0.666626 16.0398 0.666626 16.5C0.666626 16.9602 1.03972 17.3333 1.49996 17.3333L16.5 17.3333C16.9602 17.3333 17.3333 16.9602 17.3333 16.5C17.3333 16.0398 16.9602 15.6667 16.5 15.6667L1.49996 15.6667Z"
        fill="#8D8574"
      />
    </g>
    <defs>
      <clipPath id="clip0_981_6829">
        <rect width="16.6667" height="16.6667" fill="white" transform="translate(0.666626 0.666672)" />
      </clipPath>
    </defs>
  </svg>
);

export default EditIcon;
