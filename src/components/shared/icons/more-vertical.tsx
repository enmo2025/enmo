import React from 'react';
import { IconProps } from '~/types';

const MoreVerticalIcon = ({ size = 20, color = '#999281', className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 7C11.1716 7 10.5 6.32843 10.5 5.5C10.5 4.67157 11.1716 4 12 4C12.8284 4 13.5 4.67157 13.5 5.5C13.5 6.32843 12.8284 7 12 7Z"
      fill="black"
    />
    <path
      d="M12 20C11.1716 20 10.5 19.3284 10.5 18.5C10.5 17.6716 11.1716 17 12 17C12.8284 17 13.5 17.6716 13.5 18.5C13.5 19.3284 12.8284 20 12 20Z"
      fill="black"
    />
    <path
      d="M12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5Z"
      fill="black"
    />
  </svg>
);

export default MoreVerticalIcon;
