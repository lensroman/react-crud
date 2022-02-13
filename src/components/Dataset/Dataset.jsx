import React, { useEffect } from 'react';

import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { ArrowBackIosNewOutlined, UploadFile } from '@mui/icons-material';
import classes from './Dataset.module.scss';

import { connect } from 'react-redux';
import * as actions from '../../Store/actions/rootAction';

import { useNavigate, useParams } from "react-router-dom";

const Dataset = (props) => {

    const params = useParams()

    const id = +params['*'].split('/')[0]

    const navigate = useNavigate()

    const {onGetDatasetInfo} = props

    useEffect(() => {
        onGetDatasetInfo(id)
    }, [onGetDatasetInfo, id])

    const goBackHandler = () => {
        props.onClearCurrentDataset()
        navigate(-1)
    }

    const uploadDatasetHandler = () => {
        let name = props.dataset.name
        let length = props.dataset.length
        props.onUploadDataset(id, name, null, length)
    }

    let datasetPage = (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
        </Box>
    )

    if (props.dataset) {

        datasetPage = (
            <div>
                <div className={classes.datasetPageHeader}>
                    <div>
                        <Typography variant={ "h4" } fontWeight={ "bold" }>
                            Выборка: { props.dataset.name }
                        </Typography>
                    </div>
                    <div>
                        <Button
                            variant={ "outlined" }
                            startIcon={ <ArrowBackIosNewOutlined/> }
                            onClick={ goBackHandler }
                        >
                            Назад
                        </Button>
                    </div>
                </div>
                <ul className={ classes.datasetPageInfo }>
                    <li className={ classes.datasetPageInfoItem }>
                        <Typography
                            variant={ 'h6' }
                            fontWeight={ 'normal' }
                        >
                            Дата создания: { props.dataset.created_at.split('T')[0] }
                        </Typography>
                    </li>
                    <li className={ classes.datasetPageInfoItem }>
                        <Typography
                            variant={ 'h6' }
                            fontWeight={ 'normal' }
                        >
                            Описание: { props.dataset.description }
                        </Typography>
                    </li>
                    <li className={ classes.datasetPageInfoItem }>
                        <Typography
                            variant={ 'h6' }
                            fontWeight={ 'normal' }
                        >
                            Количество изображений: { props.dataset.length }
                        </Typography>
                    </li>
                    <li className={ classes.datasetPageInfoItem }>
                        <Button
                            variant={ 'contained' }
                            startIcon={ <UploadFile /> }
                            onClick={ uploadDatasetHandler }
                        >
                            Скачать выборку
                        </Button>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className={ classes.datasetPage }>
            { datasetPage }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        dataset: state.datasets.currentDataset
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetDatasetInfo: (id) => dispatch(actions.getDatasetInfo(id)),
        onUploadDataset: (id, name, imagesRange, length) => dispatch(actions.uploadDataset(id, name, imagesRange, length)),
        onClearCurrentDataset: () => dispatch(actions.clearCurrentDataset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dataset);