import React from 'react';
import "styles/ratingDisplay.scss";

const getRating = (n) => {
  const rating = [];
  for (let i = 0; i < 5; i++) {
    i < n ? rating.push('*') : rating.push('.')
  }
  return rating;
}

const RatingDisplay = ({rating}) => (
  <div className="rating">
    <ul className="stars">
    {
      getRating(rating).map((item, key) => (
        <li key={`${key}-star`}>
          {
            item === "*" ?
            <svg version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 306 306">
              <g>
                <g id="star-rate">
                  <polygon points="153,230.775 247.35,299.625 211.65,187.425 306,121.125 191.25,121.125 153,6.375 114.75,121.125 0,121.125     94.35,187.425 58.65,299.625   " fill="#434343"/>
                </g>
              </g>
            </svg> :
            <svg id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 306 306">
              <g>
                <g id="star-rate">
                  <polygon points="153,230.775 247.35,299.625 211.65,187.425 306,121.125 191.25,121.125 153,6.375 114.75,121.125 0,121.125     94.35,187.425 58.65,299.625   " fill="#FFFFFF" stroke="#434343" strokeWidth="10" />
                </g>
              </g>
            </svg>
          }
        </li>
      ))
    }
    </ul>
  </div>
);

export default RatingDisplay;
