import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import styles from './Prefer.module.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FixButton from 'components/button/Button';

import DialogContent from '@material-ui/core/DialogContent';
import { numberFormat } from "../../lib/formatter";


//test commit
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        fontSize: 10,
        paddingLeft:24,
        paddingRight:24,
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
    close:{
        position :"absolute",
        left:0,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = (props) => {
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
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                            className={classes.close}
                         >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            맞춤주문
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={styles['title']}>주문 종류</div>

                <DialogContent className={classes.content}>
                    <div className={styles['modal-input-box']}>
                        <form>
                            <select
                                value={props.itemType}
                                onChange={props.onChangeType}
                            >
                                <option value="reserve">예약주문</option>
                                <option value="delivery">배달주문</option>
                            </select>
                        </form>
                    </div>
                </DialogContent>
                <div className={styles['title']}>전체 예산</div>
                <DialogContent className={classes.content}>
                    <div className={styles['modal-input-box']}>
                        <input
                            value={numberFormat(props.budget)}
                            onChange={props.onChangeBudget}
                        ></input>
                    </div>
                </DialogContent>
                <div className={styles['title']}>희망 수량</div>
                <DialogContent className={classes.content}>
                    <div className={styles['counter']}>
                        <div className={styles['box']} >
                            -
                        </div>
                        <div className={styles['value']}>1</div>
                        <div className={styles['box']}>
                            +
                        </div>
                    </div>
                </DialogContent>

                <FixButton
                    title={'확인'}
                    onClick={props.onCustomOrder}
                    toggle={true}
                />
            </Dialog>
        </div>
    );
};

export default FullScreenDialog;
