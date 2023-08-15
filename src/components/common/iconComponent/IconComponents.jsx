import React from 'react';
import PropTypes from 'prop-types';
const icons = {
  home: (
    <>
      <g clipPath='url(#clip0_1_517)'>
        <path
          d='M0.809082 11.3282L11.3282 0.809158L21.8472 11.3282'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.0459 13.7557V21.8473H18.6108V13.7557'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1_517'>
          <rect width='22.6565' height='22.6565' fill='white' />
        </clipPath>
      </defs>
    </>
  ),
  group: (
    <g id='Group'>
      <path
        id='Vector'
        d='M22.2308 1H2.76923C1.79211 1 1 1.79211 1 2.76923V22.2308C1 23.2079 1.79211 24 2.76923 24H22.2308C23.2079 24 24 23.2079 24 22.2308V2.76923C24 1.79211 23.2079 1 22.2308 1Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        id='Vector_2'
        d='M8.0769 8.07692H16.9231'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        id='Vector_3'
        d='M8.0769 12.5H16.9231'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        id='Vector_4'
        d='M8.0769 16.9231H16.9231'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  ),
  inbox: (
    <>
      <path
        d='M12.5093 1C14.5239 1 16.456 1.8003 17.8806 3.22486C19.3051 4.64941 20.1054 6.58151 20.1054 8.59613C20.1054 17.0422 23.1864 18.7066 24.0186 18.7066H1C1.84992 18.7066 4.91316 17.0245 4.91316 8.59613C4.91316 6.58151 5.71346 4.64941 7.13802 3.22486C8.56257 1.8003 10.4947 1 12.5093 1V1Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.85327 21.947C10.0063 22.5349 10.3501 23.0554 10.8308 23.427C11.3114 23.7985 11.9018 24.0001 12.5093 24.0001C13.1168 24.0001 13.7071 23.7985 14.1878 23.427C14.6684 23.0554 15.0122 22.5349 15.1653 21.947'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  user: (
    <>
      <g
        id='interface-user-single--close-geometric-human-person-single-up-user'
        clipPath='url(#clip0_1_521)'
      >
        <g id='Group'>
          <path
            id='Vector'
            d='M11.3283 11.3282C14.233 11.3282 16.5878 8.97342 16.5878 6.06865C16.5878 3.16389 14.233 0.809113 11.3283 0.809113C8.4235 0.809113 6.06873 3.16389 6.06873 6.06865C6.06873 8.97342 8.4235 11.3282 11.3283 11.3282Z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            id='Vector_2'
            d='M21.3296 21.8473C20.6502 19.7286 19.3155 17.8805 17.5181 16.5693C15.7206 15.2581 13.5532 14.5516 11.3284 14.5516C9.10349 14.5516 6.93609 15.2581 5.13864 16.5693C3.34119 17.8805 2.00656 19.7286 1.32715 21.8473H21.3296Z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_1_521'>
          <rect width='22.6565' height='22.6565' fill='white' />
        </clipPath>
      </defs>
    </>
  ),
  back: (
    <>
      <path
        d='M18.6429 1L1 18.6429'
        stroke='#787878'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 1L18.6429 18.6429'
        stroke='#787878'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  vectorLeft: (
    <>
      <path
        d='M9.72518 1L1.20979 9.51538C1.14357 9.57754 1.09078 9.65261 1.0547 9.73596C1.01862 9.81931 1 9.90917 1 10C1 10.0908 1.01862 10.1807 1.0547 10.264C1.09078 10.3474 1.14357 10.4225 1.20979 10.4846L9.72518 19'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  vectorRight: (
    <>
      <path
        d='M0.999994 14L7.15 7.85C7.19783 7.80511 7.23595 7.75089 7.26201 7.69069C7.28807 7.6305 7.30151 7.5656 7.30151 7.5C7.30151 7.4344 7.28807 7.3695 7.26201 7.30931C7.23595 7.24911 7.19783 7.19489 7.15 7.15L0.999996 0.999999'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  camera: (
    <>
      <path
        d='M12.3027 7.63477V13.5322'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.35547 10.583H15.2529'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24 6.30769C24 5.83846 23.8136 5.38845 23.4818 5.05666C23.15 4.72486 22.7 4.53846 22.2308 4.53846H18.6923L16.0385 1H8.96154L6.30769 4.53846H2.76923C2.3 4.53846 1.84999 4.72486 1.5182 5.05666C1.1864 5.38845 1 5.83846 1 6.30769V16.9231C1 17.3923 1.1864 17.8423 1.5182 18.1741C1.84999 18.5059 2.3 18.6923 2.76923 18.6923H22.2308C22.7 18.6923 23.15 18.5059 23.4818 18.1741C23.8136 17.8423 24 17.3923 24 16.9231V6.30769Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </>
  ),
  inviteFriends: (
    <>
      <path
        d='M14 8.5V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H2C1.73478 14 1.48043 13.8946 1.29289 13.7071C1.10536 13.5196 1 13.2652 1 13V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H6.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M10.5 1H14V4.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14 1L7.5 7.5' strokeLinecap='round' strokeLinejoin='round' />
    </>
  ),
};

export default function IconComponents({ iconType, ...props }) {
  return (
    <svg
      width='25'
      height='25'
      viewBox='0 0 25 25'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='blck'
      {...props}
    >
      {icons[iconType]}
    </svg>
  );
}
IconComponents.propTypes = {
  iconType: PropTypes.string.isRequired,
};
