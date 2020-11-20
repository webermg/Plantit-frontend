import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
// import Badge from '@material-ui/core/Badge';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FilterVintage from "@material-ui/icons/FilterVintage"
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link as RouterLink, useLocation, useHistory } from "react-router-dom";
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup';
import API from '../../utils/API';
// import { Link, useLocation } from "react-router-dom";

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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {

    color: 'inherit',

  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
    // redirect to home pageA
    handleMenuClose()
    history.push("/")

  }

  const menuId = "primary-search-account-menu";
  const renderUserMenu = function() {
    if (isLoggedIn) {
      return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
        <MenuItem component={RouterLink} to={"/profile"}>My Profile</MenuItem>
        <MenuItem onClick={Logout}>Log Out</MenuItem>
        </Menu>
      )
    } else return (
      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
         <Login setLoginState={setLoginState} setProfileState={setUserState} handleClose={handleMenuClose} isMobile={false}/>
         <Signup setLoginState={setLoginState} setProfileState={setUserState} handleClose={handleMenuClose} isMobile={false}/> 
    </Menu>

    )
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
        <Typography>
            Home
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/myplant"}>
        <Typography>
          My Plants
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/mygarden"}>
        <Typography>
          My Garden
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/profile"}>
      <Typography>
          My Profile
      </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/about"}>
        <Typography>
            About Us
        </Typography>
      </MenuItem>
      <MenuItem onClick={Logout}>
      <Typography>
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
        <Typography>
            Home
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/mygarden"}>
        <Typography>
            My Garden
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/about"}>
        <Typography>
            About Us
        </Typography>
      </MenuItem>
          <Login setLoginState={setLoginState} setProfileState={setUserState} handleClose={handleMenuClose} isMobile={true}/>
          <Signup setLoginState={setLoginState} setProfileState={setUserState} handleClose={handleMenuClose} isMobile={true}/>
    </Menu>
    )
  }

  const renderDesktopMenu = function() {
    if (isLoggedIn) {
      return(
      <div className={classes.sectionDesktop}>
        <MenuItem>
        <Typography>
        <IconButton component={RouterLink} to={"/about"}>
         About
        </IconButton> 
        </Typography>
        </MenuItem>
      <MenuItem>
        <Typography />
        <IconButton component={RouterLink} to={"/myplant"}>
          My Plants
        </IconButton>
        <Typography />
      </MenuItem>
      <MenuItem>
        <Typography>
        <IconButton component={RouterLink} to={"/mygarden"}>
          My Garden
        </IconButton>
        </Typography>
      </MenuItem>

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
      </div>
        
      )
    } else return(
      <div className={classes.sectionDesktop}>
          <MenuItem>
              <Typography>
              <IconButton component={RouterLink} to={"/about"}>
               About
              </IconButton> 
              </Typography>
              </MenuItem>
            <MenuItem>
              <Typography>
              <IconButton component={RouterLink} to={"/mygarden"}>
                My Garden
              </IconButton>
              </Typography>
            </MenuItem>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
    )
  }


  return (
    <div className={classes.grow}>
      <AppBar position="static"style={{ background: '#614051' }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <IconButton component={RouterLink} to={"/"}>
              Plant-It!{" "}
            </IconButton>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Plant Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          {/* <div className={classes.sectionDesktop}>
          <MenuItem>
              <Typography>
              <IconButton component={RouterLink} to={"/about"}>
               About
              </IconButton> 
              </Typography>
              </MenuItem>
            <MenuItem>
              <Typography />
              <IconButton component={RouterLink} to={"/myplant"}>
                My Plants
              </IconButton>
              <Typography />
            </MenuItem>
            <MenuItem>
              <Typography>
              <IconButton component={RouterLink} to={"/mygarden"}>
                My Garden
              </IconButton>
              </Typography>
            </MenuItem>

            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div> */}
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
        </Toolbar>
      </AppBar>
      {renderMobileMenu()}
      {renderUserMenu()}
    </div>
  );
}
