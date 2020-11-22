import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Hidden, TextField, Typography } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import API from '../../utils/API';
import DeleteIcon from '@material-ui/icons/Delete';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { fade } from '@material-ui/core/styles/colorManipulator'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#806673',
      main: '#614051',
      dark: '#432c38',
      contrastText: '#fff',
    },
    secondary: {
      light: '#c88f76',
      main: '#bb7354',
      dark: '#82503a',
      contrastText: '#fff',
    },
  }
})

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
    position: "relative",
  }
}));


export default function Comment(data) {
  console.log("rerendered")
  const classes = useStyles();
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(data.comment)

  const handleUpdateChange = (event) => {
    console.log(event.target.value)
    setText(event.target.value)
  }

  // Save Comment that has been edited
  const saveEdit = () => {
    API.editComment(data.commentId, text).then(result => {
      console.log(result)
      setEditing(false)
    })
  }

  // Delete Comment that has be selected to be edited
  const deleteComment = () => {
    API.deleteComment(data.commentId).then(result => {
      console.log(result)
      setText("This comment was deleted")
      setEditing(false)
    })
  }
  // If editing then render the save and delete buttons
  if (editing) {
    return <div>
    <MuiThemeProvider theme={theme}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<SaveIcon />}
        onClick={saveEdit}
      ><Hidden only="xs">
          Save
            </Hidden>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<DeleteIcon />}
        onClick={deleteComment}
      ><Hidden only="xs">
          Delete
            </Hidden>
        </Button>
        From: {data.user}
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
        </MuiThemeProvider>
      </div>
    } 
    // If you are the user with the comment then the edit button is rendered
    else if (data.viewerId === data.userId) {
      return <div>
    <MuiThemeProvider theme={theme}>
      <Card variant='outlined' style={{backgroundColor: fade('#fff', 0.7), padding: '10px', marginBottom: '5px'}}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<EditIcon />}
          onClick={() => setEditing(true)}
        ><Hidden only="xs">
            Edit
          </Hidden>
      </Button>

      <Typography variant="h5" gutterBottom component="span">
        From: {data.user}
      </Typography>
      <Typography variant="h6" gutterBottom component="p">
        {text}
      </Typography>

      </Card>

      </MuiThemeProvider>
    </div>
  }
  // Otherwise show the comment and author
  else {
    return <div>
       <Card variant= 'outlined' style={{backgroundColor: fade('#fff', 0.7), padding: '10px', marginBottom: '5px'}}>
      <Typography variant="h5" gutterBottom component="span">
        From: {data.user}
      </Typography>
      <Typography variant="h6" gutterBottom component="p">
        {text}
      </Typography>
      </Card>
    </div>

  }


  // return (
  // <EditOptions />

  //   // <div>
  //   //   {data.viewerId === data.userId ? <Button
  //   //     variant="contained"
  //   //     color="primary"
  //   //     className={classes.button}
  //   //     endIcon={<EditIcon />}
  //   //   // onClick={props.handleFormSubmit}
  //   //   ><Hidden only="xs">
  //   //       Edit
  //   //             </Hidden>
  //   //   </Button> : null}

  //   //  From: {data.user}
  //   //   <p>{data.comment}</p>
  //   // </div>

  // )
}