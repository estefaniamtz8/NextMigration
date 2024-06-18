import React from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types'; // Import PropTypes for better type checking in Next.js

/**
 * @description Wrapper component for the login and register pages
 * @param {object} args
 * @param {string} args.urlImage - Url of image
 * @param {string} args.nameOfPage - Name of page
 * @param {number} args.paddingChildren - Padding of children
 * @param {boolean} args.centerChildren - Center children
 * @param {React.ReactNode} args.children - Children
 * @returns {React.ReactNode}
 * */

const Wrapper = ({ children, urlImage = '', nameOfPage = '', paddingChildren = 0, centerChildren = true }) => {
  // Validation function for React components
  const isValidChildren = React.isValidElement(children);

  if (!isValidChildren) {
    console.error('Wrapper: children is not a valid React component');
    return null;
  }

  if (!urlImage) {
    console.error('Wrapper: urlImage is not valid');
    return null;
  }

  if (!nameOfPage) {
    console.error('Wrapper: nameOfPage is not valid');
    return null;
  }

  return (
    <Stack width="100%" direction="row" height="100%" bgcolor="#00080C">
      <Stack width="50%" position="relative">
        <Stack
          sx={{
            position: 'absolute',
            top: '5vh',
            left: '5vw',
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: 'text.primary', fontSize: '40px' }}
          >
            {nameOfPage.toUpperCase()}
          </Typography>
        </Stack>
        <Image
          src={urlImage}
          alt={`${nameOfPage} logo`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority // Ensures the image is loaded quickly
        />
      </Stack>
      <Stack
        width="50%"
        sx={{
          p: paddingChildren,
          overflowY: 'auto',
          height: '100%',
          justifyContent: centerChildren ? 'center' : 'flex-start',
          alignItems: centerChildren ? 'center' : 'flex-start',
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

// Add PropTypes for better type checking
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  urlImage: PropTypes.string.isRequired,
  nameOfPage: PropTypes.string.isRequired,
  paddingChildren: PropTypes.number,
  centerChildren: PropTypes.bool,
};

export default Wrapper;
