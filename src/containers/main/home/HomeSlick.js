import React, { Component } from "react";
import styles from './HomeSlick.module.scss';
import Slider from "react-slick";


class HomeSlick extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000
		};
		return (
			<div className={styles['container']}>
				<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
				<Slider {...settings}>
					<div className={styles['item']}>
						1
			 	 </div>
					<div className={styles['item']}>
						2
			  </div>
					<div className={styles['item']}>
						3
			  </div>
				</Slider>
			</div>
		);
	}
}

const cssstyle = `
	.container {

	  width: 90%;
	}
	h3 {
		background: #5f9ea0;
		color: #fff;
		font-size: 36px;
		line-height: 100px;
		margin: 10px;
		padding: 2%;
		height:20vh;
		text-align: center;
	}

	`
export default HomeSlick;