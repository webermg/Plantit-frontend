import React, { Component } from "react";
import RecentCard from "../../Recent/Recent";
import plants from "../../../plantArray.json";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../MyPlant/MyPlant.css";
import API from "../../../utils/API";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

class MyPlant extends Component {
  state = {
    plants,
  };

  componentDidMount() {
    API.getUser("5fb4071f8bf9f556f0192391")
    .then(result => {
      console.log(result.data)
      this.setState({plants: result.data.myPlants})
    })
  }

  removePLant = (id) => {
    const plants = this.state.plants.filter((plant) => plant.id !== id);
    this.setState({ plants });
  };

  render() {
    const classes = useStyles;
    return (
        <Container style={{ padding: 60}} className={classes.root}>
      <div >
        <Grid container spacing={4}>
          <Typography
            component="div"
            style={{ backgroundColor: "#cfe8fc", height: "50vh" }}
          />
          {this.state.plants.map((plant) => (
            <Grid item xs={4}>
              <RecentCard
                _id={plant._id}
                common_name={plant.common_name}
                // wateringMin={plant.watering[0]}
                // wateringMax={plant.watering[1]}
                image_url={plant.image_url}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      </Container>
    );
  }
}

export default MyPlant;
