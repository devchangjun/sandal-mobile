import React from 'react';
import styles from './Asset.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Counter from 'components/counter/Counter';


const ReserveModal =(props)=>{

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    return (
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
        <DialogTitle id="form-dialog-title">주문 종류</DialogTitle>
        <DialogContent>
            <div className={styles['modal-input-box']}>
                <form>
                    <select value={props.itemType} onChange={props.onChangeType}>
                        <option value="reserve">예약주문</option>
                        <option value="delivery">배달주문</option>
                    </select>
                </form>
            </div>
        </DialogContent>
        <DialogTitle id="form-dialog-title">전체 예산</DialogTitle>
        <DialogContent>
            <div className={styles['modal-input-box']}>
                <input value={props.budget} onChange={props.onChangeBudget} ></input>
            </div>
        </DialogContent>
        <div className={styles['box']}>
            <div className={styles['title']}>
                희망 수량
            </div>
            <Counter value={props.desireQuan}/>
        </div>
        <div className={styles['box']}>
            <div className={styles['btn']} onClick={props.onCustomOrder}>
                설정
            </div>
        </div>
    </Dialog>
    )
}

export default ReserveModal;