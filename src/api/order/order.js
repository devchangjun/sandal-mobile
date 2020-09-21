import axios from 'axios';
import { Paths } from '../../paths';

export const order = async (token) =>{
    // const req = Paths.api + 'user/order';

    // const form_data = {
    //     order_type: 'reserve',
    //     s_post_num:45645,
    //     s_addr1:"서울특별시 관악구 쑥고개로21길 33",
    //     s_addr2:"505",
    //     cp_id:"4AV2-1V1R-8ZKY-C1CE",
    //     order_memo:"배달테스트",
    //     delivery_memo:"테스트",
    //     shop_id:3,
    //     point_price:10,
    //     send_cost:9000,

    // };

    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // axios.defaults.headers['Context-Type'] = 'application/json';

    // const res = await axios.post(req, form_data);
    // console.log(res);
    // return res;

    var pay_work = "PAY";
    var payple_payer_id = "d0toSS9sT084bVJSNThScnFXQm9Gdz09";     
    var buyer_no = "2335";
    var buyer_name = "홍길동";
    var buyer_hp = "01012345678";
    var buyer_email = "dev@payple.kr";
    var buy_goods = "휴대폰";
    var buy_total = "1000";
var pay_istax = "";
var pay_taxtotal = "10";
    var order_num = "test0553941001540967923";
    var is_reguler = "N";
    var pay_year = "";
    var pay_month = "";
    var is_taxsave = "N";
    
    var obj = new Object();
    
    obj.PCD_CPAY_VER = "1.0.1";
    obj.PCD_PAY_TYPE = 'transfer';
    obj.PCD_PAY_WORK = pay_work;
    obj.PCD_PAYER_AUTHTYPE = 'pwd';

    /* (필수) 가맹점 인증요청 파일 (Node.JS : auth => [app.js] app.post('/pg/auth', ...) */
/* 파일 생성은 가맹점 인증요청 - Request 참조 */ 
    obj.payple_auth_file = ''; // 인증요청을 수행하는 가맹점 인증요청 파일 (예: /절대경로/가맹점이 생성한 인증파일) 
/* End : 가맹점 인증요청 파일 */

    /* 결과를 콜백 함수로 받고자 하는 경우 함수 설정 추가 */
    // obj.callbackFunction = getResult;  // getResult : 콜백 함수명
    /* End : 결과를 콜백 함수로 받고자 하는 경우 함수 설정 추가 */
    
/* 결과를 콜백 함수가 아닌 URL로 받고자 하는 경우 */
    obj.PCD_RST_URL = '/order_result.html';
    /* End : 결과를 콜백 함수가 아닌 URL로 받고자 하는 경우 */

    /*
     * 1. 간편결제
     */
    //-- PCD_PAYER_ID 는 소스상에 표시하지 마시고 반드시 Server Side Script 를 이용하여 불러오시기 바랍니다. --//
    obj.PCD_PAYER_ID = payple_payer_id;           
    //-------------------------------------------------------------------------------------//          
    obj.PCD_PAYER_NO = buyer_no;  
    obj.PCD_PAYER_EMAIL = buyer_email;
    obj.PCD_PAY_GOODS = buy_goods;
    obj.PCD_PAY_TOTAL = buy_total;
obj.PCD_PAY_ISTAX = pay_istax;
obj.PCD_PAY_TAXTOTAL = pay_taxtotal;
    obj.PCD_PAY_OID = order_num;     
    obj.PCD_REGULER_FLAG = is_reguler;
    obj.PCD_PAY_YEAR = pay_year; 
    obj.PCD_PAY_MONTH = pay_month;
    obj.PCD_TAXSAVE_FLAG = is_taxsave; 
    obj.PCD_SIMPLE_FLAG = 'Y'; 
/*
     * End : 1. 간편결제
     */
    
    /*
     * 2. 단건결제
     */
    obj.PCD_PAYER_NO = buyer_no;
    obj.PCD_PAYER_NAME = buyer_name;
    obj.PCD_PAYER_HP = buyer_hp;
    obj.PCD_PAYER_EMAIL = buyer_email;
    obj.PCD_PAY_GOODS = buy_goods; 
    obj.PCD_PAY_TOTAL = buy_total;
obj.PCD_PAY_ISTAX = pay_istax;
obj.PCD_PAY_TAXTOTAL = pay_taxtotal;
    obj.PCD_PAY_OID = order_num; 
    obj.PCD_REGULER_FLAG = is_reguler;
    obj.PCD_PAY_YEAR = pay_year;       
    obj.PCD_PAY_MONTH = pay_month;
    obj.PCD_TAXSAVE_FLAG = is_taxsave;        
/*
     * End : 2. 단건결제 
     */

    PaypleCpayAuthCheck(obj);

};
