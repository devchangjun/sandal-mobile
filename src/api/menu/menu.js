const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

const initMenu = [
    {
        id: 1,
        list: [
            {
                id: 1,
                title: '떡볶이',
                img:
                    'http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg',
                count: '100',
                price: '5000원',
            },
            {
                id: 2,
                title: '순대',
                img:
                    'https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg',
                count: '100',
                price: '5000원',
            },
            {
                id: 3,
                title: '참치',
                count: '2',
                img:
                    'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb',
                price: '5000원',
            },
            {
                id: 4,
                title: '볶음밥',
                img:
                    'https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg',
                count: '2',
                price: '5000원',
            },
        ],
    },
    {
        id: 2,
        list: [
            {
                id: 1,
                title: '떡볶이',
                img:
                    'http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg',
                count: '100',
                price: '5000원',
            },
            {
                id: 2,
                title: '순대',
                img:
                    'https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg',
                count: '100',
                price: '5000원',
            },
            {
                id: 3,
                title: '참치',
                count: '2',
                img:
                    'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb',
                price: '5000원',
            },
            {
                id: 4,
                title: '볶음밥',
                img:
                    'https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg',
                count: '2',
                price: '5000원',
            },
        ],
    },

    {
        id: 3,
        list: [
            {
                id: 1,
                title: '떡볶이',
                img:
                    'http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg',
                count: '100',
                price: '5000원',
            },
            {
                id: 2,
                title: '순대',
                img:
                    'https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg',
                count: '100',
                price: '5000원',
            },
            {
                id: 3,
                title: '참치',
                count: '2',
                img:
                    'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb',
                price: '5000원',
            },
            {
                id: 4,
                title: '볶음밥',
                img:
                    'https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg',
                count: '2',
                price: '5000원',
            },
        ],
    },

    {
        id: 4,
        list: [
            {
                id: 1,
                title: '떡볶이',
                img:
                    'http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg',
                count: '100',
                price: '5000원',
            },
            {
                id: 2,
                title: '순대',
                img:
                    'https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg',
                count: '100',
                price: '5000원',
            },
            {
                id: 3,
                title: '참치',
                count: '2',
                img:
                    'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb',
                price: '5000원',
            },
            {
                id: 4,
                title: '볶음밥',
                img:
                    'https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg',
                count: '2',
                price: '5000원',
            },
        ],
    },
];

export const getCustomMenuList = async () => {
    console.log('들어옴');
    await sleep(1000); // 0.5초 쉬고
    return initMenu; // list 배열
};
