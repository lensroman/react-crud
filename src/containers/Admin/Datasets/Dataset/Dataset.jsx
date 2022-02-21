import React, { useEffect } from 'react';

import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Dataset.module.scss';

import * as actions from '../../../../Store/actions/rootAction';
import PageHeader from '../../../../components/PageHeader/PageHeader'

function Dataset(props) {
  const params = useParams()

  const id = +params['*'].split('/')[0]

  const navigate = useNavigate()

  const { onGetDatasetInfo } = props

  useEffect(() => {
    onGetDatasetInfo(id)
  }, [onGetDatasetInfo, id])

  const goBackHandler = () => {
    props.onClearCurrentDataset();
    navigate(-1);
  }

  const uploadDatasetHandler = () => {
    const { name } = props.dataset;
    const { length } = props.dataset;
    props.onUploadDataset(id, name, null, length);
  }

  let datasetPage = null

  if (props.loading) {
    datasetPage = (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (props.dataset) {
    datasetPage = (
      <div>
        <PageHeader
          dataset
          goBack={goBackHandler}
          name={props.dataset.name}
        />
        <ul className={classes.datasetPageInfo}>
          <li className={classes.datasetPageInfoItem}>
            <Typography
              variant="h6"
              fontWeight="normal"
            >
              Дата создания:&nbsp;
              { props.dataset.created_at.split('T')[0] }
            </Typography>
          </li>
          <li className={classes.datasetPageInfoItem}>
            <Typography
              variant="h6"
              fontWeight="normal"
            >
              Описание:&nbsp;
              { props.dataset.description }
            </Typography>
          </li>
          <li className={classes.datasetPageInfoItem}>
            <Typography
              variant="h6"
              fontWeight="normal"
            >
              Количество изображений:&nbsp;
              { props.dataset.length }
            </Typography>
          </li>
          <li className={classes.datasetPageInfoItem}>
            <Button
              variant="contained"
              startIcon={<UploadFile />}
              onClick={uploadDatasetHandler}
            >
              Скачать выборку
            </Button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={classes.datasetPage}>
      { datasetPage }
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataset: state.datasets.currentDataset,
  loading: state.datasets.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onGetDatasetInfo: (id) => dispatch(actions.getDatasetInfo(id)),
  onUploadDataset: (id, name, imagesRange, length) => {
    dispatch(actions.uploadDataset(id, name, imagesRange, length))
  },
  onClearCurrentDataset: () => dispatch(actions.clearCurrentDataset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dataset);
