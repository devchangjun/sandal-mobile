/*global kakao*/
import React,{ useEffect,useRef } from 'react';
import classNames from 'classnames/bind';
import Back from 'components/svg/header/goBack';
import LinkButtom from 'components/button/LinkButton';
import MarkerImg from './MarkerImg.svg';
import styles from './MapModal.module.scss';
import logo from  './location.png';
import { ButtonBase, IconButton } from '@material-ui/core';

//api
import { getCoordinates } from '../../api/address/address';
import { useModal } from '../../hooks/useModal';

const cx = classNames.bind(styles);

const FullScreenDialog = (props) => {
    const openModal = useModal();
    
    const [jibun, setJibun] = React.useState('');
    const [road, setRoad] = React.useState('');
    const [detail, setDetail] = React.useState('');
    const [click, setClick] = React.useState(false);

    const onChangeDetail =(e)=>setDetail(e.target.value);
    const { lat, lng } = props.position;
    const MapLevel = useRef(5);

    const handleClose = () => {
        setJibun('');
        setRoad('');
        props.handleClose();
    };
    useEffect(() => {
        mapScript();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lng, click]);

    const resetLocation = async () => {
        if ('geolocation' in navigator) {
            setClick(true);
            try {
                const p = await getCoordinates();
                const lat = p.coords.latitude;
                const lng = p.coords.longitude;
                props.onClickPosition(lat, lng);
            } catch (e) {
                console.log(e);
                if (e.code === 3) {
                    openModal("요청 시간이 초과되었습니다.", "네트워크 상태를 확인하신 후 다시 시도해 주세요.");
                } else {
                    openModal("위치 정보 접근이 거부되었습니다.", "위치 정보 허용을 하신 후에 다시 시도해 주세요.");
                }
            }
            setClick(false);
        }
    };



    const mapScript = () => {
        let container = document.getElementById('map');
        let options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: MapLevel.current
        };
        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();

        var imageSrc = MarkerImg,
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
        );
        // markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 현재 위치 중심으로 마커포지션을 설정.

        // 마커 정보를 가지고 뷰에 띄울 마커 생성
        const marker = new kakao.maps.Marker({
            position: map.getCenter(),
            image: markerImage,
        });

        // const infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
        marker.setMap(map);

        firstSetting(lng, lat, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                setJibun(result[0].address.address_name);
                if (!!result[0].road_address) {
                    setRoad(result[0].road_address.address_name);
                }
            }
        });

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            // 클릭한 위도, 경도 정보를 가져옵니다

            searchDetailAddrFromCoords(mouseEvent.latLng, function (
                result,
                status,
            ) {
                if (status === kakao.maps.services.Status.OK) {

                    var latlng = mouseEvent.latLng;


                    props.onClickPosition(latlng.getLat(), latlng.getLng());
                    // 마커를 클릭한 위치에 표시합니다
                    marker.setPosition(latlng);
                    marker.setMap(map);
                    setJibun(result[0].address.address_name);

                    if (!!result[0].road_address) {
                        setRoad(result[0].road_address.address_name);
                    } else {
                        setRoad('');
                    }

                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    // infowindow.setContent(content);
                    // infowindow.open(map, marker);
                }
            });
        });

        // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'zoom_changed', function () {
            // 지도의 현재 레벨을 얻어옵니다
            var level = map.getLevel();
            MapLevel.current = parseInt(level);
        });

        function searchDetailAddrFromCoords(coords, callback) {
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
            // console.log(coords.getLng());
        }

        function firstSetting(lng, lat, callback) {
            geocoder.coord2Address(lng, lat, callback);
        }

        // 나중에 가게 정보 받아올때 띄워야 할 마커
        // markerdata.forEach((el) => {
        //     const marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(el.lat, el.lng),
        //         title: el.title,
        //         clickable: true,
        //         image : markerImage
        //     })
        //     const hstyle = {
        //         color: "black",
        //         backgroundColor: "blue",
        //         fontFamily: "Arial"
        //     }

        //     var iwContent = '<div class="customoverlay" >Hello Wozzzrld!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        //         iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        //     // 인포윈도우를 생성합니다
        //     var infowindow = new kakao.maps.InfoWindow({
        //         content: iwContent,
        //         removable: iwRemoveable
        //     });

        //     // 마커에 클릭이벤트를 등록합니다
        //     kakao.maps.event.addListener(marker, 'click', function () {
        //         // 마커 위에 인포윈도우를 표시합니다
        //         infowindow.open(map, marker);
        //     });
        // });
    };

    return (
        <div className={styles['map']}>
            <div className={cx('map-modal', { on: props.open })}>
                <div
                    id="map"
                    className={styles['map']}
                    style={{ width: '100vw', height: '100vh' }}
                ></div>
            </div>
            <IconButton
                className={cx('back', { on: props.open })}
                onClick={handleClose}
            >
                <Back />
            </IconButton>
            <MyLocation onClick={resetLocation} open={props.open} />
            <BottomModal
                open={props.open}
                jibun={jibun}
                road={road}
                detailAddr={detail}
                onChange={onChangeDetail}
                onClick={() => props.onClick(jibun, detail, lat, lng)}
            />
        </div>
    );
};

const BottomModal = ({ open, jibun, road, detailAddr, onChange, onClick }) => (
    <div className={cx('bottom-modal', { on: open })}>
        <div className={styles['table']}>
            <div className={styles['addr']}>
                <div className={styles['jibun-addr']}>{jibun}</div>
                <div className={styles['road']}>
                    <div className={styles['box']}>도로명</div>
                    <div className={styles['road-addr']}>{road}</div>
                </div>
                <div className={styles['detail']}>
                    <input
                        value={detailAddr}
                        onChange={onChange}
                        className={styles['detail-input']}
                        type="text"
                        placeholder="상세 주소를 입력하세요"
                    />
                </div>
            </div>
            <LinkButtom
                title={'이 위치로 배달지 설정'}
                toggle={true}
                onClick={onClick}
            />
        </div>
    </div>
);

const MyLocation = ({ onClick, open }) => (
    <ButtonBase className={cx('location', { on: open })} onClick={onClick}>
        <img src={logo} alt="logo" />
    </ButtonBase>
);

export default FullScreenDialog;



