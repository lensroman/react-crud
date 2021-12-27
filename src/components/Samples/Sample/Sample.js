import React from "react";

import {theme} from "../../../UI/Theme/Theme";
import {Box, Card, CardActions, CardContent, ThemeProvider, Typography, Button} from "@mui/material";

const Sample = props => {

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
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
                        Выборка 1
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant={"h5"} gutterBottom>Иван Иванов</Typography>
                        <Typography>Данная выборка представляет из себя ZIP архив который состоит из папок TV, JSON и LABEL</Typography>
                    </Box>
                    <CardActions>
                        <Button color={"secondary"} size={"small"} variant={"outlined"}>Подробнее</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}

export default Sample