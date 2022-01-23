import React from "react";

import {theme} from "../../UI/Theme/Theme";
import {Box, Card, CardActions, CardContent, ThemeProvider, Typography, Button} from "@mui/material";

const DatasetCard = props => {

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    minWidth: 345,
                    maxWidth: 345,
                    m: 3,
                    bgcolor: 'rgba(241,241,241,0.95)',
                }}
                variant={"outlined"}
            >
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
                        {props.name}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography>
                            Данная выборка представляет из себя ZIP архив
                            который состоит из папок TV, JSON и LABEL
                        </Typography>
                    </Box>
                    <CardActions>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            width={"100%"}
                        >
                            <Button
                                color={"secondary"}
                                size={"small"}
                                variant={"outlined"}
                                onClick={props.openDataset}
                            >
                                Подробнее
                            </Button>
                            <Button
                                color={"error"}
                                size={"small"}
                                variant={"outlined"}
                                onClick={props.delete}
                            >
                                Удалить
                            </Button>
                        </Box>
                    </CardActions>
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}

export default DatasetCard