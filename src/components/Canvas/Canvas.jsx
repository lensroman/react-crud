import React from 'react';

import { Stage, Layer, Image, Line } from 'react-konva';
import MarkupHeader from '../MarkupHeader/MarkupHeader';

const Canvas = props => {
    let stageWidth = 0;
    let stageHeight = 0;

    if (props.image) {
        stageWidth = props.image.width;
        stageHeight = props.image.height;
    }

    let pointsMarkup = null
    let regions = null

    if (props.pointsMarkup && props.pointsMarkup.length >= 4) {
        pointsMarkup = (
            <Line
                points={ props.pointsMarkup }
                stroke={ props.color }
                fill={ props.color }
                closed={ true }
                opacity={ 0.5 }
                listening={ false }
            />
        )
    }

    if (props.regions.length > 0) {
        regions = props.regions.map(region => {
            return (
                <Line
                    key={ region.id }
                    points={ region.segmentation }
                    stroke={ region.color }
                    fill={ region.color }
                    closed={ true }
                    opacity={ 0.5 }
                />
            )
        })
    }

    return (
        <div>
            <div>
                <MarkupHeader
                    save={ props.save }
                    rectMode={ props.rectMode }
                    polygonMode={ props.polygonMode }
                    rect={ props.rect }
                    polygon={ props.polygon }
                />
            </div>
            <Stage
                width={ stageWidth }
                height={ stageHeight }
                style={{ border: '1px solid grey', padding: '10px' }}
            >
                <Layer>
                    <Image
                        image={ props.image }
                        onMouseDown={ props.mouseDown }
                        onMouseMove={ props.startDraw ? props.mouseMove : null}
                        onMouseUp={ props.mouseUp }
                    />
                    { regions ? regions.map(region => {return region}) : null }
                    { pointsMarkup }
                </Layer>
            </Stage>
        </div>
    );
};

export default Canvas;