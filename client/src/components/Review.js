import React from 'react';

export const Review = ({review}) => (
  <li className="review">
    <h3 className="review__heading">
      {review.name}
    </h3>
    <p className="review__text">
      {review.message}
    </p>
  </li>
);
