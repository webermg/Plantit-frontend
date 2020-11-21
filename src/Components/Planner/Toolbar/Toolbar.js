import React from 'react'
import {ButtonGroup, Button, Grid} from '@material-ui/core'

export default function Toolbar(props) {
  
  return  (<Grid container xs justify='space-between'>
  <Grid item xs>

  {props.selectedId && 
    (<ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
      <Button>Delete</Button>
      <Button>Bring to Front</Button>
      <Button>Send to Back</Button>
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
