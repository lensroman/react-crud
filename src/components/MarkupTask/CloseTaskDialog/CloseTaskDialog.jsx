import React, {useRef} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import { Download } from '@mui/icons-material';

const CloseTaskDialog = props => {

    const downloadButton = useRef(null)

    const downloadMarkupHandler = () => {
        downloadButton.current.click()
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.close}>
                <DialogTitle>Закрытие задачи</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Необходимо оставить комментарий, чтобы закрыть задачу
                    </DialogContentText>
                    <input
                        type="file"
                        ref={downloadButton}
                        onInput={(event) => props.markupAddFile(event)}
                        style={{display: 'none'}}/>
                    <Button
                        sx={{mt: 2}}
                        variant={'outlined'}
                        fullWidth
                        startIcon={<Download/>}
                        onClick={downloadMarkupHandler}
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
                        value={props.comment}
                        onChange={(event) => props.changeComment(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeDialog}>Отмена</Button>
                    <Button onClick={props.closeTask}>Подтвердить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CloseTaskDialog;