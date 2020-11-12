import "../Search/Search.css";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import Button from '@material-ui/core/Button';



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

export default function Search() {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Select a Plant</InputLabel>
        <Select native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value="" />
          <optgroup label="Flowers">
            <option value={1}>Sunflower</option>
            <option value={2}>Peonies</option>
          </optgroup>
          <optgroup label="Fruit">
            <option value={3}>Strawberry</option>
            <option value={4}>Grape</option>
          </optgroup>
        </Select>
      </FormControl>
        <TextField
          label="Plant Search"
          id="outlined-margin-normal"
          defaultValue="Sunflower"
          className={classes.textField}
          helperText="Search for your favorite plant!"
          margin="normal"
          variant="outlined"
        />
        <Autocomplete
      id="combo-box-demo"
      options={plantArray}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
    <div>
    <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<LocalFloristIcon/>}
      >
        Search
      </Button>
      </div>
      </div>
    </div>
  );
}



