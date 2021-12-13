import React from "react";

import image from '../../assets/image.png';

const Markup = props => {

    return (
        <div>
            <div>
                <h1>Окно разметки</h1>
                <button>Предыдущее изображения</button>
                <button>Следующее изображения</button>
                <button>Сохранить</button>
            </div>

            <img src={image} alt=""/>
        </div>
    )
};

export default Markup;