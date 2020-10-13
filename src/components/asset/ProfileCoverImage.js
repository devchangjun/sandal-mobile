import React, { useEffect, useState } from 'react';
import NoImage from '../svg/sign/profile.png';

export default ({ size = 72, src, alt }) => {
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => setImageSrc(src), [src]);
    return (
        <img
            src={imageSrc}
            alt={alt}
            style={{
                width: size, height: size,
                borderRadius: size / 2
            }}
            onError={() => setImageSrc(NoImage)}
        />
    );

}