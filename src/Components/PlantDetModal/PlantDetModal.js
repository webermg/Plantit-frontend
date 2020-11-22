import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'


export default function PlantDetModal(props) {
    return (
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Plant Not Yet Reviewed"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This plant is new to Plantit! Please take a moment to review the information compiled.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
}
