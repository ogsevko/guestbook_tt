import React from 'react';
import { Review } from './Review';

export const ReviewList = ({ reviews }) => {
  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <Review
          review = {review}
          key = {review.id}
        />
      ))}
    </ul>
  );
};
