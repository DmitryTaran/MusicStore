import React, {useContext, useMemo} from 'react';
import classes from './Pagination.module.css'
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {getPageCount} from "../../../utils/calculatePageCount";

const Pagination = observer (() => {

    const {device} = useContext(Context)


    const pages = useMemo(() => {
            console.log('render')
        return Array(getPageCount(device.totalCount, device.limit))
            .fill(0)
            .map((elem, index) => index + 1)},
        [device.totalCount])



    return (
        <div className={classes.pageRow}>
            {pages.map((page) =>
            <div
                className={device.page === parseInt(page)
                    ? `${classes.pageRowItem} ${classes.pageRowItemSelected}`
                    : classes.pageRowItem}
                key={page}
                onClick={() => device.setPage(parseInt(page))}
            >
                {page}
            </div>
            )}
        </div>
    );
});

export default Pagination;