import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import FilterVintage from "@material-ui/icons/FilterVintage"
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link as RouterLink, useLocation, useHistory } from "react-router-dom";
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup';
import API from '../../utils/API';
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  inputRoot: {

    color: 'inherit',

  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavBar() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [LoginState, setLoginState] = useState()
  const [userState, setUserState] = useState({
    username: "",
    email: "",
    myPlants: [],
    myGarden: "",
    token: "",
    isLoggedIn: false
  })

  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))

  useEffect(() => {
    fetchUserData();
    setLoginState(isLoggedIn)
  }, [isLoggedIn])

  function fetchUserData() {
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token");
    if (id != null) {
      API.getUser(id).then(profileData => {
        if (profileData) {
          setUserState({
            username: profileData.data.username,
            email: profileData.data.email,
            myPlants: profileData.data.myPlants,
            myGarden: profileData.data.myGarden,
            id: profileData.data.id,
            token: token,
            isLoggedIn: true
          })
        } else {
          localStorage.removeItem("token");
          setUserState({
            username: "",
            email: "",
            myPlants: [],
            myGarden: "",
            isLoggedIn: false
          })
        }
      })
  }}


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isVisited")
    localStorage.setItem("isLoggedIn", false)
    handleMenuClose()
    history.push("/")

  }

  const menuId = "primary-search-account-menu";

  const renderUserMenu = function()  {
    if (isLoggedIn) {
      return(
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={RouterLink} to={"/profile"}>My Profile</MenuItem> 
       <MenuItem onClick={Logout}>Log Out</MenuItem> 
      </Menu>

      )

    }
  }


  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = function() {
    if (isLoggedIn) {
      return (
        <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={RouterLink} to={"/"}>
        <Typography variant="button" display="block" gutterBottom>
            Home
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/myplant"}>
        <Typography variant="button" display="block" gutterBottom>
          My Plants
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/mygarden"}>
        <Typography variant="button" display="block" gutterBottom>
          My Garden
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/gallery"}>
        <Typography variant="button" display="block" gutterBottom>
            Gallery
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/profile"}>
      <Typography variant="button" display="block" gutterBottom>
          My Profile
      </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/about"}>
        <Typography variant="button" display="block" gutterBottom>
            About Us
        </Typography>
      </MenuItem>
      <MenuItem onClick={Logout}>
      <Typography variant="button" display="block" gutterBottom>
          Log Out
      </Typography>
      </MenuItem>
    </Menu>

      )
    } else return (
      <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={RouterLink} to={"/"}>
        <Typography variant="button" display="block" gutterBottom>
            Home
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/mygarden"}>
        <Typography variant="button" display="block" gutterBottom>
            My Garden
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/gallery"}>
        <Typography variant="button" display="block" gutterBottom>
            Gallery
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/about"}>
        <Typography variant="button" display="block" gutterBottom>
            About Us
        </Typography>
      </MenuItem>
          <Login setLoginState={setLoginState} setProfileState={setUserState} handleClose={handleMobileMenuClose} isMobile={true}/>
          <Signup setLoginState={setLoginState} setProfileState={setUserState} handleClose={handleMobileMenuClose} isMobile={true}/>
    </Menu>
    )
  }

  const renderDesktopMenu = function() {
    if (isLoggedIn) {
      return(
      <div className={classes.sectionDesktop}>
        <MenuItem component={RouterLink} to={"/about"}>
        <Typography variant="button" display="block" gutterBottom>
         About Us
        </Typography>
        </MenuItem>
      <MenuItem component={RouterLink} to={"/myplant"}>
        <Typography variant="button" display="block" gutterBottom>
          My Plants
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/mygarden"}>
        <Typography variant="button" display="block" gutterBottom>
          My Garden
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/gallery"}>
        <Typography variant="button" display="block" gutterBottom>
          Gallery
        </Typography>
      </MenuItem>

      <Tooltip title="User Settings">
        <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <FilterVintage />
            </IconButton>
          </Tooltip>
            {renderUserMenu()}
      </div>
      )
    } else return(
      <div className={classes.sectionDesktop}>
          <MenuItem component={RouterLink} to={"/about"}>
              <Typography variant="button" display="block" gutterBottom>
               About Us
              </Typography>
              </MenuItem>
            <MenuItem component={RouterLink} to={"/mygarden"}>
              <Typography variant="button" display="block" gutterBottom>
                My Garden
              </Typography>
            </MenuItem>
            <MenuItem component={RouterLink} to={"/gallery"}>
        <Typography variant="button" display="block" gutterBottom>
          Gallery
        </Typography>
      </MenuItem>
      <Login setLoginState={setLoginState} setProfileState={setUserState} handleClose={handleMenuClose}/>
      <Signup setLoginState={setLoginState} setProfileState={setUserState} handleClose={handleMenuClose}/>
          </div>
    )
  }


  return (
    <React.Fragment>
      <div className={classes.grow}>
      <AppBar position="fixed" style={{ background: '#614051' }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <IconButton component={RouterLink} to={"/"}>
              Plant-It!{" "}
            </IconButton>
          </Typography>
          <div className={classes.grow} />
          {renderDesktopMenu()}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {renderMobileMenu()}
        </Toolbar>
      </AppBar>
      <Toolbar />
      
      
      </div>
    </React.Fragment>
  );
}
