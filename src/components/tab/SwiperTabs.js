import React from 'react';
import styles from './SwiperTab.module.scss';
import SwipeableTabs from 'react-swipeable-tabs';
import { ButtonBase ,Button} from '@material-ui/core';

 
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
                    items={categorys.map((category) => <ButtonBase><Tab ca_name ={category.ca_name}/></ButtonBase>)}
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

const Tab = ({ca_name}) => <div className={styles['ca_name']}> {ca_name} </div>


export default SwiperTab;