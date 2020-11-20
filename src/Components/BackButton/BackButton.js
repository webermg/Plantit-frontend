import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link as RouterLink } from "react-router-dom";

export default class BackButton extends Component {

    render() {
        return (
            <div>
                <Button
                variant="contained"
                component={RouterLink} to={"/"}
                color="primary"
                startIcon={<ArrowBackIcon/>}
                style = {{backgroundColor: "#b1bb78"}}
                >
                    New Plant Search
                </Button>
            </div>
        )
    }
}

