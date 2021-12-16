import React, { useCallback, useEffect, useState } from "react";

import json from '../../assets/json.json';
import MarkupHeader from "../../components/markupHeader/MarkupHeader";
import Canvas from "../../components/Canvas/Canvas";
import useImage from "use-image";

const Markup = props => {

    const [regions, setRegions] = useState([])
    const [points, setPoints] = useState([])
    const [color, setColor] = useState(null)
    const [firstLine, setFirstLine] = useState(true)
    const [startDraw, setStartDraw] = useState(false)
    const [markupMode, setMarkupMode] = useState(false)
    const [polygonMode, setPolygonMode] = useState(false)
    const [rectMode, setRectMode] = useState(false)

    const [imgDOM] = useImage(json.img)

    const newRegion = useCallback((category) => {
        setMarkupMode(false)
        setFirstLine(true)
        let newRegion = [...regions]
        let color = null
        switch (category) {
            case 'building': {
                color = '#b8baba'
                break
            }
            case 'water': {
                color = '#4899d5'
                break
            }
            case 'ground': {
                color = '#996d3f'
                break
            }
            case 'non-category': {
                color = '#c53a3a'
                break
            }
            default: return
        }
        setColor(color)
        newRegion.push({
            id: getUniqueId(),
            category: category,
            color: color,
            segmentation: points
        })
        setRegions(newRegion)
    }, [setMarkupMode, setFirstLine, setRegions, color, points, regions])

    const cancelMarkup = useCallback(() => {
        setMarkupMode(false)
        setStartDraw(false)
        setFirstLine(true)
        setPoints([])
    }, [setMarkupMode, setFirstLine, setPoints])

    const stopMarkup = useCallback((event) => {
        event.preventDefault()
        switch (event.code) {
            case 'Space': {
                newRegion('non-category')
                break
            }
            case 'KeyQ': {
                cancelMarkup()
                break
            }
            case 'Digit1': {
                newRegion('building')
                break
            }
            case 'Digit2': {
                newRegion('water')
                break
            }
            case 'Digit3': {
                newRegion('ground')
                break
            }
            default: return
        }
    }, [newRegion, cancelMarkup])

    const getRandomColor = () => {
        const letters = '0123456789abcdef';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const getUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
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
    }

    const canvasMouseDownHandler = (event) => {
        event.evt.preventDefault()
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
        event.evt.preventDefault()
        if (startDraw && polygonMode) {
            const point = getRelativePointerPosition(event.target.getStage())
            const newPoints = [points[0], points[1], point.x, point.y]
            setPoints(newPoints)
        }
        if (startDraw && rectMode) {
            const point = getRelativePointerPosition(event.target.getStage())
            const newPoints = [points[0], points[1], points[0], point.y, point.x, point.y, point.x, points[1]]
            setPoints(newPoints)
        }
    }

    const canvasMouseUpHandler = event => {
        event.evt.preventDefault()
        if (markupMode && polygonMode) {
            setStartDraw(false)
            let newPoints = [...points]
            const point = getRelativePointerPosition(event.target.getStage())
            newPoints.push(point.x, point.y)
            setPoints(newPoints)
            setFirstLine(false)
        }
        if (markupMode && rectMode) {
            setStartDraw(false)
            const point = getRelativePointerPosition(event.target.getStage())
            const newPoints = [points[0], points[1], points[0], point.y, point.x, point.y, point.x, points[1]]
            setPoints(newPoints)
            setFirstLine(true)
        }
    }

    const saveImageHandler = () => {
        let dict = {}
        dict.img = {}
        dict.img.pathName = json.img
        dict.img.regions = regions
        const dictJSON = JSON.stringify(dict)
        console.log(dictJSON)
    }

    const rectModeHandler = () => {
        setPoints([])
        setRectMode(true)
        setPolygonMode(false)
    }
    const polygonModeHandler = () => {
        setPoints([])
        setRectMode(false)
        setPolygonMode(true)
    }

    return (
        <div>
            <MarkupHeader
                save={ saveImageHandler }
                rectMode={ rectModeHandler }
                polygonMode={ polygonModeHandler }
                rect={ rectMode }
                polygon={ polygonMode }
            />
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
}

export default Markup
