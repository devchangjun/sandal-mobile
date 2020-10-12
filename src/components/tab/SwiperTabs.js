import React from 'react';
import classnames from 'classnames/bind';

import styles from './SwiperTab.module.scss';
import SwipeableTabs from 'react-swipeable-tabs';
import { ButtonBase } from '@material-ui/core';
import { useSelector } from 'react-redux';

const cn = classnames.bind(styles);

const SwiperTab = ({ idx, categorys, onChange }) => {

    const { header } = useSelector(state => state.scroll);
    return (
        <div className={cn('tab', { not_view: header })}>
            <div className={styles['items']}>
                <SwipeableTabs
                    noFirstLeftPadding={false}
                    noLastRightPadding={false}
                    fitItems={false}
                    alignCenter={true}
                    borderWidthRatio={1}
                    activeItemIndex={idx}
                    onItemClick={(item, index) => onChange(index)}
                    items={categorys.map((category) => (
                        <ButtonBase>
                            <Tab ca_name={category.ca_name} />
                        </ButtonBase>
                    ))}
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
};

const Tab = ({ ca_name }) => (
    <div className={styles['ca_name']}> {ca_name} </div>
);

export default SwiperTab;
