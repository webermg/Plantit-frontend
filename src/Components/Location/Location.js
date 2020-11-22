import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from '../../utils/API';

export default function Location(props) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [reset, setReset] = useState(true);

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
    setLocation({value})
 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose()
    API.updateUserLocation(props.id, location)
    .then(result => {
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
        Edit Region
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add or update your location here:
          </DialogContentText>
          <TextField
            name= "location"
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            onChange = {handleUpdate}
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

