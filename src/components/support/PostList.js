import React, { useState } from 'react';
import styles from './PostList.module.scss';
import Back from 'components/svg/header/Back';
import Message from "../../components/message/Message";

import classnames from 'classnames/bind';
import { Button } from '@material-ui/core';


const cn = classnames.bind(styles);

const PostItem = ({ postData }) => {
    const {
        title, body, created_at,
    //    updated_at
        question, answer
    } = postData;

    const [open, setOpen] = useState(false);

    return (
        <li className={cn('list-element', { open: open })} onClick={() => setOpen(!open)}>
            <Button className={styles['preview']}>
                <div className={styles['text']}>
                    <p className={styles['created-at']}>{created_at}</p>
                    <h2 className={styles['title']}>{title}{question}</h2>
                </div>
                <Back rotate="270deg"/>
            </Button>
            <div className={cn('content')}>{body}{answer}</div>
        </li>
    )
}

export default ({ listData, emptyMessage }) => 
    Array.isArray(listData) && listData.length ? (
        <ul className={styles['post-list']}>
            {listData.map((postData) => 
                <PostItem postData={postData} key={postData.id} />
            )}
        </ul>
    ) : <Message msg={emptyMessage} />;
