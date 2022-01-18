import React from "react";

import {Box, Button, Card, CardActions, CardContent, ThemeProvider, Typography} from "@mui/material";
import {theme} from "../../UI/Theme/Theme";

const Task = props => {

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    minWidth: 345,
                    maxWidth: 345,
                    m: 3,
                    bgcolor: 'rgba(241,241,241,0.95)',
                }}
                variant={"outlined"}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                        variant={"h4"}
                        component={"div"}
                        gutterBottom
                        sx={{
                            display: "flex",
                            height: 100,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {props.title}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant={"h5"} gutterBottom>{props.marker}</Typography>
                        <Typography>{props.description}</Typography>
                    </Box>
                    <CardActions>
                        <Button color={"secondary"} size={"small"} variant={"outlined"}>Подробнее</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}

export default Task;
