import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../../utils/API";
import Grid from "@material-ui/core/Grid";
import plants from "../../../plantArray.json";
import Typography from "@material-ui/core/Typography";
import { spacing } from "@material-ui/system";
import Container from "@material-ui/core/Container";
import RecentCard from "../../Recent/Recent";
import "../MyPlant/MyPlant.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default class profile extends Component {
  state = {
    user: [],
    plants,
  };

  componentDidMount() {
    const userID = localStorage.getItem("id");
    if (userID === null) {
      this.props.history.push("/") }
    else if (userID != null) {
      API.getUser(userID).then((result) => {
        console.log(result.data);
        this.setState({ user: result.data });
      });
    }
  }
  
  render() {
    const classes = useStyles;
    return (
      <React.Fragment>
        <Grid container style={{background:'#005254'}}>
          <Grid item xs={12}>
            <h1>Welcome, {this.state.user.username}!</h1>
          </Grid>
          <Typography>
            <Grid item>
              <h3>My Location: {this.state.user.location}</h3>
            </Grid>
            <Grid item>
              <h3>Email: {this.state.user.email}</h3>
            </Grid>
            <Grid item>
              <h3>Gardening Skills: {this.state.user.skills}</h3>
            </Grid>
            <Grid item>
              <h3>Gardening Interests: {this.state.user.interests}</h3>
            </Grid>
          </Typography>
          <img src={this.state.user.myGardenImg} alt="" style={{border:'solid black 1px',background: '#DDDDDD'}}/>
          {/* {this.state.user.myPlants.map((plant) => (
            <Grid item xs={4}>
              <RecentCard
                _id={plant._id}
                common_name={plant.common_name}
                slug={plant.slug}
                image_url={plant.image_url}
              />
            </Grid>
          ))} */}
        </Grid>
      </React.Fragment>
    );
  }
}
