import React from 'react';
import {Pagination} from "@mui/material";

const PageCounter = props => {
    return (
        <div>
            <Pagination color={'primary'} count={props.count} onChange={props.change} />
        </div>
    );
};

export default PageCounter;