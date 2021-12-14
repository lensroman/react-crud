import React, {useState} from "react";

import image from '../../assets/image.png';
import MarkupHeader from "../../components/markupHeader/MarkupHeader";
import Canvas from "../../components/Canvas/Canvas";
import useImage from "use-image";

const Markup = props => {

    const [linesClick, setLinesClick] = useState([]);

    const [imgDOM] = useImage(image);

    const getRelativePointerPosition = (node) => {
        const transform = node.getAbsoluteTransform().copy();

        transform.invert();

        const pos = node.getStage().getPointerPosition();

        return transform.point(pos);
    };

    const canvasClickHandler = (event) => {
        let newLines = [...linesClick];

        const point = getRelativePointerPosition(event.target.getStage());

        newLines.push(point.x, point.y);

        setLinesClick(newLines);
    };


    return (
        <div>
            <MarkupHeader />
            <Canvas
                image={imgDOM}
                click={(event) => canvasClickHandler(event)}
                linesMarkup={linesClick}
            />
        </div>
    )
};

export default Markup;