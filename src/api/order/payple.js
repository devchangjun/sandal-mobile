import axios from 'axios';
import { Paths } from '../../paths';

export const auth_test = async()=>{
    // var data = JSON.stringify({
    //     "cst_id": "test",
    //     "custKey": "abcd1234567890"
    //   });
    //   var xhr = new XMLHttpRequest();
    //   xhr.withCredentials = true;
      
    //   xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //       console.log(this.responseText);
    //     }
    //   });
      
    //   xhr.open("POST", "https://testcpay.payple.kr/php/auth.php");
    //   xhr.setRequestHeader("content-type", "application/json");
    //   xhr.setRequestHeader("cache-control", "no-cache");
    //   xhr.send(data);

    // var obj = new Object();
    // obj.payple_auth_file = 'auth.js';	// (필수) 가맹점이 직접 생성한 인증파일
    //   // obj.callbackFunction = getResult;
    //   console.log(obj.payple_auth_file);
  
    //   console.log('dd');
      
    //   PaypleCpayAuthCheck(obj);
      
    //   event.preventDefault();
    //   console.log("끝");

    let url = 'https://testcpay.payple.kr/php/auth.php';

    console.log(url);
    let params = {
            cst_id  :'test',
            custKey : 'abcd1234567890'
    };


    console.log(url);

    const res =await axios.post(url, JSON.stringify(params), {
            headers: {
                'content-type': 'application/json',
                'referer': 'http://localhost:3000',
            }
        });
    console.log("왜 이게 나옴");
    console.log(res);
      
}