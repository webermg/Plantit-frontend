import "../Search/Search.css";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Hidden } from "@material-ui/core";
import { createMuiTheme, useTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#806673',
      main: '#614051',
      dark: '#432c38',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  input: {
    backgroundColor: 'transparent',
    color: '614051' },
  button: {
    margin: theme.spacing(1),
    float: "right",
    position: "relative",
  }
}));

export default function Search(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <MuiThemeProvider theme={theme}>
      <form onSubmit={ props.handleFormSubmit} noValidate autoComplete="off">
        <FormControl className={classes.formControl} >
          <Box display="flex" flexDirection="row" flexWrap="wrap" alignContent="flex-start" p={1} m={1}>
            <Box p={1} flexShrink={1}>
            <TextField
              id="outlined-basic" 
              background="white"
              color="primary.dark"
              label="Search for a plant!" 
              variant="outlined" 
              name="searchValue"
              InputProps={{
                className: classes.input}}
              value={props.state.searchValue}
              onChange={props.handleInputChange}
              />
              
              {/* <Autocomplete
                id="combo-box-demo"
                options={plantArray}
                getOptionLabel={(option) => option.name}
                style={{ width: "90%" }}
                renderInput={(params) => <TextField {...params} label="Plant?" variant="outlined"
                  onChange={props.handleInputChange}
                name="searchValue"
                value={props.state.searchValue}
                />} */}
              {/* /> */}
            </Box>
            <Box p={1} flexShrink={1}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<LocalFloristIcon />}
                onClick={props.handleFormSubmit}
              ><Hidden only="xs">
                  Search
                </Hidden>
              </Button>
            </Box>
          </Box>
        </FormControl>
      </form>
      </MuiThemeProvider>
    </div>
   
  );
}



