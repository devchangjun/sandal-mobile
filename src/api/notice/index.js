let notice_list = [
    {
        id: 1,
        message: "결제하신 음식 배송이 준비되었습니다.",
        send_at: new Date(2020, 6, 14, 13, 20),
        checked: true,
    },
    {
        id: 2,
        message: "결제 완료되었습니다.",
        send_at: new Date(2020, 6, 28, 13, 50),
        checked: true,
    },
    {
        id: 3,
        message: "배송 시작(도착 예정 시간: 12시 ~ 13시사이)",
        send_at: new Date(2020, 7, 30, 15, 38),
        checked: false,
    },
    {
        id: 4,
        message: "결제하신 음식 배송이 준비되었습니다.",
        send_at: new Date(2020, 7, 30, 20, 22),
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

function reqChecked(id) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            notice_list = notice_list.map(item => item.id === id ? { ...item, checked: true } : item);
            const result = true;
            resolve(result);
        }, 1000);
    });
    return promise;
}

export const requestNoticeList = async () => {
    const res = await reqList();
    return res.reverse();
}

export const requestNoticeChecked = async (id) => {
    const res = await reqChecked(id);
    return res;
}