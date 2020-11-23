import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link as RouterLink } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


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
    }
})

export default class BackButton extends Component {

    render() {
        return (
            // Back Button on Plant Det, My Plant Pages
            <MuiThemeProvider theme={theme}>
                <div>
                    <Button
                        variant="contained"
                        component={RouterLink} to={"/"}
                        color="secondary"
                        startIcon={<ArrowBackIcon />}
                    >
                        New Plant Search
                </Button>
                </div>
            </MuiThemeProvider>
        )
    }
}

