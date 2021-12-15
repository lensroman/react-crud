import React, { useState } from "react";

import image from '../../assets/image.png';
import MarkupHeader from "../../components/markupHeader/MarkupHeader";
import Canvas from "../../components/Canvas/Canvas";
import useImage from "use-image";

const Markup = props => {

    // regions = [
    //     {
    //         id: 123,
    //         categoryId: 'building',
    //         color: 'randomColor',
    //         segmentation: points,
    //     },
    //     {
    //         id: 123,
    //         categoryId: 'building',
    //         color: 'randomColor',
    //         segmentation: points,
    //     }
    // ]

    const [regions, setRegions] =useState([])
    const [points, setPoints] = useState([])
    const [firstLine, setFirstLine] = useState(true)
    const [startDraw, setStartDraw] = useState(false)

    const [imgDOM] = useImage(image)

    const getRelativePointerPosition = (node) => {
        const transform = node.getAbsoluteTransform().copy()
        transform.invert()
        const pos = node.getStage().getPointerPosition()
        return transform.point(pos)
    };

    const canvasMouseDownHandler = (event) => {
        console.log('outside', firstLine)
        if (firstLine) {
            console.log('inside', firstLine)
            let newPoints = []
            const point = getRelativePointerPosition(event.target.getStage())
            newPoints.push(point.x, point.y)
            setPoints(newPoints)
            setStartDraw(true)
        }
    }

    const canvasMouseMoveHandler = (event) => {
        if (startDraw) {
            const point = getRelativePointerPosition(event.target.getStage())
            let newPoints = []
            newPoints = [points[0], points[1], point.x, point.y]
            setPoints(newPoints)
        }
    }

    const canvasMouseUpHandler = event => {
        setStartDraw(false)
        let newPoints = [...points]
        const point = getRelativePointerPosition(event.target.getStage());
        newPoints.push(point.x, point.y)
        setPoints(newPoints)
        setFirstLine(false)
    }

    return (
        <div>
            <MarkupHeader />
            <Canvas
                image={imgDOM}
                mouseDown={(event) => canvasMouseDownHandler(event)}
                mouseMove={(event) => canvasMouseMoveHandler(event)}
                mouseUp={(event) => canvasMouseUpHandler(event)}
                pointsMarkup={points}
                startDraw={startDraw}
            />
        </div>
    )
};

export default Markup;