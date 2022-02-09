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

    let errorAlert = null

    let messageAlert = null

    if (props.error) {
        errorAlert = (
            <Alert severity={'error'} sx={{ mb: 2 }}>{props.error}</Alert>
        )
    }

    if (props.message) {
        messageAlert = (
            <Alert severity={'info'} sx={{ mb: 2 }}>{props.message}</Alert>
        )
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
                {errorAlert}
                {messageAlert}
            </Collapse>
        </Box>
    );
};

export default CustomAlert;