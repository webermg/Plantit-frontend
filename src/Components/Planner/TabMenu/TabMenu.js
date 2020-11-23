import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DrawPanel from '../DrawPanel/DrawPanel';
import ForeGroundPanel from '../ForegroundPanel/ForegroundPanel';
import PlantsPanel from '../PlantsPanel/PlantsPanel';
import OptionsPanel from '../OptionsPanel/OptionsPanel.js'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    maxHeight: 800
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // flexGrow:1
  },
  tabPanel: {
    overflow: 'auto',
    flexGrow:1
  }
}));

export default function TabMenu(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Plots" {...a11yProps(0)}/>
        <Tab label="Plants" {...a11yProps(1)} />
        <Tab label="Other" {...a11yProps(2)} />
        <Tab label="Options" {...a11yProps(3)} />
        <Tab label="Clear" {...a11yProps(4)} />
        {/* <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
      <TabPanel className={classes.tabPanel} value={value} index={0}>
        <DrawPanel active={props.active} onClick={props.onDrawClick}/>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1}>
        {props.myPlants ? <PlantsPanel myPlants={props.myPlants} onClick={props.onForegroundClick}/> : "Log in to add plants"}
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={2}>
        <ForeGroundPanel onClick={props.onForegroundClick}/>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={3}>
        <OptionsPanel {...props.options} onChange={props.onOptionChange} onSnapSliderChange={props.onSnapSliderChange} onGridSliderChange={props.onGridSliderChange}/>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={4}>
        <Button variant="contained" color="secondary" onClick={props.clearAll}>Clear</Button>
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}