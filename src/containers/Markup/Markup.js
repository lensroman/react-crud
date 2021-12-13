import React from "react";

import image from '../../assets/image.jpeg';
// import BaseImage from "../../components/BaseImage/BaseImage";
// import {Stage} from "react-konva";

const Markup = props => {

    return (
        <div>
            <div>
                <h1>Окно разметки</h1>
                <button>Предыдущее изображения</button>
                <button>Следующее изображения</button>
                <button>Сохранить</button>
            </div>
            <img src={image} alt="markup" />
            Canvas
            Table
        </div>
    )
};

export default Markup;