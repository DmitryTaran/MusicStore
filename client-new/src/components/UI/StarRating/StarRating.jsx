import React, {useState} from 'react';
import {AiFillStar} from 'react-icons/ai'
import classes from './StarRating.module.css'

const StarRating = ({rating, setRating}) => {

    const [hover, setHover] = useState(null)

    return (
        <div className={classes.starRating}>
            {[...Array(5)].map((star, index) => {

                    const ratingValue = index + 1

                    return (
                        <label key={index} htmlFor="">
                            <input
                                type="radio"
                                name='rating'
                                value={ratingValue}
                                className={classes.inputRadio}
                            />
                            <AiFillStar
                                onClick={() => setRating(ratingValue)}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(rating)}
                                className={classes.star}
                                color={ratingValue <= (hover || rating) ? '#f1ba30' : '#999999'}
                                size={25}
                            />
                        </label>
                    )

                }
            )
            }

        </div>
    );
};

export default StarRating;