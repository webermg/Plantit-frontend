import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Hidden } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    button: {
      margin: theme.spacing(1),
      float: "right",
      position: "relative",
      backgroundColor: "#b1bb78"
    }
  }));


export default function Comment(data) {
  const classes = useStyles();
    
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<EditIcon />}
                // onClick={props.handleFormSubmit}
              ><Hidden only="xs">
                  Edit
                </Hidden>
              </Button>
            <h4>From: {data.user}</h4>

            <p>{data.comment}</p>
        </div>

    )
}