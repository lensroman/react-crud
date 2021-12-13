import React from "react";

import classes from './markupHeader.module.scss';

const MarkupHeader = props => {

    return (
        <div className={classes.markupHeader}>
            <div>
                <h1>Окно разметки</h1>
            </div>
            <div>
                <button>Предыдущее изображения</button>
                <button>Следующее изображения</button>
                <button>Сохранить</button>
            </div>
        </div>
    )
};

export default MarkupHeader;