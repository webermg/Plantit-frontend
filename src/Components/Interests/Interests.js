import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from '../../utils/API';

export default function Interests(props) {
  const [open, setOpen] = useState(false);
  const [interests, setInterests] = useState("");
  const [reset, setReset] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function refreshPage() {
    window.location.reload(false);
  }
  
  const handleClose = () => {
    setOpen(false);
    refreshPage();
  };

  const handleUpdate = (event) => {
    let {value} = event.target
    setInterests({value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose()
    console.log(props.id)
    API.updateUserInterests(props.id, interests)
    .then(result => {
      console.log("interests:", interests.value) 
    })
    handleClose();
  };

  return (
    <div>
      <Button size="small"
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#b1bb78" }} 
                    onClick={handleClickOpen}>
        Edit Interests
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Interests</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add or update your Gardening Interests here:
          </DialogContentText>
          <TextField
            name="interests"
            autoFocus
            margin="dense"
            id="interests"
            label="Interests"
            type="text"
            fullWidth
            onChange={handleUpdate}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

