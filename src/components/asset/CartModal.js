import React from 'react';
import styles from './Asset.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const CartModal =(props)=>{

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    return(
 
        <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
    >
        <div className={styles['title']}>
            <DialogTitle id="form-dialog-title">맞춤 주문 설정</DialogTitle>
        </div>
        <DialogTitle id="form-dialog-title">수신자</DialogTitle>
        <DialogContent>
            <div className={styles['modal-input-box']}>
                <input></input>
            </div>
        </DialogContent>
        <DialogTitle id="form-dialog-title">받을 이메일 주소</DialogTitle>
        <DialogContent>
        <div className={styles['modal-input-box']}>
                <input></input>
            </div>
        </DialogContent>
        <DialogContent>
            <div className={styles['estimate']}>
                    
            </div>
        </DialogContent>
        <DialogContent>
            <div className={styles['box']}>
                <div className={styles['btn']} onClick={props.order}>
                    건너뛰기
                </div>
                <div className={styles['btn']}>
                    견적서발송
                </div>
            </div>
        </DialogContent>
    </Dialog>
    )
}

export default CartModal;