import React,{useEffect,useState} from 'react';
import styles from './SwiperTab.module.scss';
import SwipeableTabs from 'react-swipeable-tabs';
 
const TestTabs =({idx,onChange})=> {
    const [items, setItems] = useState([
        "Item1","Item2","Item3","Item4","Item5","Item6",
    ])
    useEffect(()=>{

    },[])
 
    return (
        <div className={styles['list']}>
      <SwipeableTabs
        noFirstLeftPadding={false}
        noLastRightPadding={false}
        fitItems={false}
        alignCenter={false}
        borderWidthRatio={1}
        activeItemIndex={idx}
        onItemClick={(item, index) => onChange(index)}
        items={items}
        borderPosition="bottom"
        borderThickness={2}
        itemClassName={styles['item']}
        borderColor="#222"
        activeStyle={{
          color: '#000'
        }}
      />
      </div>
    );  
} 
export default TestTabs;