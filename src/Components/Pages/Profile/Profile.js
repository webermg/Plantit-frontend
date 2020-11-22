import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../../utils/API";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RecentCard from "../../Recent/Recent";
import "../MyPlant/MyPlant.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Location from '../../Location/Location'
import Interests from '../../Interests/Interests'
import Skills from '../../Skills/Skills'

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#005254",
    },
  },
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    color: "white",
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default class profile extends Component {
  state = {
    id: "",
    user: "",
    plants: [],
    location: "",
    skills: [],
    interests: [],
  };

  componentDidMount() {
    const userID = localStorage.getItem("id");

    if (userID === null) {
      this.props.history.push("/");
    } else if (userID != null) {
      API.getUser(userID).then((result) => {
        console.log(result.data);
        this.setState({ user: result.data, plants: result.data.myPlants, id: result.data._id });
      });
    }
  }

  render() {
    const classes = useStyles;
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <Container>
            <Grid item xs={12}>
                <Typography
                  className={"MuiTypography--heading"}
                  variant={"h1"}
                  fontWeight="bold"
                  component="h1"
                  align="center"
                  style={{ color: "#a9a9a9", margin: "2%" }}
                >
                  {this.state.user.username}'s Profile
                </Typography>
              </Grid>
            </Container>
            <Container>
              <Typography style={{ color: "#a9a9a9", margin: "2%" }}>
                <h2>My Garden:</h2>
              </Typography>
              <Grid container>
                <Grid item xs={8}>
                  <img
                    src={this.state.user.myGardenImg}
                    style={{ background: "#cac5b9" }}
                  />
                </Grid>
                <Grid item xs={4} style={{ background: "#cac5b9" }}>
                  <h3 >
                    City, State, and/or Country: 
                  </h3>
                  <p>{this.state.user.location}</p>
                  <Location id={this.state.id}/>
    
                  <h3>Gardening Interests: </h3>
                  <p>{this.state.user.interests}</p>
                  <Interests id={this.state.id}/>

                  <h3>Gardening Skills:</h3>
                  <p>{this.state.user.skills}</p>
                  <Skills id={this.state.id}/>
                </Grid>
              </Grid>
            </Container>
            <Container spacing={5}>
            <Typography style={{ color: "#a9a9a9", margin: "2%" }}>
                <h2>My Plants:</h2>
              </Typography>
              <Grid container spacing={2}>
                {this.state.plants.map((plant) => (
                  <Grid item xs={3}>
                    <RecentCard
                      _id={plant._id}
                      common_name={plant.common_name}
                      slug={plant.slug}
                      image_url={plant.image_url}
                      />
                  </Grid>
                ))}
              </Grid>
            </Container>
          
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

