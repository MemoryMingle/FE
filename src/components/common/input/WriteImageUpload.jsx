import React from 'react';
import { styled } from 'styled-components';
import PropTypes from 'prop-types';

function WriteImageUpload({ height, bgcolor, children, onImageChange ,color}) {
  return (
    <>
      <ThumbnailLabel htmlFor='imageUpload' height={height} bgcolor={bgcolor} color={color}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/image/photo.png`}
          alt='thumbnail'
        /> 
        <p>{children}</p>
      </ThumbnailLabel>
      <ThumbNail id='imageUpload' onChange={onImageChange} />
    </>
  );
}

const ThumbnailLabel = styled.label`
  width: 100%;
  height: ${(prop) => prop.height};
  cursor: pointer;
  display: block;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${(prop) => prop.bgcolor};
  border-radius: 15px;
  padding: 50px;

  img {
    height: 40px;
    margin-bottom: 5px;
  }

  p {
    color: ${(prop) => prop.color? prop.color : "white"};
    font-size: 16px;
    font-weight: 600;
  }
`;

const ThumbNail = styled.input.attrs({
  type: 'file',
  accept: 'image/*',
})`
  width: 100%;
  height: 20vh;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 12px;
  display: none;
`;

WriteImageUpload.propTypes = {
  height: PropTypes.string,
  bgcolor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
  ]),
  onImageChange: PropTypes.func,
  color: PropTypes.string
};

export default WriteImageUpload;
