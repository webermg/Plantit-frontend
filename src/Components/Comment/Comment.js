import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Hidden, TextField } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import API from '../../utils/API';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
    position: "relative",
    backgroundColor: "#b1bb78"
  }
}));


export default function Comment(data) {
  const classes = useStyles();
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(data.comment)

  const handleUpdateChange = (event) => {
    console.log(event.target.value)
    setText(event.target.value)
  }

  const saveEdit = () => {
    API.editComment(data.commentId,text).then(result => {
      console.log(result)
      setEditing(false)
    })
  }

  const deleteComment = () => {
    API.deleteComment(data.commentId).then(result => {
      console.log(result)
      setText("This comment was deleted")
      setEditing(false)
    })
  }
  const EditOptions = () => {
    if (editing) {
      return <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SaveIcon />}
        onClick={saveEdit}
        ><Hidden only="xs">
            Save
            </Hidden>
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<DeleteIcon />}
        onClick={deleteComment}
        ><Hidden only="xs">
            Delete
            </Hidden>
        </Button>
        <h4>From: {data.user}</h4>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          label="edit"
          style={{ margin: 8, background: 'white', width: '30ch' }}
          name="watering_min"
          value={text}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleUpdateChange}
        />
      </div>
    } else if (data.viewerId === data.userId) {
      return <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<EditIcon />}
          onClick={() => setEditing(true)}
        ><Hidden only="xs">
            Edit
          </Hidden>
        </Button>

        <h4>From: {data.user}</h4>
        <p>{text}</p>
      </div>
    }
    else {
      return <div>
      <h4>From: {data.user}</h4>
      <p>{text}</p>
      </div>

    }
  }
  return (

    <EditOptions/>
    // <div>
    //   {data.viewerId === data.userId ? <Button
    //     variant="contained"
    //     color="primary"
    //     className={classes.button}
    //     endIcon={<EditIcon />}
    //   // onClick={props.handleFormSubmit}
    //   ><Hidden only="xs">
    //       Edit
    //             </Hidden>
    //   </Button> : null}

    //   <h4>From: {data.user}</h4>
    //   <p>{data.comment}</p>
    // </div>

  )
}