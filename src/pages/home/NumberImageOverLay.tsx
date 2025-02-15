import React from 'react';
import styled from 'styled-components';

interface NumberImageOverlayProps {
    number: number;
    imageUrl: string;
}

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const NumberOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px; /* Adjust as necessary */
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: 2px black; /* Outline width and color */
`;

const Image = styled.img`
  height: 100px; /* Adjust as necessary */
  width: auto;
  display: block;
`;

const NumberImageOverlay: React.FC<NumberImageOverlayProps> = ({ number, imageUrl }) => {
    return (
        <Container>
            <Image src={imageUrl} alt="Overlay image" />
            <NumberOverlay>{number}</NumberOverlay>
        </Container>
    );
};

export default NumberImageOverlay;
