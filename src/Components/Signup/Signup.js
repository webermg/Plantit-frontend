import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Signup() {
    const [open, setOpen] = useState(false);
    const [signupFormState, setSignupFormState] = useState({
        username: "",
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
        const id = localStorage.getItem("id");
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
            console.log("somehting happened")
            }
          }
        )
      }

    const inputChange = event => {
        event.preventDefault()
        const { name, value } = event.target;
        setSignupFormState({
          ...signupFormState,
          [name]: value
        })
      }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        console.log(profileState)
        setOpen(false);
      };

    const formSubmit = event => {
        event.preventDefault();
        API.signup(signupFormState).then(newUser => {
            localStorage.setItem("token", newUser.data.token)
            localStorage.setItem("id", newUser.data.userInfo.id)
            API.getUser(newUser.data.userInfo.id)
                .then (profileData => {
                console.log(profileData)
                setProfileState({
                    username: profileData.data.username,
                    email: profileData.data.email,
                    myPlants: profileData.data.myPlants,
                    myGarden: profileData.data.myGarden,
                    isLoggedIn: true
                  })
                  handleClose();
            })
        })}

    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ background: '#894f62', color: "#FFFFFF"}}>
            Sign Up
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Sign up for a Plant-It account!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Username"
                type="text"
                onChange= {inputChange}
                value = {signupFormState.username}
                name = "username"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                onChange= {inputChange}
                value = {signupFormState.email}
                name = "email"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                label="Password"
                type="password"
                onChange= {inputChange}
                value = {signupFormState.password}
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
      )
}