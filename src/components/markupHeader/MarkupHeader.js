import React from "react";

import classes from './MarkupHeader.module.scss';
import Button from '../UI/Button/Button';

const MarkupHeader = props => {

    return (
        <div className={classes.MarkupHeader}>
            <div>
                <h1>Окно разметки</h1>
            </div>
            <div>
                <Button
                    clicked={props.rectMode}
                    disabled={props.rect}
                >
                    Прямоугольник
                </Button>
                <Button
                    clicked={props.polygonMode}
                    disabled={props.polygon}
                >
                    Полигон
                </Button>
            </div>
            <div>
                <Button>Предыдущее изображения</Button>
                <Button>Следующее изображения</Button>
                <Button clicked={props.save}>Сохранить</Button>
            </div>
        </div>
    )
};

export default MarkupHeader;