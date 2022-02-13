import React, {useEffect, useState} from 'react';

import {Box, Alert, Collapse} from "@mui/material";

const CustomAlert = (props) => {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 3000)
    }, [])


    let alerts = []

    if (props.errors) {
        for (let key in props.errors) {
            if (key === 'message') {
                alerts.push(<Alert severity={'info'} sx={{mb: 2}} key={key}>{key + ': ' + props.errors[key]}</Alert>)
            } else {
                alerts.push(<Alert severity={'error'} sx={{mb: 2}} key={key}>{key + ': ' + props.errors[key]}</Alert>)
            }
        }
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 80,
                right: 50,
                width: 250
            }}
        >
            <Collapse in={open}>
                {alerts}
            </Collapse>
        </Box>
    );
};

export default CustomAlert;