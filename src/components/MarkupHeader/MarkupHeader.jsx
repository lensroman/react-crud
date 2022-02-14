import React from 'react';

import { Button, Typography } from '@mui/material';
import {
  ArrowBack, ArrowForward, ChangeHistory, Crop169, Save,
} from '@mui/icons-material';
import classes from './MarkupHeader.module.scss';

function MarkupHeader(props) {
  return (
    <div className={classes.MarkupHeader}>
      <div>
        <Typography variant="h4" fontWeight="bold">Окно разметки</Typography>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={props.rectMode}
          disabled={props.rect}
          startIcon={<Crop169 />}
        >
          Прямоугольник
        </Button>
        <Button
          variant="contained"
          onClick={props.polygonMode}
          disabled={props.polygon}
          sx={{ ml: 1, mr: 15 }}
          startIcon={<ChangeHistory />}
        >
          Полигон
        </Button>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
        >
          Предыдущее изображения
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 1, mr: 15 }}
          endIcon={<ArrowForward />}
        >
          Следующее изображения
        </Button>
        <Button
          onClick={props.save}
          variant="contained"
          endIcon={<Save />}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default MarkupHeader;
