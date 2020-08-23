import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import styles from './Payment.module.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FixButton from 'components/button/Button';
import Check from 'components/svg/sign/Check';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);




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
    },
    close:{
        position :"absolute",
        left:24,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = (props) => {
    const classes = useStyles();

    const [payment,setPayment] = React.useState(props.payment);

    const onClickPayment =(value)=>{
        console.log(value);
        setPayment(value)
    }
    const onClickClose = ()=>{
        setPayment(props.payment);
        props.handleClose();
    }

    const list = props.payments.map(p =>(
        <PaymentItem  id ={p.payment} key= {p.payment} on={payment===p.payment}  onClick={onClickPayment}/> 
    ))

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton 
                             className={classes.close}
                        color="inherit" onClick={onClickClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            결제 방법 선택
                         </Typography>
               
                    </Toolbar>
                </AppBar>
                <div className={styles['title']}>결제 방법 선택</div>
                <div className={styles['container']}>
                    {list}
                </div>
                <FixButton title={"확인"} onClick={()=>props.onClick(payment)} toggle={true}/>
            </Dialog>
        </div>
    );
}

function PaymentItem ({id,on,onClick}){

    return(
        <div className={cx('payment-box',{on: on})}  onClick={() => onClick(id)}>
        <div className={styles['text']}>
        {id}
        </div>  
        <div className={styles['check']}>
                <Check on={on}/>
            </div>  
    </div>
    )
}

export default FullScreenDialog