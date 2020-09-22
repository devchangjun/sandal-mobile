import axios from 'axios';
import { Paths } from '../../paths';
import Banner1 from '../../components/svg/event/banner1.png';
import Banner2 from '../../components/svg/event/banner2.png';
import Banner3 from '../../components/svg/event/banner3.png';
import Banner4 from '../../components/svg/event/banner4.png';
import Banner5 from '../../components/svg/event/banner5.png';
import Image from '../../components/svg/event/event1.png';
import { get } from 'scriptjs';

const event_list = [
    {
        id: 1,
        banner: Banner1,
        image: Image,
        content: `
            아주나무의 새로운 메뉴 출시
            출시 이벤트로 5%할인 받으세요.
        `,
        created_at: new Date(),
        ended_at: new Date(),
        precautions: `
            위의 이벤트는 조기마감될 수 있습니다.
            기간 내 1인당 1일 1회만 사용가능합니다.
        `,
    },
    {
        id: 2,
        banner: Banner2,
        image: Image,
        content: `
            아주나무의 새로운 메뉴 출시
            출시 이벤트로 5%할인 받으세요.
        `,
        created_at: new Date(),
        ended_at: new Date(),
        precautions: `
            위의 이벤트는 조기마감될 수 있습니다.
            기간 내 1인당 1일 1회만 사용가능합니다.
        `,
    },
    {
        id: 3,
        banner: Banner3,
        image: Image,
        content: `
            아주나무의 새로운 메뉴 출시
            출시 이벤트로 5%할인 받으세요.
        `,
        created_at: new Date(),
        ended_at: new Date(),
        precautions: `
            위의 이벤트는 조기마감될 수 있습니다.
            기간 내 1인당 1일 1회만 사용가능합니다.
        `,
    },
    {
        id: 4,
        banner: Banner4,
        image: Image,
        content: `
            아주나무의 새로운 메뉴 출시
            출시 이벤트로 5%할인 받으세요.
        `,
        created_at: new Date(),
        ended_at: new Date(),
        precautions: `
            위의 이벤트는 조기마감될 수 있습니다.
            기간 내 1인당 1일 1회만 사용가능합니다.
        `,
    },
    {
        id: 5,
        banner: Banner5,
        image: Image,
        content: `
            아주나무의 새로운 메뉴 출시
            출시 이벤트로 5%할인 받으세요.
        `,
        created_at: new Date(),
        ended_at: new Date(),
        precautions:`
            위의 이벤트는 조기마감될 수 있습니다.
            기간 내 1인당 1일 1회만 사용가능합니다.
        `,
    },
];

function reqList() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = event_list.map(item => {
                const { banner, id } = item;
                return { banner, id };
            });
            resolve(result);
        }, 1000);
    });
    return promise;
}
function reqItem(id) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = event_list.find(item => item.id === id);
            resolve(result);
        }, 1000);
    });
    return promise;
}

export const requestEventList = async () => {
    const res = await reqList();
    return res;
}

export const requestEventPost = async (id) => {
    const res = await reqItem(id);
    try{
    console.log(res);
    return res;
    }
    catch(e){
        return e;
    }
}

export const reqEventList = async()=>{
    const req = `${Paths.api}user/event/list?offset=&limit=`;
    axios.defaults.baseURL=req;
    const res = await axios.get();
    return res.data.query.events;
}