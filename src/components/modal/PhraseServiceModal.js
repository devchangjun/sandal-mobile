import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames/bind'

import FixButton from '../button/Button';
import ImportLogo from '../svg/phrase/ImportLogo';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styles from './PhraseServiceModal.module.scss';
import { ButtonBase } from '@material-ui/core';
import PhraseTemplateList from '../asset/PhraseTemplateList';
import { requestPostPhraseSerive } from '../../api/order/sticker';

const cn = classnames.bind(styles);

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        fontSize: 10,
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 18,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 0,
        paddingLeft: 24,
        paddingRight: 24,
        flex: '0 0 auto',
    },
    sub: {
        fontSize: 10,
    },
    close: {
        position: 'absolute',
        left: 24,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InputLogo = ({ handleChange }) => {
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const URL = reader.result;
            setImage(URL);
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            handleChange(e.target.files[0]);
        }
    };

    return (
        <div className={styles['input-area']}>
            <ButtonBase className={cn('input-logo', 'input-box')}>
                <input id="import-logo" className={styles['filebox']} type="file" onChange={handleImageChange}/>
                <label className={styles['label']} htmlFor="import-logo" style={{ backgroundImage: 'url(' + image + ')'}}>
                    {!image && <div className={styles['add']}>
                        <div className={styles['import']}>
                            <ImportLogo />
                        </div>
                        <div className={styles['text']}>로고 가져오기</div>
                    </div>}
                </label>
            </ButtonBase>
        </div>
    );
};
const InputPhrase = ({ handleChange }) => {
    return (
        <div className={styles['input-area']}>
            <textarea
                className={cn('input-phrase', 'input-box')}
                onChange={handleChange} />
        </div>
    )
}
const InputPreview = () => {
    return (
        <div className={styles['input-area']}>
            <ButtonBase className={cn('input-preview', 'input-box')}>
                
            </ButtonBase>
        </div>
    )
}
const GuideTemplate = ({ title, children }) => (
    <div className={styles['guide']}>
        <h3 className={styles['title']}>{title}</h3>
        <div className={styles['content']}>
            {children}
        </div>
    </div>
);

export default ({ open, handleClose }) => {
    const classes = useStyles();
    
    const [template, setTemplate] = useState(0);
    const [logo, setLogo] = useState(null);
    const [phrase, setPhrase] = useState('');
    
    const TemplateList = [
        { title: '템플릿을 선택해주세요.', content: <PhraseTemplateList template={template} handleChange={setTemplate} /> },
        { title: '첨부하실 로고를 선택해주세요.', content: <InputLogo handleChange={setLogo} /> },
        { title: '입력하실 문구를 입력하세요.', content: <InputPhrase phrase={phrase} handleChange={setPhrase} /> },
        { title: '문구 미리보기', content: <InputPreview template={template} logo={logo} phrase={phrase} /> }
    ];

    const onSubmit = useCallback(async () => {
        /*
            문구 서비스 신청하기
        */
        const token = sessionStorage.getItem('access_token');
        if (token && logo && phrase) {
            const res = await requestPostPhraseSerive(token, {
                order_id: '1595924261-3598512',
                sticker_logo: logo,
                sticker_text: phrase
            });
            console.log(res);
            handleClose();
        } else {
            alert('토큰이 없습니다.');
        }
    }, [handleClose, logo, phrase]);
    
    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton className={classes.close} color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            문구 서비스 신청
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={styles['container']}>
                    {TemplateList.map((template, index) => (
                        <GuideTemplate key={index} title={template.title}>
                            {template.content}
                        </GuideTemplate>
                    ))}
                </div>
                <FixButton title={'신청하기'} onClick={onSubmit} toggle={true}/>
            </Dialog>
        </div>
    );
};