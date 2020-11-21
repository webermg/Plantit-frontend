import React, { Component } from 'react';
import '../Home/Home.css';
import Search from "../../Search/Search";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import RecentCard from '../../Recent/Recent';
import plants from "../../../plantArray.json";
import Hidden from '@material-ui/core/Hidden';
import Results from '../../Results/Results';
import API from '../../../utils/API';
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Transition, animated } from 'react-spring/renderprops';
import Hero from '../../Hero/Hero';



const theme = createMuiTheme({
    palette: {
        background: {
            default: '#005254',
        },
            primary: {
              light: '#806673',
              main: '#614051',
              dark: '#432c38',
              contrastText: '#fff',
            },
            secondary: {
              light: '#578c5a',
              main: '#166732',
              dark: '#204e22',
              contrastText: '#fff',
            },
          },
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
});

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(2),
        background: '#cac5b9'
    },
}));
class Home extends Component {
    state = {
        plants,
        searchValue: "",
        submittedSearch: "",
        seachedPlants: [],
        toggleHero: true,
        visitedHero: false,
        isMyPlant: false,
    };

    componentDidMount() {
        const isVisited = localStorage.getItem("isVisited")
        if (isVisited === "true") {
            this.setState({toggleHero: false})
            this.setState({visitedHero: true})
        }

        API.getFeaturedPlants()
            .then(result => {
                console.log(result.data)
                const featuredPlants = result.data.map(element => { return element.plantInfo[0] })
                console.log(featuredPlants)
                this.setState({ plants: featuredPlants })
            })
    }

    handleInputChange = event => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
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

    toggle = e => {this.setState({ toggleHero: false })
        localStorage.setItem("isVisited", true)}

    render() {
        const classes = useStyles;
        return (
                <React.Fragment>
                    <CssBaseline /> 
                    <MuiThemeProvider theme={theme}>
                    <div className={classes.root}  style={{background:'#005254'}}>
                        <Grid container >
                            <Grid item mx="auto" style={{ width: '100%', height: '100%' }}>
                                <Transition
                                    native
                                    items={this.state.toggleHero}
                                    from={{ opacity: 1 }}
                                    enter={{ opacity: 1 }}
                                    leave={{ opacity: 0 }}
                                >{show => show && (props => (
                                    <animated.div style={props}>
                                        <Hero
                                            toggle={this.toggle}
                                            visitedHero={this.state.visitedHero}
                                        />
                                    </animated.div>
                                ))}
                                </Transition>
                            </Grid>
                            <Grid container justify='center'>

                                <Hidden only={["xs", "sm"]}>
                                    <Grid item md={3} mx="auto" p={1} m={1} style={{ width: '35%', margin: '2%' }}>
                                        <Paper className={classes.paper} style={{ background: '#cac5b9' }}>
                                            <Typography variant='h4' component= 'h1' style={{ margin: "0em", padding: "25px", textAlign: 'center' }}>
                                                Featured Plants
                                            </Typography>
                                            <Grid item style={{ height: 535, overflowY: 'auto' }}>
                                                {this.state.plants.map(plant => (
                                                    <RecentCard
                                                        _id={plant._id}
                                                        key={plant.slug}
                                                        slug={plant.slug}
                                                        common_name={plant.common_name}
                                                        image_url={plant.image_url}
                                                        isMyPlant= {false}
                                                    />
                                                ))}
                                            </Grid>
                                        </Paper>

                                    </Grid>
                                </Hidden>
                                <Grid item md mx="auto" style={{ width: 'auto', margin: '2%' }}>
                                    <Paper className={classes.paper} style={{ background: '#cac5b9' }}>
                                        <Typography variant='h4' component= 'h1' style={{ margin: "0em", padding: "25px", textAlign: 'center' }}>
                                            Welcome to Plant-It!
                                        </Typography>
                                        <Typography variant= 'h5' component= 'h2' style= {{ margin: "0em", padding: "10px", textAlign: 'center' }}>
                                            Search for a plant name to begin your gardening journey!
                                        </Typography>
                                        <Search handleFormSubmit={this.handleFormSubmit}
                                            handleInputChange={this.handleInputChange} state={this.state} />
                                        {/* <h2 style={{margin: "0em", padding: "1em"}}>Search Results</h2> */}
                                        <Results submittedSearch={this.state.submittedSearch} />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    </MuiThemeProvider>
                </React.Fragment>
        )
    }

}

export default Home;
