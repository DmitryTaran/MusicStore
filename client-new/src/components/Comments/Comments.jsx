import React, {useContext, useState} from 'react';
import classes from './Comments.module.css'
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CommentForm from "../CommentForm/CommentForm";
import {Context} from "../../index";
import {AiFillStar} from "react-icons/ai";
import {formatDate} from "../../utils/formatDate";
import {observer} from "mobx-react-lite";

const Comments = observer (({comments, setComments}) => {

    const [commentFormActive, setCommentFormActive] = useState(false)

    const [commentEditFormActive, setCommentEditFormActive] = useState(false)

    const {user, notice} = useContext(Context)

    const onCommentButtonClick = () => {
        if (user.isAuth)
        setCommentFormActive(true)
        else notice.addNotice({
            message: 'Чтобы оставить комментарий необходимо авторизоваться',
            isSuccess: false
        })
    }

    return (
        <div className={classes.commentsList}>
            <h2>Комментарии</h2>
            {comments.map((comment) =>
                    <div key={comment.id} className={classes.commentItem}>

                        <div >
                            <div className={classes.commentItemTitle}>{comment.user.email}
                                <span className={classes.commentItemDate}>
                                     Дата: {formatDate(comment?.updatedAt)}
                                </span>
                            </div>
                            <div className={classes.commentTitle}>{comment.title}</div>
                            <div className={classes.commentItemText}>{comment.description}</div>
                        </div>
                        {user.user.id === comment.user.id &&
                                <Modal active={commentEditFormActive} setActive={setCommentEditFormActive}>
                                    <CommentForm setCommentFormActive={setCommentEditFormActive} commId={comment.id}/>
                                </Modal>
                        }
                        <div className={classes.commentItemRating}>
                            {user.user.id === comment.user.id &&
                                <Button onClick={() => setCommentEditFormActive(true)}>
                                    Редактировать
                                </Button>
                            }
                            {comment.rate}
                            <AiFillStar size={30} color={'#f1ba30'}/>
                        </div>
                    </div>
                )
            }
            {comments.length === 0 &&
                <div className={classes.commentsEmpty}>Комментариев пока никто не оставил. Будьте первым</div>
            }
            { user.user.role === 'CLIENT' &&
                <>
                <div className={classes.commentsBtn}>
                    <Button onClick={() => onCommentButtonClick()}>Комментировать</Button>
                </div>
                <Modal active={commentFormActive} setActive={setCommentFormActive}>
                <CommentForm
                setCommentFormActive={setCommentFormActive}
                />
                </Modal>
                </>
            }



        </div>
    );
});

export default Comments;