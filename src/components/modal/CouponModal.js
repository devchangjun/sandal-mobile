import React from 'react';
import FixButton from 'components/button/Button';
import SelectCouponItemList from 'components/coupon/SelectCouponItemList';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import styles from './Coupon.module.scss';

const useStyles = makeStyles((theme) => ({
    container:{
        paddingBottom:"73px",
    },
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

const FullScreenDialog = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition} className={classes.container}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton className={classes.close} color="inherit" onClick={props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            할인 쿠폰
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={styles['pd-box']}>
                    <div className={styles['coupon']}>
                        <div className={styles['title']}>쿠폰 선택</div>
                        <div className={styles['coupon-list']}>
                            <SelectCouponItemList
                                onClick={props.onClick}
                                cp_list={props.list}
                            />
                        </div>
                    </div>
                </div>
                <FixButton title={'확인'} onClick={props.handleClose} toggle={true} />
            </Dialog>
        </div>
    );
};

export default FullScreenDialog;
