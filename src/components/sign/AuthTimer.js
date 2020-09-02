import React, { useEffect,useRef, useState } from 'react'
import styles from './Timer.module.scss';

const AuthTimer = ({start}) => {
    const [time ,setTime] = useState(60 * 3);

    useEffect(() => {
      if(start){
        if (time > 0) {
          const Counter = setInterval(() => {
              const temp = time-1;
            setTime(temp);
          }, 1000)
          return () => clearInterval(Counter)
        }
      }
      else if(!start){
        setTime(60*3);
      }
      }, [start,time])


    const timeFormat = (time) => {
        const m = Math.floor(time / 60).toString()
        let s = (time % 60).toString()
        console.log(`${m}분 ${s}초`);
        if (s.length === 1) s = `0${s}`
        return `${m}:${s}`
      }

    return(
        <div className={styles['timer']}>
          {timeFormat(time)}
        </div>
    )
}

export default AuthTimer