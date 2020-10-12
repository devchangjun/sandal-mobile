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
import { isEmailForm } from '../../lib/formatChecker';
import { useModal } from '../../hooks/useModal';
import Loading from '../asset/Loading';

const cx = classNames.bind(styles);

const useStyles = makeStyles(() => ({
    container: {
        paddingBottom: '60px',
    },
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        borderBottom: 'solid 1px #aaa',
        fontSize: 10,
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
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
        marginBottom: 73,
        paddingBottom: 73,
    },
    estimatePreview: {
        width: '100%',
    },
    sub: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    close: {
        position: 'absolute',
        width: '40px', height: '40px',
        left: 14, zIndex: 2100
    },
}));

const reducer = (state, action) => ({
    ...state,
    [action.name]: action.value,
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EstmModal = (props) => {
    const classes = useStyles();
    const openModal = useModal();

    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        receiver: '',
        receiver_email: '',
    });
    const [estmFile, setEstmFile] = useState(null);

    const onStateChange = useCallback(e => dispatch(e.target), []);
    const sendEstimate = useCallback(async () => {
        if (estmFile) {
            if (isEmailForm(state.receiver_email)) {
                const token = sessionStorage.getItem('access_token');
                setLoading(true);
                try {
                    const { receiver, receiver_email } = state;
                    const res = await requestPostEstimate(token, {
                        estm_email: receiver_email,
                        estm_username: receiver,
                        estm_file: estmFile,
                    });
                    if (res.data.msg === "성공") {
                        openModal('성공적으로 전송되었습니다!', '이메일을 확인해 주세요!');    
                        props.onClick();
                    } else {
                        openModal('전송이 실패했습니다.', '다시 시도해 주세요.');
                    }
                } catch (e) {
                    openModal('예기치 못한 에러가 발생했습니다!', '다시 시도해 주세요.');
                }
                setLoading(false);
            } else {
                openModal('잘못된 이메일 형식입니다.', '이메일 형식을 확인해 주세요.');
            }
        } else {
            openModal('미리보기 시도 후 전송하셔야 합니다.', '견적서를 한 번 확인 후에 시도해주세요.');
        }
    }, [estmFile, state, openModal, props]);

    const onDownload = (ref) => {
        let position = 0;
        const doc = new jsPDF('p', 'mm');
        window.scrollTo(0, 0);
        setLoading(true);
        html2canvas(ref.current).then((canvas) => {
            const imageData = canvas.toDataURL('image/png');
            const imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
            const pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            // doc.addImage(imageData, 'PNG', 0, 0, 210, 297);
            doc.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'slow');
            // doc.addImage(imageData, 'PNG', 0, position, canvas.width, canvas.height);
            heightLeft -= pageHeight;
            while (heightLeft >= 20) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            const blob = doc.output('blob');
            const makeFile = new File([blob], '샌달 견적서.pdf', {
                type: blob.type,
            });
            window.open(doc.output('bloburl'));
            setEstmFile(makeFile);
            setLoading(false);
        });
    };

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
                    <input
                        name="receiver"
                        className={styles['modal-input']}
                        onChange={onStateChange}
                    />
                </div>
            </DialogContent>
            <div className={styles['title']}>받을 이메일 주소</div>
            <DialogContent className={classes.content}>
                <div className={styles['modal-input-box']}>
                    <input
                        name="receiver_email"
                        className={styles['modal-input']}
                        onChange={onStateChange}
                    />
                </div>
            </DialogContent>
            {props.isEsit && (
                <DialogContent
                    className={`${classes.content} ${classes.estimate}`}
                >
                    <ButtonBase className={classes.estimatePreview}>
                        <Estimate onDownload={onDownload} />
                    </ButtonBase>
                </DialogContent>
            )}
            <LinkButton
                on={true}
                onClose={props.onClick}
                onSubmit={sendEstimate}
            />
            <Loading open={loading} />
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
