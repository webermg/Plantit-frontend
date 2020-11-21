import React from 'react'
import {ButtonGroup, Button, Grid} from '@material-ui/core'

export default function Toolbar(props) {
  
  return  (<Grid container xs justify='space-between'>
  <Grid item xs>

  {props.selectedId && 
    (<ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
      <Button onClick={() => props.onDelete(props.selectedId)}>Delete</Button>
      <Button onClick={() => props.toFront(props.selectedId)}>Bring to Front</Button>
      <Button onClick={() => props.toBack(props.selectedId)}>Send to Back</Button>
    </ButtonGroup>)}
  </Grid>
  <Grid item xs>
    <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
      <Button>Undo</Button>
      <Button>Redo</Button>
      <Button onClick={props.onPublish}>Publish</Button>
    </ButtonGroup>
  </Grid>

  </Grid>)
  
  
}
