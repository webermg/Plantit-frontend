/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import Button from '@material-ui/core/Button';
import "../Search/Search.css";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  button: {
    margin: theme.spacing(1),
  }
}));


const filter = createFilterOptions();

export default function Search2() {
  const [value, setValue] = React.useState(null);
  const classes = useStyles();

  return (
      <div className={classes.root}>
      <div>
      <FormControl className={classes.formControl}></FormControl>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={plantArray}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(option) => option.name}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="The Best Plant Search" variant="outlined" />
      )}
    />
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<LocalFloristIcon/>}
      >
        Search
      </Button></div>
    </div>
    </div>

  );
}


const plantArray=[
  {
    name:"Grapes"
  },
  {
    name:"Strawberry"
  },
  {
    name:"Western Red Cedar"
  }, 
  {
    name:"Lavendar"
  }, 
  {
    name:"Squish"
  },
  {
    name:"Hazel"
  }
]