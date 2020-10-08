import axios from 'axios';
import { Paths } from '../../paths';

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


export const getPreferMenuList = async (
    general_offset = 0,
    general_limit = 100,
    prefer_offset = 0,
    prefer_limit = 100,
    item_type = 1,
    budget,
    desire_quan,
    addr1,
    shop_id,
) => {
    const req = Paths.api + `user/item/prefer`;
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const config = {
        params: {
            general_offset,
            general_limit,
            prefer_offset,
            prefer_limit,
            item_type,
            budget,
            desire_quan,
            addr1,
            shop_id,
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
};

export const getMenuList = async (ca_id,offset=0, limit=8,shop_id) => {
    const req = Paths.api + 'user/item/list';
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const config = {
        params: {
            ca_id,
            limit,
            offset,
            shop_id
        }
    }
    const result = await axios.get(req, config);
    return result;
};

export const getMainMenuList = async (ca_id=1, offset = 0, limit = 8) => {
    const req = Paths.api + 'user/item/main';
    axios.defaults.headers.get['Context-Type'] = 'application/json';

    const config = {
        params: {
            ca_id,
            limit,
            offset,
    
        },
    };
    const result = await axios.get(req, config);
    return result;
};


export const getMenuInfo = async (item_id) => {
    const req = Paths.api + `user/item/view?offset&limit&item_id=${item_id}`;
    const config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    const result = await axios.get(req, config);
    return result.data.query;
};
