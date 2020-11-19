import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'

export default function Signup(props) {
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
      const [errorState, setErrorState] = useState({
        usernameError: "",
        emailError: "",
        passwordError: ""
      })
  
      useEffect(fetchUserData, [])

      function fetchUserData() {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        API.getUser(id).then(profileData => {
          if (profileData) {
            setProfileState({
              username: profileData.data.username,
              email: profileData.data.email,
              myPlants: profileData.data.myPlants,
              myGarden: profileData.data.myGarden,
              token: token,
              isLoggedIn: true
            })
            localStorage.setItem("isLoggedIn", true)
          } else {
            console.log("someting happened")
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
        setErrorState({
          usernameError: "",
          emailError: "",
          passwordError: ""
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
        if (!signupFormState.username) {
          setErrorState({usernameError: "Please enter a username for your account."})
        } else if (!signupFormState.email) {
          setErrorState({emailError: "Please enter an e-mail address for your account."})
        } else if (!signupFormState.password) {
          setErrorState({passwordError: "Please enter a password for your account."})
        } else {
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
                  localStorage.setItem("isLoggedIn", true)
                  props.setLoginState(true)
                  handleClose();
            })
            

        })
        .catch(err => {
          console.log(err)
          setErrorState({passwordError: "A user with this username or e-mail already exists."})
        })}
      }

    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ background: '#894f62', color: "#FFFFFF"}}>
            Sign Up
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth="true">
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
                <Typography variant="caption">
                {errorState.usernameError}
          </Typography>
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
                <Typography variant="caption">
                {errorState.emailError}
                </Typography>
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
              <Typography variant="caption">
                {errorState.passwordError}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={formSubmit} disabled={!signupFormState.email || !signupFormState.password || !signupFormState.username} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
}