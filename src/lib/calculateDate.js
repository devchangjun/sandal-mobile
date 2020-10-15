export const calculateDate = (date, term, type) => {
    const cal_date = new Date(date);
    switch (type) {
        case 'DATE':
            return new Date(cal_date.setDate(cal_date.getDate() - term));
        case 'MONTH':
            return new Date(cal_date.setMonth(cal_date.getMonth() - term));
        case 'YEAR':
            return new Date(
                cal_date.setFullYear(cal_date.getFullYear() - term),
            );
        default:
            return cal_date;
    }
};

export const calculateDay = (date) => {
    date = date.replace(/-/gi, '/'); // '2019/09/09 17:22'
    var newArr = date.split(' ');
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];

    const cal_date = new Date(date);
    const day = week[cal_date.getDay()];
    const str = newArr.join(` ${day} `);

    return str;
};
