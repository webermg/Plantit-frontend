import React, { Component } from "react";
import RecentCard from "../../Recent/Recent";
import plants from "../../../plantArray.json";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../MyPlant/MyPlant.css";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

class MyPlant extends Component {
  state = {
    plants,
  };

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
                id={plant.id}
                name={plant.name}
                info={plant.info}
                image={plant.image}
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
