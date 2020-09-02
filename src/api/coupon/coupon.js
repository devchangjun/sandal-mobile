const sleep = n => new Promise(resolve => setTimeout(resolve, n));
const cp_init = [
    {
        cp_id: 1,
        event_name: '첫 주문 3,000원 할인 쿠폰',
        sale: '3,000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
    },

    {
        cp_id: 2,
        event_name: '첫 주문 3,000원 할인 쿠폰',
        sale: '3,000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
    },

    {
        cp_id: 3,
        event_name: '첫 주문 3,000원 할인 쿠폰',
        sale: '3,000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
    },
    {
        cp_id: 4,
        event_name: '첫주문 3,000원 할인 쿠폰',
        sale: '3,000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
    },
    {
        cp_id: 5,
        event_name: '첫주문 3,000원 할인 쿠폰',
        sale: '3,000원',
        sub_name: '첫 주문시 사용',
        date: '2020-05-10 ~ 2020-06-10 까지',
    },
];

export const getCoupons = async () => {
    console.log("들어옴");
    await sleep(500); // 0.5초 쉬고
    return cp_init; // list 배열
  };