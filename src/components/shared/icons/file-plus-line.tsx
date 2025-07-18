import React from 'react';
import { IconProps } from '~/types';

const FilePlusLineIcon = ({ size = 20, color = '#CF8E76', className }: IconProps) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V11C20 11.5523 19.5523 12 19 12C18.4477 12 18 11.5523 18 11V4L6 4V20H12C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22H6C4.89543 22 4 21.1046 4 20V4Z"
      fill={color}
    />
    <path
      d="M18 14C17.4477 14 17 14.4477 17 15V17H15C14.4477 17 14 17.4477 14 18C14 18.5523 14.4477 19 15 19H17V21C17 21.5523 17.4477 22 18 22C18.5523 22 19 21.5523 19 21V19H21C21.5523 19 22 18.5523 22 18C22 17.4477 21.5523 17 21 17H19V15C19 14.4477 18.5523 14 18 14Z"
      fill={color}
    />
    <path
      d="M9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H9Z"
      fill={color}
    />
    <path
      d="M8 16C8 15.4477 8.44772 15 9 15H12C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17H9C8.44772 17 8 16.5523 8 16Z"
      fill={color}
    />
    <path
      d="M9 7C8.44772 7 8 7.44772 8 8C8 8.55228 8.44772 9 9 9H15C15.5523 9 16 8.55228 16 8C16 7.44772 15.5523 7 15 7H9Z"
      fill={color}
    />
  </svg>
);

export default FilePlusLineIcon;
