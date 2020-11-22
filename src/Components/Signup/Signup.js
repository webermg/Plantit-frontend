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
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton'

export default function Signup(props) {
    const [open, setOpen] = useState(false);
    const [signupFormState, setSignupFormState] = useState({
        username: "",
        email: "",
        password: ""
      });
      const [errorState, setErrorState] = useState({
        usernameError: "",
        emailError: "",
        passwordError: ""
      })

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
        setOpen(false);
      };

    const tabDown = (e) => {
      if (e.keyCode === 9) {
        document.getElementById("email").focus()
      }
    }

    const tabDown2 = (e) => {
      if (e.keyCode === 9) {
        document.getElementById("password").focus()
      }
    }

    const tabDown3 = (e) => {
      if (e.keyCode === 9) {
        document.getElementById("submitbtn").focus()
      }
    }

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
                props.setProfileState({
                    username: profileData.data.username,
                    email: profileData.data.email,
                    myPlants: profileData.data.myPlants,
                    myGarden: profileData.data.myGarden,
                    isLoggedIn: true
                  })
                  localStorage.setItem("isLoggedIn", true)
                  props.setLoginState(true)
                  props.handleClose();
            })
            

        })
        .catch(err => {
          if (err.response.status === 422) {
            setErrorState({emailError: "A user with this e-mail already exists."})
          } else if (err.response.status === 403) {
            setErrorState({usernameError: "A user with this username already exists."})
          }
        })}
      }
    
    return (
        <div>
          <MenuItem onClick={handleClickOpen}>
            <Typography variant="button" display="block" gutterBottom>
            Sign Up
            </Typography>
       </MenuItem>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth="true">
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <form onSubmit={formSubmit}>
            <DialogContent>
              <DialogContentText>
                Sign up for a Plant-It account!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Username"
                type="text"
                required
                onChange= {inputChange}
                onKeyDown= {tabDown}
                value = {signupFormState.username}
                name = "username"
                id= "username"
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
                required
                onChange= {inputChange}
                onKeyDown={tabDown2}
                value = {signupFormState.email}
                name = "email"
                id = "email"
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
                onKeyDown={tabDown3}
                value = {signupFormState.password}
                name = "password"
                id = "password"
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
              <Button type="submit" id="submitbtn" disabled={!signupFormState.email || !signupFormState.password || !signupFormState.username} color="primary">
                Submit
              </Button>
            </DialogActions>
            </form>
          </Dialog>
        </div>
      )
}