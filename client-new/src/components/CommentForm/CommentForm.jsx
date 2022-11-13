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
import {editComment, leaveComment} from "../../http/deviceAPI";
import {useParams} from "react-router-dom";
import Loading from "../UI/Loading/Loading";
import {useEffect} from "react";

const CommentForm = ({setCommentFormActive, commId}) => {

    const isEditing = !!commId


    const {user, notice, oneDevice} = useContext(Context)

    const {id} = useParams()

    const [rating, setRating] = useState(1)

    const [commentText, setCommentText] = useState('')

    const commentTitle = useInput('', [
    {condition: validateEmptiness, message: "Введите заголовок комментария"},
    ])

    const {isSubmitButtonDisabled} = useForm([commentTitle.errFlag])

    const [fetchComment, isFetchCommentLoading, fetchCommentMessage] = useFetching(async () => {
        const comment = await leaveComment(id, commentTitle.value, commentText, rating, user.user.id)
        oneDevice.setComments([{...comment, user: {email: user.user.email, id: user.user.id}},...oneDevice.comments])
        setCommentFormActive(false)
    }, 'Комментарий успешно добавлен')

    const [fetchCommentEdit, isFetchCommentEditLoading, fetchCommentEditMessage] = useFetching(async () => {
        const comment = await editComment(id, commentTitle.value, commentText, rating, user.user.id)

        const comments = oneDevice.comments.filter((comm) => commId !== comm.id)

        oneDevice.setComments([{...comment, user: {email: user.user.email, id: user.user.id}},...comments])

        setCommentFormActive(false)
    }, 'Комментарий успешно изменен')

    useEffect(() => {
        if (fetchCommentMessage.message)
            notice.addNotice(fetchCommentMessage)
        if (fetchCommentEditMessage.message)
            notice.addNotice(fetchCommentEditMessage)
    }, [fetchCommentMessage, fetchCommentEditMessage])


    return (
        <Form>
            <Loading isLoading={isFetchCommentLoading || isFetchCommentEditLoading}/>
            {
                isEditing
                    ? <h2>Редактировать комментарий</h2>
                    : <h2>Оставить комментарий</h2>
            }

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
            { isEditing ?
                <SubmitButton isDisabled={isSubmitButtonDisabled} submit={fetchCommentEdit}>
                    Редактировать
                </SubmitButton>
                :
                <SubmitButton isDisabled={isSubmitButtonDisabled} submit={fetchComment}>
                Добавить
                </SubmitButton>
            }

        </Form>
    );
};

export default CommentForm;