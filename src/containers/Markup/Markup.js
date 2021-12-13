import React from "react";

import MarkupHeader from "../../components/markupHeader/MarkupHeader";
import Canvas from "../../components/Canvas/Canvas";

const Markup = props => {

    return (
        <div>
            <MarkupHeader />
            <Canvas />
        </div>
    )
};

export default Markup;