import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Spring } from 'react-spring';
import Login from '../Login/Login';
import Signup from '../Signup/Signup'

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
    root: {
        color: 'white',
        
    },
    button: {
        margin:25,
      }

});

export default function Hero (props) {
    
        const classes = useStyles();

    if (props.visitedHero === true) {
        return ""
    } else {
    return (
        <React.Fragment>
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
                    <Button
                    className={classes.button}
                    variant="outlined"
                    size="small" color="inherit"
                    onClick={props.toggle}
                    >
                        Get Started
                    </Button>
                    
                    </ThemeProvider>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}}

