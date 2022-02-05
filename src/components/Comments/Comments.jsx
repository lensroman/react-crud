import React, {Fragment, useEffect, useRef, useState} from 'react';

import {
    Box, Button,
    CircularProgress,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    TextField
} from '@mui/material';
import { Send } from "@mui/icons-material";

import * as actions from '../../Store/actions/rootAction';
import { connect } from "react-redux";

const Comments = props => {

    const [comment, setComment] = useState('')

    const { onFetchComments, comments } = props

    const scrollRef = useRef(null)

    useEffect(() => {
        onFetchComments()
    }, [onFetchComments])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView()
        }
    }, [comments])

    const addCommentHandler = (taskId, userId) => {
        setComment('')
        props.onAddComment(comment, taskId, userId)
    }

    const commentChangeHandler = (event) => {
        let newComment = event.target.value
        setComment(newComment)
    }

    const deleteCommentHandler = (id) => {
        props.onDeleteComment(id)
    }

    let commentsList = null

    if (props.loading) {
        commentsList = (
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                <CircularProgress/>
            </Box>
        )
    }

    if (props.comments.length > 0) {

        const taskComments = props.comments.filter(comment => comment.task === props.taskId)

        commentsList = taskComments.map(comment => {

            let deleteButton = null

            let textAlign = 'right'

            let author = 'Администратор'

            if (props.marker) {
                author = props.marker
            }

            if (props.userId === comment.commentator) {
                author = 'Вы'
                textAlign = 'left'
                deleteButton = (
                    // <IconButton color={'error'} edge={'start'} sx={{ ml: 3 }} size={'small'}>
                    //     <Close onClick={() => deleteCommentHandler(comment.id)}/>
                    // </IconButton>
                    <Button size={'xs'} color={'error'} variant={'outlined'}>Удалить</Button>
                )
            }

            return (
                <Fragment>
                    <ListItem sx={{ p: 1, textAlign: textAlign }}>
                        <ListItemText
                            sx={{overflowWrap: 'break-word'}}
                            primary={author}
                            secondary={comment.content}
                        />
                        {deleteButton}
                    </ListItem>
                    <Divider variant="inset" component="li" sx={{ml: 0}}/><ListItem sx={{pl: 0}}/>
                </Fragment>
            )
        })
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #616161', borderRadius: 1}}>
            <List align sx={{
                width: '100%',
                maxWidth: 500,
                bgcolor: 'background.paper',
                maxHeight: '400px',
                minHeight: '400px',
                overflowY: 'auto',
            }}>
                {commentsList}
                <li ref={scrollRef} />
            </List>
            <TextField
                sx={{ width: '95%', m: '0 auto 5px auto' }}
                value={comment}
                autoComplete={'off'}
                variant={'standard'}
                fullWidth
                placeholder={'Новый комментарий'}
                onChange={(event) => commentChangeHandler(event)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" color="primary" onClick={() => addCommentHandler(props.taskId, props.userId)}>
                                <Send/>
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.comments.loading,
        comments: state.comments.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchComments: () => dispatch(actions.fetchComments()),
        onAddComment: (comment, taskId, userId) => dispatch(actions.addComment(comment, taskId, userId)),
        onDeleteComment: (id) => dispatch(actions.deleteComment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);