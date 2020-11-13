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
  button: {
    margin: theme.spacing(1),
    float: "right",
    position: "relative",
    backgroundColor: "green"
  }
}));

export default function Search() {
  const classes = useStyles();
  const plantArray = [
    {
      name: "Grapes"
    },
    {
      name: "Strawberry"
    },
    {
      name: "Western Red Cedar"
    },
    {
      name: "Lavendar"
    },
    {
      name: "Squish"
    },
    {
      name: "Hazel"
    }
  ]

  return (
    <div className={classes.root}>
      <div>
        <FormControl className={classes.formControl}>
          <Box display="flex" flexDirection="row" flexWrap="wrap" alignContent="flex-start" p={1} m={1}>
            <Box p={1} flexShrink={1}>
              <Autocomplete
                id="combo-box-demo"
                options={plantArray}
                getOptionLabel={(option) => option.name}
                style={{ width: "90%" }}
                renderInput={(params) => <TextField {...params} label="Plant?" variant="outlined" 
                />}
              />
            </Box>
            <Box p={1}flexShrink={1}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<LocalFloristIcon />}
              ><Hidden only="xs">
                Search
                </Hidden>
            </Button>
            </Box>
          </Box>
        </FormControl>
      </div>
    </div>
  );
}



