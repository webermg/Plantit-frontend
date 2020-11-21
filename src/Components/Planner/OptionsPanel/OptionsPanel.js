import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Switch,Slider,Typography} from '@material-ui/core';

export default function OptionsPanel(props) {
  
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch value="on" checked={props.displayGrid} onChange={props.onChange} name="displayGrid" />}
        label="Display Grid"
      />
      <FormControlLabel
        control={<Switch value="on" checked={props.lockBackground} onChange={props.onChange} name="lockBackground" />}
        label="Lock Background"
      />
      <FormControlLabel
        control={<Switch value="on" checked={props.hideBackground} onChange={props.onChange} name="hideBackground" />}
        label="Hide Background"
      />
      <FormControlLabel
        control={<Switch value="on" checked={props.lockForeground} onChange={props.onChange} name="lockForeground" />}
        label="Lock Foreground"
      />
      <FormControlLabel
        control={<Switch value="on" checked={props.hideForeground} onChange={props.onChange} name="hideForeground" />}
        label="Hide Foreground"
      />
      <FormControlLabel
        control={<Switch value="on" checked={props.alwaysShowTooltips} onChange={props.onChange} name="alwaysShowTooltips" />}
        label="Always Show Tooltips"
      />
      <FormControlLabel
        control={<Switch value="on" checked={props.gridSnap} onChange={props.onChange} name="gridSnap" />}
        label="Snap to Grid"
      />
      <Typography id="discrete-slider1" gutterBottom>
        Snap Distance
      </Typography>
      <Slider
        defaultValue={props.snapDist}
        // getAriaValueText={valuetext}
        aria-label='snapDist'
        name="snapDist"
        aria-labelledby="discrete-slider1"
        valueLabelDisplay="auto"
        onChangeCommitted={props.onSliderChange}
        step={5}
        marks
        min={5}
        max={30}
        disabled={!props.gridSnap}
      />
      <Typography id="discrete-slider2" gutterBottom>
        Grid Size
      </Typography>
      <Slider
        defaultValue={props.gridSize}
        // value={props.gridSize}
        // getAriaValueText={value=>value}
        aria-label='gridSize'
        name="gridSize"
        aria-labelledby="discrete-slider2"
        valueLabelDisplay="auto"
        onChangeCommitted={props.onSliderChange}
        step={10}
        marks
        min={20}
        max={80}
      />
      {/* <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Primary"
      />
      <FormControlLabel control={<Switch />} label="Uncontrolled" />
      <FormControlLabel disabled control={<Switch />} label="Disabled" />
      <FormControlLabel disabled control={<Switch checked />} label="Disabled" /> */}
    </FormGroup>
  );
}