import React from 'react';
import styles from './Address.module.scss';
import classNames from 'classnames/bind';
import { makeStyles } from '@material-ui/core/styles';
import { BsSearch } from 'react-icons/bs';
import AddrItemList from 'components/address/AddrItemList';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FixButton from 'components/button/Button';

import DialogTitle from '@material-ui/core/DialogTitle';

const cx = classNames.bind(styles);

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        fontSize: 10
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 14
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content:{
        padding: 0,
        paddingLeft :24,
        paddingRight:24,
        flex: "0 0 auto"
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

    //modal brunch test


const AddressModal = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            배달받을 주소
                         </Typography>
                        <div className={styles['empty']}>

                        </div>
                    </Toolbar>
                </AppBar>
                <div className={styles['title']}>배달 받을 주소</div>
                <DialogContent className={classes.content}>
                <div className={styles['container']}>
                        <div className={styles['modal-input-box']}>
                            <input className={styles['modal-input']} type="text" value={props.searchAddr} placeholder="예) 아주나무동12-3 또는 아주나무 아파트" onChange={props.onChangeAddr} onKeyPress={props.handleKeyPress}></input>
                            <div className={styles['search-btn']} onClick={props.onSearch} ><BsSearch /></div>
                        </div>
                        <div className={styles['result']}>
                        {props.addrs ? `${props.addrs.length}개의 검색결과가 있습니다.` : "0개의 검색결과가 있습니다."}

                        </div>
                        <div className={styles['addrs-list']}>
                            {props.addrs ? <AddrItemList addrs={props.addrs} onClick={props.onClickAddrItem} /> : ""}
                        </div>
                        <div className={styles['select-addr']}>
                            {props.selectAddr ? props.selectAddr : ""}
                        </div>
                        <input className={cx('modal-input','md-top')} type="text" value={props.detailAddr} placeholder="상세 주소를 입력하세요" onChange={props.onChangeDetail}></input>
                </div>
                </DialogContent>
                <FixButton title={"이 주소로 배달지 설정"} onClick={props.onInsertAddr} />
            </Dialog>

        </div>
    );
}

export default AddressModal;