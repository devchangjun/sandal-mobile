import React from 'react';
import classNames from 'classnames/bind';
import { Button } from '@material-ui/core';
import styles from './QNASend.module.scss';

const cn = classNames.bind(styles);

const QNASend = ({ state, onChange, onSubmit }) => {
    const { title, content, email, files } = state;
    return (
        <div className={styles['content']}>
            <div className={styles['input-area']}>
                <input
                    className={styles['input-box']}
                    name="title"
                    placeholder="제목"
                    value={title}
                    onChange={onChange}
                />
            </div>
            <div className={styles['input-area']}>
                <textarea
                    className={cn('input-box', 'textarea-box')}
                    name="content"
                    placeholder="문의하실 내용을 기입해 주세요."
                    value={content}
                    onChange={onChange}
                />
            </div>
            <div className={styles['input-area']}>
                <input
                    className={styles['input-box']}
                    name="email"
                    placeholder="답변 받을 이메일 주소"
                    email={email}
                    onChange={onChange}
                />
            </div>
            <div className={styles['input-area']}>
                <input
                    className={styles['input-box']}
                    name="files"
                    placeholder="첨부파일 추가"
                    files={files}
                    onChange={onChange}
                />
            </div>
            <div className={styles['submit-area']}>
                <Button onClick={onSubmit}>
                    <div className={styles['submit']}>문의하기</div>
                </Button>
            </div>
        </div>
    );
};

export default QNASend;
