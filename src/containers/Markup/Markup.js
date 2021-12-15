import React, {useCallback, useEffect, useState} from "react";

import image from '../../assets/image.png';
import MarkupHeader from "../../components/markupHeader/MarkupHeader";
import Canvas from "../../components/Canvas/Canvas";
import useImage from "use-image";

const Markup = props => {

    const [regions, setRegions] = useState([])
    const [points, setPoints] = useState([])
    const [firstLine, setFirstLine] = useState(true)
    const [startDraw, setStartDraw] = useState(false)
    const [markupMode, setMarkupMode] = useState(false)
    const [color, setColor] = useState(null)

    const [imgDOM] = useImage(image)

    const stopMarkup = useCallback((event) => {
        event.preventDefault()
        if (event.code === 'Space') {
            setMarkupMode(false)
            setFirstLine(true)
            newRegion()
        }
    }, [setMarkupMode, points, color])

    const getRandomColor = () => {
        const letters = '0123456789abcdef';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const newRegion = () => {
        let newRegion = [...regions]
        newRegion.push({
            id: color,
            category: 'building',
            color: color,
            segmentation: points
        })
        setRegions(newRegion)
    }

    useEffect(() => {
        if (markupMode) {
            window.addEventListener('keypress', stopMarkup)
        } else {
            window.removeEventListener('keypress', stopMarkup)
        }

        return () => window.removeEventListener('keypress', stopMarkup)
    }, [markupMode, stopMarkup])

    const getRelativePointerPosition = (node) => {
        const transform = node.getAbsoluteTransform().copy()
        transform.invert()
        const pos = node.getStage().getPointerPosition()
        return transform.point(pos)
    };

    const canvasMouseDownHandler = (event) => {
        if (firstLine) {
            const color = getRandomColor()
            let newPoints = []
            const point = getRelativePointerPosition(event.target.getStage())
            newPoints.push(point.x, point.y)
            setPoints(newPoints)
            setColor(color)
            setStartDraw(true)
            setMarkupMode(true)
        }
    }

    const canvasMouseMoveHandler = (event) => {
        if (startDraw) {
            const point = getRelativePointerPosition(event.target.getStage())
            const newPoints = [points[0], points[1], point.x, point.y]
            setPoints(newPoints)
        }
    }

    const canvasMouseUpHandler = event => {
        if (markupMode) {
            setStartDraw(false)
            let newPoints = [...points]
            const point = getRelativePointerPosition(event.target.getStage())
            newPoints.push(point.x, point.y)
            setPoints(newPoints)
            setFirstLine(false)
        }
    }

    return (
        <div>
            <MarkupHeader />
            <Canvas
                image={ imgDOM }
                mouseDown={ (event) => canvasMouseDownHandler(event) }
                mouseMove={ (event) => canvasMouseMoveHandler(event) }
                mouseUp={ (event) => canvasMouseUpHandler(event) }
                pointsMarkup={ points }
                color={ color }
                startDraw={ startDraw }
                regions={ regions }
            />
        </div>
    )
};

export default Markup;