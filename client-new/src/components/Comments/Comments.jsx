import React, {useContext, useState} from 'react';
import classes from './Comments.module.css'
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CommentForm from "../CommentForm/CommentForm";
import {Context} from "../../index";
import {AiFillStar} from "react-icons/ai";

const Comments = ({comments, setComments}) => {

    const [commentFormActive, setCommentFormActive] = useState(false)

    const {user} = useContext(Context)

    const onCommentButtonClick = () => {
        if (user.isAuth)
        setCommentFormActive(true)
        else alert('Чтобы оставить комментарий необходимо авторизоваться')
    }

    return (
        <div className={classes.commentsList}>
            <h2>Комментарии</h2>

            {comments.map((comment) =>
                    <div key={comment.id} className={classes.commentItem}>
                        <div >
                            <div className={classes.commentItemTitle}>{comment.userName}
                                <span className={classes.commentItemDate}>
                                     Дата: {comment.date}
                                </span>
                            </div>
                            <div className={classes.commentItemText}>{comment.text}</div>
                        </div>
                        <div className={classes.commentItemRating}>
                            {comment.rating}
                            <AiFillStar size={30} color={'#f1ba30'}/>
                        </div>
                    </div>
                )
            }
            {comments.length === 0 &&
                <div className={classes.commentsEmpty}>Комментариев пока никто не оставил. Будьте первым</div>
            }

            <div className={classes.commentsBtn}>
                <Button onClick={() => onCommentButtonClick()}>Комментировать</Button>
            </div>
            <Modal active={commentFormActive} setActive={setCommentFormActive}><CommentForm/></Modal>
        </div>
    );
};

export default Comments;