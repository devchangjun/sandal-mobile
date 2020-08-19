import React from 'react';
import styles from './HomeSlick.module.scss';
import Slider from 'react-slick';

import MainBanner1 from '../../../components/svg/banner/mainBanner1.png';

class HomeSlick extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        };
        return (
            <div className={styles['container']}>
                <Slider {...settings}>
                    <div className={styles['item']}>
						<img src={MainBanner1} alt="mainBanner" />
					</div>
                    <div className={styles['item']}>
						<img src={MainBanner1} alt="mainBanner" />
					</div>
                    <div className={styles['item']}>
						<img src={MainBanner1} alt="mainBanner" />
					</div>
                </Slider>
            </div>
        );
    }
}

export default HomeSlick;
