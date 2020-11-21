import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { Spring } from 'react-spring';
import {TextField} from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Box from '@material-ui/core/Box';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist'

let theme = createMuiTheme({
    palette: {
        primary: {
          light: '#806673',
          main: '#614051',
          dark: '#432c38',
          contrastText: '#fff',
        },
        secondary: {
          light: '#578c5a',
          main: '#166732',
          dark: '#204e22',
          contrastText: '#fff',
        },
      },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
    root: {
        color: 'white',  
    },
    input: {
        backgroundColor: fade('#fff', 0.8),
    },
    resize:{
        fontSize: 25
      },
    button: {
        margin:25,
      },
});

export default function Hero (props) {
    
        const classes = useStyles();

    if (props.visitedHero === true) {
        return ""
    } else {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={theme}>
            < Grid container className={classes.root} align="center">
                <Grid item
                    className={classes.img}
                    mx="auto"
                    style={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        height:750,
                        width:'100%',
                        title:"hand holding a plant",
                        backgroundImage: 'url("https://res.cloudinary.com/dbd23cfw2/image/upload/v1605767404/project%203/hero-image_rjjksh.jpg")'
                    }}>
                    <ThemeProvider theme={theme}>
                    <Typography variant="h3" style={{margin:40}}>
                        Plant-It
                    </Typography>
                    <Hidden only="xs">
                    <Typography variant="h5" style={{margin:25}} >
                        We are here to build a plant community, spread plant knowledge and assist in planning your garden.
                    </Typography>
                    </Hidden>

                    
                    <Grid container>
                        <Grid item xs={12}>
                        <TextField className={classes.input}
                        id="outlined-primary" 
                        variant='filled'
                        color= "primary"
                        style={{ margin: 8, width: '70%'}}
                        margin="normal"
                        label="Search for a plant to get started!"
                        InputProps= {{
                            classes: {
                                input: classes.resize,
                              },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />



                        </Grid>
                       

                            
                        
                    </Grid>
                        




                    <Button
                    className={classes.button}
                    variant="outlined"
                    size="large" color="inherit"
                    onClick={props.toggle}
                    >
                        Search for a Plant
                    </Button>

                    <Button
                    className={classes.button}
                    variant="outlined"
                    size="large" color="inherit"
                    onClick={props.toggle}
                    >
                       Log In
                    </Button>

                    <Button
                    className={classes.button}
                    variant="outlined"
                    size="large" color="inherit"
                    onClick={props.toggle}
                    >
                        Sign Up
                    </Button>
                    
                    </ThemeProvider>
                </Grid>
            </Grid>
            </MuiThemeProvider>
        </React.Fragment>
    )
}}

