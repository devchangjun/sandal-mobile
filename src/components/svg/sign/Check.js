import React from 'react';

export default function Check({ on }) {
    return (
        <svg width="17.096" height="15.17" viewBox="0 0 17.096 15.17">
            <path
                style={{transition: 'stroke .15s cubic-bezier(0.77, 0, 0.175, 1)'}}
                d="M492.5-1964.84l4.45,6.806,9.859-12.768"
                transform="translate(-491.116 1972.204)"
                fill="none" stroke={on ? '#007246' : '#dbdbdb'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            />
        </svg>
    );
};
