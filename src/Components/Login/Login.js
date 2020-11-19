import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PinDropSharp } from "@material-ui/icons";
import Typography from '@material-ui/core/Typography'

export default function Login(props) {
  const [open, setOpen] = useState(false);
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: ""
  });
  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: ""
  })

  const inputChange = event => {
    event.preventDefault()
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value
    })
    setErrorState({
      emailError: "",
      passwordError: ""
    })
  }

  const formSubmit = event => {
    event.preventDefault();
    if (!loginFormState.email) {
      setErrorState({emailError: "Please enter an e-mail address."})
    } else if (!loginFormState.password) {
      setErrorState({passwordError: "Please enter a password."})
    } else {
    API.login(loginFormState).then(userLogin => {
      localStorage.setItem("token", userLogin.data.token)
      localStorage.setItem("id", userLogin.data.userInfo.id)
      API.getUser(userLogin.data.userInfo.id)
      .then (profileData => {
        console.log(profileData)
        if(profileData) {
          props.setProfileState({
            username: profileData.data.username,
            email: profileData.data.email,
            myPlants: profileData.data.myPlants,
            myGarden: profileData.data.myGarden,
            token: profileData.data.token,
            isLoggedIn: true
          })
          localStorage.setItem("isLoggedIn", true);
          props.setLoginState(true)
          handleClose();
        } else {
          localStorage.removeItem("token");
          props.setProfileState({
            name: "",
            email: "",
            tanks: [],
            token: "",
            id: "",
            isLoggedIn: false
          })
          handleClose();
        }
      })
    }).catch(err => {
      console.log(err.response.status)
      if (err.response.status === 403) {
        setErrorState({passwordError: "Your password was incorrect."})
      } else if (err.response.status === 404) {
        setErrorState({emailError: "We can't find a user with that e-mail address."})
      }
      
    })
  }
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ background: '#894f62', color: "#FFFFFF"}}>
        Log In
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth="true">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Log into your Plant-It Account!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            required
            onChange= {inputChange}
            value = {loginFormState.email}
            name = "email"
            fullWidth
          />
          <Typography variant="caption">
            {errorState.emailError}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            required
            onChange= {inputChange}
            value = {loginFormState.password}
            name = "password"
            fullWidth
          />
          <Typography variant="caption">
            {errorState.passwordError}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={formSubmit} disabled={!loginFormState.email || !loginFormState.password} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}