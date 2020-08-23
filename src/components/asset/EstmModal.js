import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import styles from './Estm.module.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import esit from 'components/svg/esit/esit.png';
import classNames from 'classnames/bind';
import DialogContent from '@material-ui/core/DialogContent';

const cx = classNames.bind(styles);

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
        fontSize: 14,
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
        fontWeight:"bold",
        color :"#333",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EsitModal = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Dialog
                fullScreen
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            견적서 발송
                        </Typography>
                        <div className={styles['empty']}></div>
                    </Toolbar>
                </AppBar>
                <div className={styles['title']}>수신자</div>
                <DialogContent className={classes.content}>
                    <div className={styles['modal-input-box']}>
                        <input className={styles['modal-input']}></input>
                    </div>
                </DialogContent>
                <div className={styles['title']}>받을 이메일 주소</div>
                <DialogContent className={classes.content}>
                    <div className={styles['modal-input-box']}>
                        <input className={styles['modal-input']}></input>
                    </div>
                </DialogContent>
                {props.isEsit && (
                    <DialogContent className={classes.content}>
                        <div className={styles['estm']}>
                            <img src ={esit} alt="estm"/>
                        </div>
                        {/* <FixButton title={"확인"} onClick={props.handleOpen} toggle={true} /> */}
                    </DialogContent>
                )}
                <LinkButton on={true} onClick={props.onClick} />
            </Dialog>
        </div>
    );
};

function LinkButton({ on, onClick }) {
    return (
        <div className={styles['btn']}>
            <div className={cx('item', { on: !on })} onClick={onClick}>
                건너뛰기
            </div>
            <div className={cx('item', { on: on })} onClick={onClick}>
                견적서 발송
            </div>
        </div>
    );
}

export default EsitModal;
