import React from 'react';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  ThemeProvider,
  Typography,
  Button, CircularProgress,
} from '@mui/material';
import theme from '../../UI/Theme/Theme';
import CircularProgressWithLabel from '../../UI/CircularProgressWithLabel/CircularProgressWithLabel';

function DatasetCard(props) {
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          minWidth: 345,
          maxWidth: 345,
          minHeight: 350,
          m: 3,
          bgcolor: 'rgba(241,241,241,0.95)',
          position: 'relative',
        }}
        variant="outlined"
      >
        <CardContent
          sx={{
            padding: '10px',
            height: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ position: 'absolute', top: '3%', right: '3%' }}>
            <CircularProgress
              variant="determinate"
              value={100}
              sx={{
                position: 'absolute',
                left: 0,
                color: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800],
              }}
            />
            <CircularProgressWithLabel value={props.percent} color="secondary" />
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                overflowWrap: 'break-word',
                maxWidth: '75%',
                m: '2px auto 0 auto',
              }}
            >
              { props.name }
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography>
              {props.description}
            </Typography>
          </Box>
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{ mb: '24px' }}
            >
              <Button
                color="secondary"
                size="small"
                variant="outlined"
                onClick={props.openDataset}
              >
                Подробнее
              </Button>
              <Button
                color="error"
                size="small"
                variant="outlined"
                onClick={props.delete}
              >
                Удалить
              </Button>
            </Box>
          </CardActions>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default DatasetCard;
