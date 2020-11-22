import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from '../../utils/API';

export default function Skills(props) {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState("");
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
    setSkills({value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.updateUserSkills(props.id, skills)
    .then(result => {
      console.log("") 
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
        Edit Skills
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Skills</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add or edit your Gardening Skills here:
          </DialogContentText>
          <TextField
            name="skills"
            autoFocus
            margin="dense"
            id="skills"
            label="Skills"
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

