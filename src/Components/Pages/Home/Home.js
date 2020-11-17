import React, { Component } from 'react';
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
import Hidden from '@material-ui/core/Hidden';
import Results from '../../Results/Results';


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
        plants,
        searchValue:"",
        submittedSearch:"",
        seachedPlants:[]
    };

    handleInputChange = event => {
        let {name, value } = event.target;
        this.setState({
            [name]:value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({
            submittedSearch: this.state.searchValue
        })

    }

    removePLant = id => {
        const plants = this.state.plants.filter(plant => plant.id !== id);
        this.setState({ plants })
    };
    render() {
        const classes = useStyles;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root} style={{ width: '100%' }} >
                    <Typography component="div" style={{ backgroundColor: '#cac5b9' }}>
                        <Container >
                            <Box display="flex" flexDirection="row-reverse" p={1} m={1} >
                                <Box  mx="auto" p={1} style={{ width: 'auto' }}>
                                    <Paper className={classes.paper}>
                                        <Search handleFormSubmit={this.handleFormSubmit}
                                        handleInputChange={this.handleInputChange} state={this.state}/>
                                        <h2>Search Results</h2>
                                            <Results submittedSearch={this.state.submittedSearch}/>
                                    </Paper>
                                </Box>
                                <Hidden only="xs">
                                    <Box mx="auto" p={1} style={{ width: '35%' }}>
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
                                </Hidden>
                            </Box>
                        </Container>
                    </Typography>
                </div>
            </React.Fragment>
        )
    }

}

export default Home;
