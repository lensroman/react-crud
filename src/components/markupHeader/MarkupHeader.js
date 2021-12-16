import React from "react";

import classes from './MarkupHeader.module.scss';

const MarkupHeader = props => {

    return (
        <div className={classes.MarkupHeader}>
            <div>
                <h1>Окно разметки</h1>
            </div>
            <div>
                <button
                    className={classes.Button}
                    onClick={props.rectMode}
                    disabled={props.rect}
                >
                    Прямоугольник
                </button>
                <button
                    onClick={props.polygonMode}
                    disabled={props.polygon}
                    className={classes.Button}
                >
                    Полигон
                </button>
            </div>
            <div>
                <button className={classes.Button}>Предыдущее изображения</button>
                <button className={classes.Button}>Следующее изображения</button>
                <button onClick={props.save} className={classes.Button}>Сохранить</button>
            </div>
        </div>
    )
};

export default MarkupHeader;