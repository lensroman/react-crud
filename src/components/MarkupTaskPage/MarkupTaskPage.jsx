import React, {useEffect, useRef, useState} from 'react';

import {useNavigate, useParams} from "react-router-dom";

import classes from './MarkupTaskPage.module.scss';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {ArrowBackIosNewOutlined, Done, Download, UploadFile} from "@mui/icons-material";

import {connect} from "react-redux";
import * as actions from "../../Store/actions/rootAction";

const MarkupTaskPage = (props) => {

    // const [openDialog, setOpenDialog] = useState(false)
    // const [comment, setComment] = useState('')

    const [isOpened, setIsOpened] = useState(true)

    const navigate = useNavigate()

    const params = useParams()

    const {onGetTaskInfo} = props

    useEffect(() => {
        let id = +params['*'].split('/')[0]
        onGetTaskInfo(id)
    }, [onGetTaskInfo, params, isOpened])

    const downloadButton = useRef(null)

    const goBackHandler = () => {
        props.onClearCurrentTask()
        navigate(-1)
    }

    const uploadDatasetHandler = () => {
        const name = props.datasets.find(dataset => dataset.id === props.task.dataset).name
        const id = props.task.dataset
        const imagesRange = props.task.images_range
        console.log(imagesRange)
        props.onUploadDataset(id, name, imagesRange)
    }

    // const openDialogHandler = () => {
    //     setOpenDialog(true)
    // }
    //
    // const closeDialogHandler = () => {
    //     setOpenDialog(false)
    // }

    // const commentChangeHandler = event => {
    //     const newComment = event.target.value
    //     setComment(newComment)
    // }

    const closeTaskHandler = (id) => {
        setIsOpened(false)
        props.onCompleteTask(id)
    }

    const downloadDatasetHandler = () => {
        downloadButton.current.click()
    }

    let taskPage = (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
        </Box>
    )

    let closeTaskButton = null

    if (props.task && isOpened === true) {
        closeTaskButton = (
            <Button
                sx={{ mt: 2 }}
                variant={'contained'}
                color={'success'}
                startIcon={<Done />}
                onClick={() => closeTaskHandler(props.task.id)}
            >
                Закрыть задачу
            </Button>
        )
    }

    if (props.task) {

        const dataset = props.datasets.find(dataset => dataset.id === props.task.dataset).name

        const status = isOpened ? 'Открыта' : 'Выполнена'

        taskPage = (
            <div>
                <div className={classes.MarkupTaskPageHeader}>
                    <div>
                        <Typography variant={"h4"} fontWeight={"bold"}>Задача: {props.task.title}</Typography>
                    </div>
                    <div>
                        <Typography variant={"h5"} fontWeight={"bold"}>Статус: {status}</Typography>
                    </div>
                    <div>
                        <Button
                            variant={"outlined"}
                            startIcon={<ArrowBackIosNewOutlined/>}
                            onClick={goBackHandler}
                        >
                            Назад
                        </Button>
                    </div>
                </div>
                <div className={classes.MarkupTaskPageContent}>
                    <div>
                        <ul className={classes.MarkupTaskPageInfo}>
                            <li className={classes.MarkupTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Дата создания: {props.task.created_at.split('T')[0]}</Typography>
                            </li>
                            <li className={classes.MarkupTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Выборка: {dataset}</Typography>
                            </li>
                            <li className={classes.MarkupTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Описание: {props.task.description}</Typography>
                            </li>
                            <li className={classes.MarkupTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Кол-во изображений: {props.task.images_count}</Typography>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.MarkupTaskPageButtons}>
                        <Button
                            variant={'contained'}
                            startIcon={<UploadFile />}
                            onClick={uploadDatasetHandler}
                        >
                            Скачать выборку
                        </Button>
                        <input type="file" ref={downloadButton} style={{ display: 'none' }} />
                        <Button
                            sx={{ mt: 2 }}
                            variant={'contained'}
                            startIcon={<Download />}
                            onClick={(event) => downloadDatasetHandler(event)}
                        >
                            Загрузить разметку
                        </Button>
                        {closeTaskButton}
                    </div>
                </div>
                {/*<Dialog open={openDialog} onClose={closeDialogHandler}>*/}
                {/*    <DialogTitle>Закрытие задачи</DialogTitle>*/}
                {/*    <DialogContent>*/}
                {/*        <DialogContentText>*/}
                {/*            Необходимо оставить комментарий, чтобы закрыть задачу*/}
                {/*        </DialogContentText>*/}
                {/*        <TextField*/}
                {/*            autoFocus*/}
                {/*            margin="dense"*/}
                {/*            label="Комментарий"*/}
                {/*            fullWidth*/}
                {/*            autoComplete={'off'}*/}
                {/*            variant="standard"*/}
                {/*            multiline={true}*/}
                {/*            value={comment}*/}
                {/*            onChange={(event) => commentChangeHandler(event)}*/}
                {/*        />*/}
                {/*    </DialogContent>*/}
                {/*    <DialogActions>*/}
                {/*        <Button onClick={closeDialogHandler}>Отмена</Button>*/}
                {/*        <Button onClick={() => closeTaskHandler(props.task.id)}>Подтвердить</Button>*/}
                {/*    </DialogActions>*/}
                {/*</Dialog>*/}
            </div>
        )
    }

    return (
        <div className={classes.MarkupTaskPage}>
            {taskPage}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        task: state.tasks.currentTask,
        datasets: state.datasets.datasets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTaskInfo: (id) => dispatch(actions.getTaskInfo(id)),
        onClearCurrentTask: () => dispatch(actions.clearCurrentTask()),
        onUploadDataset: (id, name, imagesRange) => dispatch(actions.uploadDataset(id, name, imagesRange)),
        onCompleteTask: (id) => dispatch(actions.completeTask(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkupTaskPage);