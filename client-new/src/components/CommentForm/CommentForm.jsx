import React, {useState} from 'react';
import Form from "../UI/Form/Form";
import TextArea from "../UI/Input/TextArea/TextArea";
import Button from "../UI/Button/Button";
import StarRating from "../UI/StarRating/StarRating";
import classes from './CommentForm.module.css'

const CommentForm = () => {

    const [rating, setRating] = useState(null)
    const [commentText, setCommentText] = useState('')

    return (
        <Form>
            <h2>Оставить комментарий</h2>
            <TextArea title={'Текст комментария'} text={commentText} setText={setCommentText}/>
            <div className={classes.ratingBlock}>
                Поставьте оценку
                <StarRating rating={rating} setRating={setRating}/>
            </div>
            <Button>Добавить</Button>
        </Form>
    );
};

export default CommentForm;