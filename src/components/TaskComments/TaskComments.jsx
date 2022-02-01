import React, {Fragment} from 'react';
import {
    Box,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    TextField
} from '@mui/material';
import {Send} from "@mui/icons-material";

const TaskComments = props => {

    // let comments = (
    //     <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
    //         <CircularProgress/>
    //     </Box>
    // )

    if (props.comments) {
        comments = props.comments.map(comment => {
            return (
                <Fragment>
                    <ListItem>
                        <ListItemText
                            primary={'commentator'}
                            secondary={'content'}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </Fragment>
            )
        })
    }


    let comments = (
        <Fragment>
            <ListItem sx={{pl: 0}}>
                <ListItemText
                    sx={{overflowWrap: 'break-word'}}
                    primary={'commentator'}
                    secondary={'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent'}
                />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ml: '15px'}}/><ListItem sx={{pl: 0}} />
            <ListItem sx={{pl: 0}}>
                <ListItemText
                    sx={{overflowWrap: 'break-word'}}
                    primary={'commentator'}
                    secondary={'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent'}
                />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ml: '15px'}}/><ListItem sx={{pl: 0}} />
            <ListItem sx={{pl: 0}}>
                <ListItemText
                    sx={{overflowWrap: 'break-word'}}
                    primary={'commentator'}
                    secondary={'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent'}
                />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ml: '15px'}}/><ListItem sx={{pl: 0}} />
            <ListItem sx={{pl: 0}}>
                <ListItemText
                    sx={{overflowWrap: 'break-word'}}
                    primary={'commentator'}
                    secondary={'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent'}
                />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ml: '15px'}}/><ListItem sx={{pl: 0}} />
        </Fragment>
)

return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <List align sx={{
            width: '100%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            maxHeight: '400px',
            minHeight: '400px',
            overflowY: 'auto',
        }}>
            {comments}
        </List>
        <TextField
            autoComplete={'off'}
            variant={'standard'}
            fullWidth
            label={'Новый комментарий'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton edge="end" color="primary">
                            <Send/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </Box>
);
};

export default TaskComments;