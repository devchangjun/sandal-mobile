import React from 'react';
import styles from './Review.module.scss';
import ReviewItem from './ReviewItem';

// 슬릭추가
export default ({ reviewList, onClick }) => (
    <div className={styles['container']}>
        <p className={styles['title']}>포토리뷰</p>
        <div className={styles['review-list']}>
            {reviewList.map(
                ({
                    email,
                    review_id,
                    review_body,
                    review_images,
                    review_rating,
                }) => (
                    <ReviewItem
                        key={review_id}
                        email={email}
                        body={review_body}
                        images={review_images}
                        rating={review_rating}
                        onClick={() => onClick(review_id)}
                    />
                ),
            )}
        </div>
    </div>
);
