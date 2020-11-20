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
import { Redirect, useHistory } from 'react-router-dom';
import { HistoryOutlined } from "@material-ui/icons";
import BackButton from "../../BackButton/BackButton";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));


class MyPlant extends Component {
  state = {
    plants: [],
    userID: localStorage.getItem("id")
  };
  

  componentDidMount() {
    // const userID = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    
    console.log(this.state.userID)
    if (this.state.userID === null) {
      this.props.history.push("/")
    } else if (this.state.userID != null) {
      API.getMyPlants(this.state.userID)
      .then(result => {
        if (result.data) {
          console.log(result.data)
          this.setState({plants: result.data})
        }
    }).catch(err => {
      console.log(err)
    })
    }
    }




  removePlant = (id) => {
    const plants = this.state.plants.filter((plant) => plant._id !== id);
    this.setState({ plants });
    API.deleteMyPlant({
      userID: this.state.userID,
      plantID: id
    }).then ((res, err)=>{
      if (err) throw err;
    })
  };

  render() {
    const classes = useStyles;
    return (
      <div>
      <Container style={{ padding: 60}} className={classes.root}>
           <Grid item md mx="auto" style={{margin: '2%'}} >
      <BackButton/>
      </Grid>
      <div >
        <Grid container spacing={4}>
          <Typography
            component="div"
            style={{ backgroundColor: "#cfe8fc", height: "50vh" }}
          />
          {this.state.plants.map((plant) => (
            <Grid item xs={4}>
              <RecentCard
               removePlant = {this.removePlant}
                _id={plant._id}
                common_name={plant.common_name}
                slug={plant.slug}
                // wateringMin={plant.watering[0]}
                // wateringMax={plant.watering[1]}
                image_url={plant.image_url}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      </Container>
      </div>
    );
  }
}

export default MyPlant;
