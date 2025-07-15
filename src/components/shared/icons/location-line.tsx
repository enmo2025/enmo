import React from 'react';
import { IconProps } from '~/types';

const LocationLineIcon = ({ size = 20, color = '#CF8E76', className }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7ZM11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.2263 3.98053C14.2238 1.33982 9.7762 1.33982 6.7737 3.98053C3.40988 6.93903 3.05764 12.1211 5.98017 15.5246L11.2413 21.6515C11.4313 21.8727 11.7084 22 12 22C12.2916 22 12.5687 21.8727 12.7587 21.6515L18.0198 15.5246C20.9423 12.1211 20.5901 6.93903 17.2263 3.98053ZM8.09454 5.48233C10.3418 3.50589 13.6582 3.50589 15.9054 5.48233C18.4426 7.71374 18.7151 11.6449 16.5024 14.2216L12 19.465L7.49752 14.2216C5.28489 11.6449 5.55741 7.71374 8.09454 5.48233Z"
      fill="black"
    />
  </svg>
);

export default LocationLineIcon;
