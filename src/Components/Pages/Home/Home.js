import React, { Component} from 'react';
import '../Home/Home.css';
import Search from "../../Search/Search";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import RecentCard from '../../Recent/Recent';
import plants from "../../../plantArray.json";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(2)
    },
}));
class Home extends Component {
    state = {
    plants
  };

//   const classes = useStyles();
  removePLant = id => {
      const plants = this.state.plants.filter(plant => plant.id !== id);
      this.setState({plants})
  };
  render() {
    const classes = useStyles;  
    return (
        <React.Fragment>
            <CssBaseline />
            <Container >
                <Typography component="div" style={{ backgroundColor: '#cac5b9', height: '100vh' }}>
                    <div className={classes.root} style={{ width: '100%' }} >


                        <Box display="flex"  flexDirection="row-reverse" p={1} m={1} >
                            <Box p={1} style={{ width: '65%' }}>
                                <Paper className={classes.paper}>
                                    <Search />
                                    <h2>Search Results</h2>
                                </Paper>
                            </Box>
                            <Box p={1} style={{ width: '35%' }}>
                                <Paper className={classes.paper}>
                                    <h2>Recent Activity</h2>
                                    {this.state.plants.map(plant => (
                                    <RecentCard
                                        id={plant.id}
                                        name={plant.name}
                                        info={plant.info}
                                        image={plant.image}
                                    />
                                    ))}
                                </Paper>
                            </Box>
                        </Box>
                    </div>
                </Typography>
            </Container>
        </React.Fragment>

    )
    }

}

export default Home;
