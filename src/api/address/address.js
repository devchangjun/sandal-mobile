import axios from 'axios';
import { Paths } from '../../paths';

export const getDeliveryList = async (token) => {
    const req = `${Paths.api}user/delivery/list`;
    const params = {
        params: {
            lat: 37.182183,
            lng: 129.227344
        }
    }

    axios.defaults.baseURL = req;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.get['Context-Type'] = 'application/json';
    axios.defaults.params = params;
    const res = await axios.get();
    return res;
}

export function getCoordinates() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
// export function getLocation() {
//     // geolocation 객체가 존재하는 경우
//     if (navigator.geolocation) {
//       // 현재위치를 가져옴
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           console.log(position)
//           // arr.push({ lat: position.coords.latitude, long: position.coords.longitude })
//           // 현재 위치의 위도 경도 출력
//           console.log(`${position.coords.latitude} ${position.coords.longitude}`)
//         },
//         (err) => {
//           console.error(err)
//         },
//         {
//           enableHighAccuracy: false,
//           maximumAge: 0,
//           timeout: Infinity,
//         }
//       )
//     } else {
//       console.log('GPS를 지원하지 않습니다.')
//     }
//   }
  