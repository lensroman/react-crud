import React from "react";

import { Stage, Layer, Image, Line } from "react-konva";

const Canvas = props => {
    let stageWidth = 0;
    let stageHeight = 0;

    if (props.image) {
        stageWidth = props.image.width;
        stageHeight = props.image.height;
    }

    let pointsMarkup = null;

    if (props.pointsMarkup && props.pointsMarkup.length >= 4) {
        pointsMarkup = (
            <Line
                points={ props.pointsMarkup }
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
                style={{ border: '2px solid grey' }}
            >
                <Layer>
                    <Image
                        image={ props.image }
                        onMouseDown={ props.mouseDown }
                        onMouseMove={ props.startDraw ? props.mouseMove : null}
                        onMouseUp={ props.mouseUp }
                    />
                    { pointsMarkup }
                </Layer>
            </Stage>
        </div>
    );
};

export default Canvas;