import React from "react";

import classes from './Sample.module.scss';
import Button from "../../UI/Button/Button";

const Sample = props => {

    return (
        <div className={classes.Sample}>
            <div className={classes.Header}>
                Выборка 1
            </div>
            <div className={classes.Description}>
                <p>
                    Данная выборка представляет из себя ZIP архив который состоит из папок TV, JSON и LABEL
                </p>
                <Button>Подробнее</Button>
            </div>
        </div>
    )
}

export default Sample