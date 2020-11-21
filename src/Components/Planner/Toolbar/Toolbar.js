import React from 'react'
import { ButtonGroup, Button, Grid, Paper } from '@material-ui/core'

export default function Toolbar(props) {

  const [enabled, setEnabled] = React.useState(true)

  const disable = (time) => {
    setEnabled(false)
    setTimeout(() => {
      setEnabled(true)
    }, time)
  }

  return (

    // <Paper>
      <Grid container xs justify='space-between'>
        <Grid item>
          {props.selectedId &&
            (<ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
              <Button onClick={() => props.onDelete(props.selectedId)}>Delete</Button>
              <Button onClick={() => props.toFront(props.selectedId)}>Bring to Front</Button>
              <Button onClick={() => props.toBack(props.selectedId)}>Send to Back</Button>
            </ButtonGroup>)}
        </Grid>
        <Grid item>
          <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
            <Button>Undo</Button>
            <Button>Redo</Button>
            <Button
              disabled={!enabled}
              onClick={() => {
                props.onPublish()
                disable(5000)
              }}>Publish</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    // </Paper>
  )
  
}
