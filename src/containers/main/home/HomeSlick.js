import React from 'react';
import styles from './HomeSlick.module.scss';
import Slider from 'react-slick';

import MainBanner1 from '../../../components/svg/banner/mainBanner1.png';

class HomeSlick extends React.Component {

    state = {
		oldSlide: 0,
		activeSlide: 1,
		end: 3
	};
    render() {
		const settings = {
			dots: false,
			infinite: true,
			autoplay: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
	
			appendDots: dots => <ul>{dots}</ul>,
 			beforeChange: (current, next) =>
				this.setState({ oldSlide: current, activeSlide: next + 1 }),
		};


        return (
            <div className={styles['container']}>
                <Slider {...settings}>
                    <div className={styles['item']}>
						<img src={MainBanner1} alt="mainBanner" />
                        <div className={styles['count']}>
							<span>
								{this.state.activeSlide}
							</span>
							<span>
								{this.state.end}
							</span>
						</div>
                    </div>
                    <div className={styles['item']}>
						<img src={MainBanner1} alt="mainBanner" />
                        <div className={styles['count']}>
							<span>
								{this.state.activeSlide}
							</span>
							<span>
								{this.state.end}
							</span>
						</div>
                    </div>
                    <div className={styles['item']}>
						<img src={MainBanner1} alt="mainBanner" />
                        <div className={styles['count']}>
							<span>
								{this.state.activeSlide}
							</span>
							<span>
								{this.state.end}
							</span>
						</div>
                	</div>
                </Slider>
            </div>
        );
    }
}

export default HomeSlick;
