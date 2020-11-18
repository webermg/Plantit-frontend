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

export default function Login(props) {
  const [open, setOpen] = useState(false);
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: ""
  });
  const [profileState, setProfileState] = useState({
    username: "",
    email: "",
    myPlants: [],
    myGarden: "",
    token: "",
    isLoggedIn: false
  })

  useEffect(fetchUserData, [])

  function fetchUserData() {
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token");
    API.getUser(id).then(profileData => {
      if (profileData) {
        setProfileState({
          username: profileData.username,
          email: profileData.email,
          myPlants: profileData.myPlants,
          myGarden: profileData.myGarden,
          token: token,
          isLoggedIn: true
        })
      } else {
        localStorage.removeItem("token");
        setProfileState({
          username: "",
          email: "",
          myPlants: [],
          myGarden: "",
          isLoggedIn: false
        })
      }
    }
    )
  }

  const inputChange = event => {
    event.preventDefault()
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value
    })
  }

  const formSubmit = event => {
    event.preventDefault();
    API.login(loginFormState).then(newToken => {
      localStorage.setItem("token", newToken.data.token)
      localStorage.setItem("id", newToken.data.userInfo.id)
      API.getUser(newToken.data.userInfo.id)
      .then (profileData => {
        console.log(profileData)
        if(profileData) {
          setProfileState({
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
          setProfileState({
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
    })
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
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
            onChange= {inputChange}
            value = {loginFormState.email}
            name = "email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            onChange= {inputChange}
            value = {loginFormState.password}
            name = "password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={formSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}