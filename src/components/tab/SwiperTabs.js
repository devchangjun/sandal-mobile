import React,{useEffect,useState} from 'react';
import styles from './SwiperTab.module.scss';
import SwipeableTabs from 'react-swipeable-tabs';
 
const TestTabs =({idx,categorys,onChange})=> {

    const [items, setItems] = useState(categorys.map(category => category.ca_name))

    useEffect(()=>{

    },[])
 
    return (
      <div className={styles['tab']}>
        <div className={styles['items']}>
      <SwipeableTabs
        noFirstLeftPadding={false}
        noLastRightPadding={false}
        fitItems={false}
        alignCenter={true}
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
      </div>
    );  
}



export default TestTabs;