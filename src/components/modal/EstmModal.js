import React, { useReducer, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { requestPostEstimate } from '../../api/order/estimate';

import Estimate from '../asset/Estimate';
import { ButtonBase } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';

import styles from './EstmModal.module.scss';

const cx = classNames.bind(styles);

const useStyles = makeStyles(() => ({
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
    estimate: {
        marginTop: 48,
        marginBottom:73,
        paddingBottom:73,
    },
    estimatePreview: {
        width: '100%'
    },
    sub: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    close: {
        position: 'absolute',
        left: 24,
        zIndex: 2100,
    },
}));

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value,
    };
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EstmModal = (props) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, {
        receiver: '',
        receiver_email: '',
    });
    const [estmFile, setEstmFile] = useState(null);
    
    const onStateChange = useCallback((e) => dispatch(e.target), []);
    const sendEstimate = useCallback(async () => {
        const token = sessionStorage.getItem('access_token');
        const { receiver, receiver_email } = state;
        requestPostEstimate(token, {
            estm_email: receiver_email,
            estm_username: receiver,
            estm_file: estmFile
        });
    }, [estmFile, state])
    
    const onDownload = (ref) => {
        let position = 0;
        const doc = new jsPDF('p', 'mm');

        html2canvas(ref.current).then((canvas) => {
            const imageData = canvas.toDataURL('image/png');
            const imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
            const pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            doc.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 20) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            // doc.save('test.pdf');

            // window.open(doc.output('bloburi'));
        });
    };

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        className={classes.close}
                        color="inherit"
                        onClick={props.handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        견적서 발송
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={styles['title']}>수신자</div>
            <DialogContent className={classes.content}>
                <div className={styles['modal-input-box']}>
                    <input name="receiver" className={styles['modal-input']} onChange={onStateChange} />
                </div>
            </DialogContent>
            <div className={styles['title']}>받을 이메일 주소</div>
            <DialogContent className={classes.content}>
                <div className={styles['modal-input-box']}>
                    <input naver="receiver_email" className={styles['modal-input']} onChange={onStateChange} />
                </div>
            </DialogContent>
            {props.isEsit && (
                <DialogContent className={`${classes.content} ${classes.estimate}`}>
                    <ButtonBase className={classes.estimatePreview}>
                        <Estimate onDownload={onDownload} />
                    </ButtonBase>
                </DialogContent>
            )}
            <LinkButton on={true} onClose={props.onClick} onSubmit={sendEstimate}/>
        </Dialog>
    );
};

const LinkButton = ({ on, onClose, onSubmit }) => (
    <div className={styles['btn']}>
        <div className={cx('item', { on: !on })} onClick={onClose}>
            건너뛰기
        </div>
        <div className={cx('item', { on: on })} onClick={onSubmit}>
            견적서 발송
        </div>
    </div>
);

export default EstmModal;
