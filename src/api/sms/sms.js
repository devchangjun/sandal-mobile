import axios from 'axios';
import crypto from 'crypto';
import cryptoRandomString from 'crypto-random-string';
import moment from 'moment-timezone';

const SOLAPI_SMS_URL = 'https://api.solapi.com/messages/v4/send';

// const TEST = 'https://api.solapi.com/messages/v4/list';
const apiKey = 'NCS55Z1EBXCNYR8P';
const apiSecret = '2Y9J1NOIZRTA7DBU1BCTLXGVDICOAETG';

export const sendSMS = async (phoneNumber, text) => {
    const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    // const now = new Date().toISOString();
    const salt = cryptoRandomString({ length: 64 });

    const signatureKey = crypto.createHmac('sha256', apiSecret);
    const signature = signatureKey.update(now + salt).digest('hex');


    console.log('now:', now);
    console.log('salt:', salt);
    console.log('signature:', signature)

    const FORM_DATA = {
        message: {
            to: phoneNumber,
            from: '01085361309',
            text,
        },
    };
    axios.defaults.headers.common[
        'Authorization'
    ] = `HMAC-SHA256 apiKey=${apiKey}, date=${now}, salt=${salt}, signature=${signature}`;
    axios.defaults.headers.post['Context-Type'] = 'application/json';
    
    const res = await axios.post(SOLAPI_SMS_URL, FORM_DATA);
    
    console.log(res);
    return res;
};
