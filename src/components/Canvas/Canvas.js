import React from "react";

import {Stage, Layer, Image, Line} from "react-konva";

const Canvas = props => {
    let stageWidth = 0;
    let stageHeight = 0;

    if (props.image) {
        stageWidth = props.image.width;
        stageHeight = props.image.height;
    }

    let linesMarkup = null;

    if (props.linesMarkup && props.linesMarkup.length >= 4) {
        linesMarkup = (
            <Line
                points={props.linesMarkup}
                stroke='yellow'
                closed={true}
            />
        );
    }

    return (
        <div>
            <Stage
                width={ stageWidth }
                height={ stageHeight }
                style={{ border: '2px solid grey'}}
            >
                <Layer>
                    <Image
                        image={props.image}
                        onClick={props.click}
                    />
                    {linesMarkup}
                </Layer>
            </Stage>
        </div>
    );
};

export default Canvas;