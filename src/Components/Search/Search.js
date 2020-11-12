import "../Search/Search.css";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';



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
          <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
            <Box p={1}>
              <Autocomplete
                id="combo-box-demo"
                options={plantArray}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Looking for a Plant?" variant="outlined" />}
              />
            </Box>
            <Box p={1}>
              <Button
                variant="contained"
                color="primary"
                // anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                className={classes.button}
                endIcon={<LocalFloristIcon />}
              >
                Search
            </Button>
            </Box>
          </Box>
        </FormControl>
      </div>
    </div>
  );
}



