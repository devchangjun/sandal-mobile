import React, { useState } from 'react';
import NoImage from '../svg/noimage.png';

export default ({ className, src, alt }) => {
    const [imageSrc, setImageSrc] = useState(src);  

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            onError={() => { setImageSrc(NoImage) }}
        />
    );
};