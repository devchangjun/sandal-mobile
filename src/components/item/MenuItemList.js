import React, { useCallback } from 'react';
import styles from './MenuItem.module.scss';
import MenuItem from './MenuItem';
import { List } from 'react-virtualized';

const MenuItemList = ({ menuList, onClick }) => {
    // console.log('메뉴리스트');
    // console.log(menuList.length);
    // const temp = useCallback(({ index, key, style }) => {
    //     const menu = menuList[index];
    //     return (
    //         <MenuItem
    //             ca_id={menu.ca_id}
    //             created_at={menu.created_at}
    //             deleted={menu.deleted}
    //             item_id={menu.item_id}
    //             item_img={menu.item_img}
    //             item_name={menu.item_name}
    //             item_order={menu.item_order}
    //             item_prefer={menu.item_prefer}
    //             item_price={menu.item_price}
    //             item_sales={menu.item_sales}
    //             item_sub={menu.item_sub}
    //             item_taxmny={menu.item_taxmny}
    //             item_vatmny={menu.item_vatmny}
    //             updated_at={menu.updated_at}
    //             key={menu.item_id}
    //             style={style}
    //             onClick={() => onClick(menu.item_id)}
    //         />
    //     );
    // });

    const rowRenderer = menuList.map((menu) => {
        return (
            <MenuItem
                ca_id={menu.ca_id}
                created_at={menu.created_at}
                deleted={menu.deleted}
                item_id={menu.item_id}
                item_img={menu.item_img}
                item_name={menu.item_name}
                item_order={menu.item_order}
                item_prefer={menu.item_prefer}
                item_price={menu.item_price}
                item_sales={menu.item_sales}
                item_sub={menu.item_sub}
                item_taxmny={menu.item_taxmny}
                item_vatmny={menu.item_vatmny}
                updated_at={menu.updated_at}
                key={menu.item_id}
                onClick={() => onClick(menu.item_id)}
            />
        );
    });

    return <div className={styles['menu-list']}>{rowRenderer}</div>;

    // return (
    //     <>
    //         {menuList && (
    //             <List
    //                 className={styles['menu-list']}
    //                 width={327}
    //                 height={732}
    //                 rowCounter={0}
    //                 rowHeight={225}
    //                 rowRenderer={temp}
    //                 list={menuList}
    //                 style={{ outline: 'none' }}
    //             ></List>
    //         )}
    //     </>
    // );
};

export default React.memo(MenuItemList);
