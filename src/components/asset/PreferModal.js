import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import styles from './Asset.module.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FixButton from 'components/button/Button';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Counter from 'components/counter/Counter';

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
        fontSize:14
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    } ,
    content : {
        padding :0,
        paddingLeft :24,
        paddingRight : 24,
        flex : "0 0 auto"
    },
    sub:{
        fontSize:10
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = (props) => {
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
                            맞춤주문
                         </Typography>
                        <div className={styles['empty']}>

                        </div>
                    </Toolbar>
                </AppBar>
                <div className={styles['title']}>
                    <DialogTitle id="form-dialog-title">맞춤 주문 설정</DialogTitle>
                </div>
                <DialogTitle className={classes.sub} id="form-dialog-title">주문 종류</DialogTitle>
                <DialogContent className={classes.content}>
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
                <DialogContent className={classes.content}>
                    <div className={styles['modal-input-box']}>
                        <input value={props.budget} onChange={props.onChangeBudget} ></input>
                    </div>
                    <div className={styles['box']}>
                        <div className={styles['title']}>
                            희망 수량
                       </div>
                        <Counter value={props.desireQuan} />
                    </div>
                </DialogContent>
                <FixButton title={"확인"} onClick={props.onCustomOrder} toggle={true}/>
            </Dialog>
        </div>
    );
}

export default FullScreenDialog