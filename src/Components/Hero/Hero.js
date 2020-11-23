import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Card from '@material-ui/core/Card'


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
    resize: {
        fontSize: 25
    },
    button: {
        margin: 25,
    },
    img: {
        [theme.breakpoints.down('sm')]: {
            minHeight: '100vh',
            minWidth: '30%'
        },
        [theme.breakpoints.up('md')]: {
            height: 750
        },
        flexGrow: 1

    }
});

export default function Hero(props) {

    const classes = useStyles();

    if (props.visitedHero === true) {
        return ""
    } else {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    < Grid container align="center">
                        <Grid item xs={12}>
                           
                            {/* Hero Image */}
                            <Card
                                className={classes.img}
                                mx="auto"
                                style={{
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    color: 'white',
                                    title: "hand holding a plant",
                                    backgroundImage: `url(${"/images/hero-image3.png"})`
                                }}>
                                   
                                    {/* Hero Image Text */}
                                    
                                <ThemeProvider theme={theme}>
                                    <Grid container>
                                        <Grid item xs={12} style={{paddingTop: '50px'}}>
                                            <img src='/images/plantitlogo.png' alt='Plant-it Logo' width='70%'></img>
                                        </Grid>

                                        <Grid item xs={12}>
                                        <Hidden only="xs">
                                        <Typography variant="h5" >
                                            We are here to build a plant community, spread plant knowledge, and assist in planning your garden.
                                        </Typography>
                                    </Hidden>
                                        </Grid>
                                    </Grid>
                                   

                                    {/* Search Bar on Hero */}
                                    <form onSubmit={props.handleFormSubmit} noValidate autoComplete="off">
                                        <Grid container>
                                            <Grid item xs={12}>
                                              <TextField className={classes.input}
                                                    id="outlined-primary"
                                                    variant='filled'
                                                    color="primary"
                                                    style={{ margin: 8, width: '70%' }}
                                                    margin="normal"
                                                    name="searchValue"
                                                    label="Search for a plant to get started!"
                                                    InputProps={{
                                                        classes: {
                                                            input: classes.resize,
                                                        },
                                                    }}
                                                    value={props.state.searchValue}
                                                    onChange={props.handleInputChange}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* Search Button */}
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            size="large" color="inherit"
                                            onClick={props.handleFormSubmit}
                                        >
                                            Search Plants
                                        </Button>
                                    </form>
                                </ThemeProvider>
                            </Card>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
            </React.Fragment>
        )
    }
}

