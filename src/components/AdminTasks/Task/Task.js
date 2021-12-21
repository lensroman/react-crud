import React from "react";

import classes from "./Task.module.scss";
import Button from "../../UI/Button/Button";

const Task = props => {

    return (
        <div className={classes.Task}>
            <div className={classes.Header}>
                <h1>Задача №1</h1>
            </div>
            <div>
                <h3>Иван Иванов</h3>
                <p>
                    Разметить выборку 1, начиная с изображения 1 и заканчивая изображением 50
                </p>
                <Button>Подробнее</Button>
            </div>
        </div>
    )
}

export default Task;