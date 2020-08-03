import axios from 'axios';

const url ="http://devapi.ajoonamu.com/api/user/cart/list";
const token ="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuYWpvb25hbXUubG9jYWxcL2FwaVwvdXNlclwvbG9naW4iLCJpYXQiOjE1OTQ2MDcwMTAsImV4cCI6MTYxMDM3NTAxMCwibmJmIjoxNTk0NjA3MDEwLCJqdGkiOiJWejdaZDF6TzdUZGRSdkQ3Iiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.GCidmmujXoPEp8ZY42-SqFniueGWLEs9AqZ5qHqWgrM";

export const getCartList =async ()=>{
    console.log("들어옴");

    const config = {
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        }
    }
    const result = await axios.get(url,config);
    console.log(result);
    console.log(result.request.response);
    return result.request.response;
}