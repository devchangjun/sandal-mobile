import React from 'react';


export default function Check({on}) {
    return (
        <svg  width="17.096" height="15.17" viewBox="0 0 17.096 15.17">
            <path 
             d="M492.5-1964.84l4.45,6.806,9.859-12.768" 
             transform="translate(-491.116 1972.204)" 
             fill="none" stroke={on ? "#007246" : "#dbdbdb"}
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" />
        </svg>
    )
}


{/* <svg xmlns="http://www.w3.org/2000/svg" width="17.096" height="15.17" viewBox="0 0 17.096 15.17">
  <path 
   d="M492.5-1964.84l4.45,6.806,9.859-12.768" 
   transform="translate(-491.116 1972.204)" 
   fill="none"
    stroke="#007246" 
    stroke-linecap="round" 
    stroke-linejoin="round" stroke-width="2"/>
</svg> */}
