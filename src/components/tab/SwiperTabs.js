import React from 'react';
import styles from './SwiperTab.module.scss';
import SwipeableTabs from 'react-swipeable-tabs';

 
const SwiperTab =({idx,categorys,onChange})=> {
    
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
                    items={categorys.map((category) => <Tab ca_name ={category.ca_name}/>)}
                    borderPosition="bottom"
                    borderThickness={4}
                    itemClassName={styles['item']}
                    borderColor="#222"
                    activeStyle={{
                        color: '#000',
                    }}
                />
            </div>
        </div>
    );  
}

const Tab = ({ca_name}) => <>{ca_name} </>


export default SwiperTab;