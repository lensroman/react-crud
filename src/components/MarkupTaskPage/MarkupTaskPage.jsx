import React, { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import classes from './MarkupTaskPage.module.scss';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import { ArrowBackIosNewOutlined, Done, Download, UploadFile } from '@mui/icons-material';

import { connect } from 'react-redux';
import * as actions from '../../Store/actions/rootAction';

const MarkupTaskPage = (props) => {

    const [openDialog, setOpenDialog] = useState(false)

    const [isTaskOpened, setIsTaskOpened] = useState(null)

    const [taskCloseComment, setTaskCloseComment] = useState('')
    const [taskCloseFile, setTaskCloseFile] = useState('')

    const navigate = useNavigate()

    const params = useParams()

    const {onGetTaskInfo} = props

    useEffect(() => {
        let id = +params['*'].split('/')[0]
        onGetTaskInfo(id)
    }, [onGetTaskInfo, params, isTaskOpened])

    const downloadButton = useRef(null)

    const goBackHandler = () => {
        props.onClearCurrentTask()
        navigate(-1)
    }

    const uploadDatasetHandler = () => {
        const name = props.datasets.find(dataset => dataset.id === props.task.dataset).name
        const id = props.task.dataset
        const imagesRange = props.task.images_range
        props.onUploadDataset(id, name, imagesRange)
    }

    const openDialogHandler = () => {
        setOpenDialog(true)
    }

    const closeDialogHandler = () => {
        setOpenDialog(false)
    }

    const commentChangeHandler = event => {
        const updatedTaskCloseComment = event.target.value
        setTaskCloseComment(updatedTaskCloseComment)
    }

    const downloadMarkupHandler = () => {
        downloadButton.current.click()
    }

    const markupFileAddHandler = (event) => {
        console.log(event.target.files)
        let updatedTaskCloseFile = event.target.files[0]
        setTaskCloseFile(updatedTaskCloseFile)
    }

    const closeTaskHandler = () => {
        setIsTaskOpened(!props.task.opened)
        const taskCloseData = {
            task: {
                ...props.task,
                comment: taskCloseComment
            },
            file: taskCloseFile
        }
        props.onCompleteTask(taskCloseData)
    }

    let taskPage = (
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
            <CircularProgress/>
        </Box>
    )

    let closeTaskButton = null

    if (props.task && props.task.opened === true) {
        closeTaskButton = (
            <Button
                sx={{mt: 2}}
                variant={'contained'}
                color={'success'}
                startIcon={<Done/>}
                onClick={() => openDialogHandler()}
            >
                Закрыть задачу
            </Button>
        )
    }

    if (props.task) {

        const dataset = props.datasets.find(dataset => dataset.id === props.task.dataset).name

        const status = props.task.opened ? 'Открыта' : 'Выполнена'

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
                                <Typography variant={'h6'} fontWeight={'normal'}>Дата
                                    создания: {props.task.created_at.split('T')[0]}</Typography>
                            </li>
                            <li className={classes.MarkupTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Выборка: {dataset}</Typography>
                            </li>
                            <li className={classes.MarkupTaskPageInfoItem}>
                                <Typography variant={'h6'}
                                            fontWeight={'normal'}>Описание: {props.task.description}</Typography>
                            </li>
                            <li className={classes.MarkupTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Кол-во
                                    изображений: {props.task.images_count}</Typography>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.MarkupTaskPageButtons}>
                        <Button
                            variant={'contained'}
                            startIcon={<UploadFile/>}
                            onClick={uploadDatasetHandler}
                        >
                            Скачать выборку
                        </Button>
                        {closeTaskButton}
                    </div>
                </div>
                <Dialog open={openDialog} onClose={closeDialogHandler}>
                    <DialogTitle>Закрытие задачи</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Необходимо оставить комментарий, чтобы закрыть задачу
                        </DialogContentText>
                        <input
                            type="file"
                            ref={downloadButton}
                            onInput={(event) => markupFileAddHandler(event)}
                            style={{display: 'none'}}/>
                        <Button
                            sx={{mt: 2}}
                            variant={'outlined'}
                            fullWidth
                            startIcon={<Download/>}
                            onClick={(event) => downloadMarkupHandler(event)}
                        >
                            Загрузить разметку
                        </Button>
                        <TextField
                            sx={{ mt: 2 }}
                            autoFocus
                            margin="dense"
                            label="Комментарий"
                            fullWidth
                            autoComplete={'off'}
                            variant="standard"
                            multiline={true}
                            value={taskCloseComment}
                            onChange={(event) => commentChangeHandler(event)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialogHandler}>Отмена</Button>
                        <Button onClick={closeTaskHandler}>Подтвердить</Button>
                    </DialogActions>
                </Dialog>
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
        onCompleteTask: (id, data) => dispatch(actions.completeTask(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkupTaskPage);