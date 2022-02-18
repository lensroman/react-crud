import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField, Typography,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';

import { connect } from 'react-redux';
import * as actions from '../../Store/actions/rootAction';

function Comments(props) {
  const [comment, setComment] = useState('')

  const { onFetchComments, comments, taskId } = props

  const scrollRef = useRef(null)

  useEffect(() => {
    onFetchComments(taskId)
  }, [onFetchComments, taskId])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView()
    }
  }, [comments])

  const addCommentHandler = () => {
    setComment('')
    props.onAddComment(comment, taskId, props.userId)
  }

  const commentChangeHandler = (event) => {
    const newComment = event.target.value
    setComment(newComment)
  }

  const deleteCommentHandler = (id) => {
    props.onDeleteComment(id, taskId)
  }

  let commentsList = null

  if (props.loading) {
    commentsList = (
      <Box sx={{
        display: 'flex', justifyContent: 'center', mt: 3, minHeight: 400, maxHeight: 400,
      }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (props.comments.length > 0) {
    commentsList = props.comments.map((com) => {
      let author = 'Администратор'

      if (props.userId === com.commentator) {
        author = 'Вы'

        return (
          <Box
            key={com.id}
            sx={{
              p: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ccc',
            }}
          >
            <IconButton
              color="error"
              sx={{ alignSelf: 'center' }}
              onClick={() => deleteCommentHandler(com.id)}
            >
              <Close />
            </IconButton>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h6">{author}</Typography>
              <p style={{ margin: '5px 0 0 0', color: '#706969' }}>{com.content}</p>
            </Box>
          </Box>
        )
      }

      if (props.marker === undefined) {
        return (
          <Box
            sx={{
              p: 1.5,
              display: 'flex',
              borderBottom: '1px solid #ccc',
            }}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6">{author}</Typography>
              <p style={{ margin: '5px 0 0 0', color: '#706969' }}>{com.content}</p>
            </Box>
          </Box>
        )
      }

      author = props.marker

      return (
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #ccc',
          }}
        >
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h6">{author}</Typography>
            <p style={{ margin: '5px 0 0 0', color: '#706969' }}>{com.content}</p>
          </Box>
          <IconButton
            color="error"
            sx={{ alignSelf: 'center' }}
            onClick={() => deleteCommentHandler(com.id)}
          >
            <Close />
          </IconButton>
        </Box>
      )
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #616161',
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          p: 2,
          textAlign: 'center',
          borderBottom: '1px solid #616161',
        }}
      >
        Комментарии к задаче
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          minHeight: 500,
          maxHeight: 500,
          overflowY: 'auto',
        }}
      >
        {commentsList}
        <li ref={scrollRef} style={{ visibility: 'hidden' }} />
      </Box>
      <TextField
        value={comment}
        autoComplete="off"
        variant="outlined"
        fullWidth
        placeholder="Новый комментарий"
        onChange={(event) => commentChangeHandler(event)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                color="primary"
                onClick={() => addCommentHandler()}
              >
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  loading: state.comments.loading,
  comments: state.comments.comments,
})

const mapDispatchToProps = (dispatch) => ({
  onFetchComments: (id) => dispatch(actions.fetchComments(id)),
  onAddComment: (comment, taskId, userId) => dispatch(actions.addComment(comment, taskId, userId)),
  onDeleteComment: (id, taskId) => dispatch(actions.deleteComment(id, taskId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
