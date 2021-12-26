import React from "react";

import classes from './MarkupHeader.module.scss';
import {Button} from '@mui/material';

const MarkupHeader = props => {

    return (
        <div className={classes.MarkupHeader}>
            <div>
                <h1>Окно разметки</h1>
            </div>
            <div>
                <Button
                    variant={"outlined"}
                    onClick={props.rectMode}
                    disabled={props.rect}
                >
                    Прямоугольник
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={props.polygonMode}
                    disabled={props.polygon}
                >
                    Полигон
                </Button>
            </div>
            <div>
                <Button variant={"outlined"}>Предыдущее изображения</Button>
                <Button variant={"outlined"}>Следующее изображения</Button>
                <Button clicked={props.save} variant={"outlined"}>Сохранить</Button>
            </div>
        </div>
    )
};

export default MarkupHeader;