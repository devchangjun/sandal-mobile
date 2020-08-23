import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import styles from './Point.module.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FixButton from 'components/button/Button';

import DialogContent from '@material-ui/core/DialogContent';


//test commit
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
                            포인트 사용
                         </Typography>
                        <div className={styles['empty']}>

                        </div>
                    </Toolbar>
                </AppBar>
                <DialogContent className={classes.content}>
                    <div className={styles['point']}>
                        <div className={styles['title']}>
                            보유 포인트
                        </div>
                        <div className={styles['value']}>
                            4,000P
                        </div>  
                    </div>
                </DialogContent>
                <DialogContent className={classes.content}>
                    <div className={styles['point-input-box']}>
                        <div className={styles['title']}>
                            사용할 포인트
                        </div>
                      <div className={styles['modal-input-box']}>
                        <input className={styles['point-input']}></input>
                        <div className={styles['point-img']}>P</div>
                      </div>
                      <div className={styles['sub-title']}>
                             ※ 5,000P 이상부터 사용 가능합니다.
                        </div>
                    </div>
                </DialogContent>
                <FixButton title={"확인"} onClick={props.handleClose} toggle={true}/>
            </Dialog>
        </div>
    );
}

export default FullScreenDialog