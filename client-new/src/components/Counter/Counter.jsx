import React from 'react';
import Button from "../UI/Button/Button";
import classes from './Counter.module.css'

const Counter = ({count, setCount}) => {


    return (
        <div className={classes.counter}>
            <Button onClick={() => {
                if (count > 1) {
                    setCount(count - 1)
                }
            }
            }
            >-</Button>
            <span>{count} шт.</span>
            <Button onClick={() => {
                setCount(count + 1)
            }}
            >
                +
            </Button>

        </div>
    );
};

export default Counter;