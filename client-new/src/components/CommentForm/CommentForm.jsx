import React, {useContext, useState} from 'react';
import Form from "../UI/Form/Form";
import TextArea from "../UI/Input/TextArea/TextArea";
import StarRating from "../UI/StarRating/StarRating";
import classes from './CommentForm.module.css'
import Input from "../UI/Input/TextInput/Input";
import {useInput} from "../../hooks/useInput";
import {validateEmptiness} from "../../utils/validations";
import SubmitButton from "../UI/SubmitButton/SubmitButton";
import {useForm} from "../../hooks/useForm";
import {useFetching} from "../../hooks/useFetching";
import {Context} from "../../index";
import {leaveComment} from "../../http/deviceAPI";
import {useParams} from "react-router-dom";
import Loading from "../UI/Loading/Loading";

const CommentForm = ({setCommentFormActive}) => {

    const {user} = useContext(Context)

    const {id} = useParams()

    const [rating, setRating] = useState(1)

    const [commentText, setCommentText] = useState('')

    const commentTitle = useInput('', [
    {condition: validateEmptiness, message: "Введите заголовок комментария"},
    ])

    const {isSubmitButtonDisabled} = useForm([commentTitle.errFlag])

    const [fetchComment, isFetchCommentLoading, fetchCommentError] = useFetching(async () => {
        await leaveComment(id, commentTitle.value, commentText, rating, user.user.id)
        setCommentFormActive(false)
    })

    return (
        <Form>
            <Loading isLoading={isFetchCommentLoading}/>
            <h2>Оставить комментарий</h2>
            <Input
                type='text'
                title={'Заголовок'}
                placeholder={'Введите заголовок'}
                value={commentTitle.value}
                onChange={commentTitle.onChange}
                onBlur={commentTitle.onBlur}
                onFocus={commentTitle.onFocus}
                errorMessage={commentTitle.error}
            />
            <TextArea title={'Текст комментария'} text={commentText} setText={setCommentText}/>
            <div className={classes.ratingBlock}>
                Поставьте оценку
                <StarRating rating={rating} setRating={setRating}/>
            </div>
            <SubmitButton isDisabled={isSubmitButtonDisabled} submit={fetchComment}>
                Добавить
            </SubmitButton>
        </Form>
    );
};

export default CommentForm;