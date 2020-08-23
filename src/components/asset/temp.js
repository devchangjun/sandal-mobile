/*global kakao*/
import React, { useEffect } from 'react';
import { markerdata } from '../sampledata/Marker';
import './test.css';
import MarkerImg from './MarkerImg.svg';

export default function Map() {

    useEffect(() => {
        mapScript();
    }, []);


    const mapScript = () => {
        console.log("실행");
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
            level: 5,
        };
        const map = new kakao.maps.Map(container, options);

        var imageSrc = MarkerImg,
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다


        const marker = new kakao.maps.Marker({
            position: map.getCenter(),
            image:markerImage
        });
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);

            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            console.log(message);
            var resultDiv = document.getElementById('clickLatlng');
            //resultDiv.innerHTML = message;

        });

        markerdata.forEach((el) => {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                title: el.title,
                clickable: true,
                image : markerImage
            })


            const hstyle = {
                color: "black",
                backgroundColor: "blue",
                fontFamily: "Arial"
            }

            var iwContent = '<div class="customoverlay" >Hello Wozzzrld!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function () {
                // 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, marker);
            });

        });





        /* 단일 마커 표시 */

        // //마커가 표시될 위치
        // let markerPosition = new kakao.maps.LatLng(
        //     37.62197524055062,
        //     127.16017523675508
        // );

        // //마커 생성
        // let marker = new kakao.maps.Marker({
        //     position : markerPosition,
        // });
        // //마커를 지도위에 표시
        // marker.setMap(map);
    };

    return (
        <div id="map" className="test" style={{ width: "100vw", height: "100vh" }}>
        </div>
    )
}