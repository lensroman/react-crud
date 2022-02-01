import React from 'react';

import { Box,
    Button,
    Card,
    CardActions,
    CardContent,
    ThemeProvider,
    Typography
} from '@mui/material';
import { theme } from '../../UI/Theme/Theme';

const MarkupTaskCard = (props) => {

    return (
        <ThemeProvider theme={ theme }>
            <Card
                sx={{
                    minWidth: 345,
                    maxWidth: 345,
                    minHeight: 300,
                    m: 3,
                    bgcolor: 'rgba(241,241,241,0.95)',
                }}
                variant={ "outlined" }>
                <CardContent sx={{
                    height: '100%',
                    textAlign: "center",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <Typography
                        variant={ "h5" }
                        fontWeight={ 'bold' }
                        gutterBottom
                        sx={{
                            overflowWrap: 'break-word',
                        }}
                    >
                        { props.title }
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' ,justifyContent: 'space-around' }}>
                        <Box sx={{ mb: 3, overflowWrap: 'break-word' }}>
                            <Typography variant={ "h6" } gutterBottom>
                                Выборка: { props.dataset }
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 3, overflowWrap: 'break-word' }}>
                            <Typography variant={ "h6" } gutterBottom>
                                Кол-во изображений: { props.count }
                            </Typography>
                        </Box>
                    </Box>
                    <CardActions>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            padding: '10px'
                        }}>
                            <Button
                                color={ "secondary" }
                                size={ "small" }
                                variant={ "outlined" }
                                onClick={ props.openTask }
                            >
                                Подробнее
                            </Button>
                        </Box>
                    </CardActions>
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}

export default MarkupTaskCard;
