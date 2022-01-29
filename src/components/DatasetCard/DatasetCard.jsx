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
                    minHeight: 300,
                    m: 3,
                    bgcolor: 'rgba(241,241,241,0.95)',
                }}
                variant={"outlined"}
            >
                <CardContent
                    sx={{
                        padding: '0 10px',
                        height: '100%',
                        textAlign: "center",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}
                >
                    <Typography
                        variant={"h5"}
                        fontWeight={'bold'}
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
                    <Box sx={{mb: 3}}>
                        <Typography>
                            {props.description}
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