import "../Search/Search.css";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Hidden } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#806673',
      main: '#614051',
      dark: '#432c38', 
      contrastText: '#fff',
    },
    secondary: {
      light: '#c88f76',
      main: '#bb7354',
      dark: '#82503a',
      contrastText: '#fff',
    },
  },
});


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

  },
  input: {
    backgroundColor: 'transparent',
    color: '614051'
  },
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
        <form onSubmit={props.handleFormSubmit} noValidate autoComplete="off">
          <Paper style={{ backgroundColor: fade('#fff', 0.7) }}>
            < Grid container className={classes.root} align="center">

              {/* Search Bar and Button */}
              <Grid item xs={12}>
                <Box display="flex" flexDirection="row" flexWrap="wrap" alignContent="flex-start" justifyContent="center" p={1} m={1}>
                  <Typography variant='h5' component='h2' style={{ margin: "0em", padding: "10px", textAlign: 'center' }}>
                    Search for a plant to begin your gardening journey!
                  </Typography>

                  <TextField
                    id="outlined-basic"
                    background="white"
                    color="primary"
                    label="Search for a plant!"
                    variant="outlined"
                    name="searchValue"
                    style={{ margin: 8, width: '75%' }}
                    InputProps={{
                      className: classes.input
                    }}
                    value={props.state.searchValue}
                    onChange={props.handleInputChange}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    endIcon={<LocalFloristIcon />}
                    onClick={props.handleFormSubmit}
                  ><Hidden only="xs">Search</Hidden>
                  </Button>
                </Box>

              </Grid>
            </Grid>
          </Paper>
        </form>
      </MuiThemeProvider>
    </div>
  );
}



