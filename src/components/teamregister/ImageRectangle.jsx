import React from 'react';
import styled from 'styled-components';

const ImageRectangle = ({ imagePreview, onClose }) => {
  return (
    <ImageBox>
      <Rectangle>
        {imagePreview && <PreviewImage src={imagePreview} alt="미리보기" />}
      </Rectangle>
      {onClose && (
        <CloseIcon onClick={onClose}>
          <CloseText>X</CloseText>
        </CloseIcon>
      )}
    </ImageBox>
  );
};

const ImageBox = styled.div`
  width: 112px; 
  height: 112px;
  position: relative;
  box-sizing: border-box;
  overflow: visible; 
`;

const Rectangle = styled.div`
  width: 95px;
  height: 95px;
  border: 2px solid #C2C2C2;
  border-radius: 12px;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지 크기에 맞게 잘라서 채우기
`;

const CloseIcon = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  top: -4px; 
  right: 0px; 
  background: #C7F6E4;
  border: 1px solid #08D485;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: #08D485;
  z-index: 1;
`;

const CloseText = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #08D485;
`;

export default ImageRectangle;
