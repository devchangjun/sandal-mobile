import React from 'react';
import styled from 'styled-components';

const ImageBox = styled.img`
    width: 100%;
`;

export default ({ image }) => image ? <ImageBox className={""} src={image} alt="event_image" /> : null;