import React, {useEffect} from "react";

import { Stage, Layer, Rect, Circle } from 'react-konva';

const Markup = props => {


    return (
        <div>
            <div>
                <h1>Окно разметки</h1>
                <button>Предыдущее изображения</button>
                <button>Следующее изображения</button>
                <button>Сохранить</button>
            </div>

            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Rect width={50} height={50} fill="red" />
                    <Circle x={200} y={200} stroke="black" radius={50} />
                </Layer>
            </Stage>
        </div>
    )
};

export default Markup;