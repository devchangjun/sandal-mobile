const notice_list = [
    {
        id: 1,
        message: "결제하신 음식 배송이 준비되었습니다.",
        send_at: new Date(),
        checked: true,
    },
    {
        id: 2,
        message: "결제 완료되었습니다.",
        send_at: new Date(),
        checked: true,
    },
    {
        id: 3,
        message: "배송 시작(도착 예정 시간: 12시 ~ 13시사이)",
        send_at: new Date(),
        checked: false,
    },
    {
        id: 4,
        message: "결제하신 음식 배송이 준비되었습니다.",
        send_at: new Date(),
        checked: false,
    },
    
];

function reqList() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = notice_list;
            resolve(result);
        }, 1000);
    });
    return promise;
}

export const requestNoticeList = async () => {
    const res = await reqList();
    return res.reverse();
}