import React, {useContext} from 'react';
import classes from'./NoticeList.module.css'
import Notice from "../UI/Notice/Notice";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const NoticeList = observer (() => {

    const {notice} = useContext(Context)

    return (
        <div className={classes.noticeList}>
            {notice.notices.map(n =>
            <Notice
                key={n.id}
                isSuccess={n.isSuccess}
                onClick={() => notice.removeNotice(n)}
            >
                {n.message}
            </Notice>
            )}
        </div>
    );
});

export default NoticeList;