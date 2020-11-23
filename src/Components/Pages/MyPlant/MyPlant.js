import React, { Component } from "react";
import RecentCard from "../../Recent/Recent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import API from "../../../utils/API";
import BackButton from "../../BackButton/BackButton";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#806673',
      main: '#614051',
      dark: '#432c38', 
      contrastText: '#fff',
    },
    secondary: {
      light: '#c88f76',
      main: '#bb7354',
      dark: '#82503a',
      contrastText: '#fff',
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));


class MyPlant extends Component {
  state = {
    plants: [],
    userID: localStorage.getItem("id"),
    isMyPlant: true
  };
  

  componentDidMount() {
    const token = localStorage.getItem("token")
    
    if (this.state.userID === null) {
      this.props.history.push("/")
    } else if (this.state.userID != null) {
      API.getMyPlants(this.state.userID)
      .then(result => {
        if (result.data) {
          this.setState({plants: result.data})
        }
    }).catch(err => {
      throw err
    })}}



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
    if (this.state.plants === null) {
      return <h1>loading...</h1>
    } 
    return (
      <div>
        <MuiThemeProvider theme={theme}>
      <Grid container style={{ padding: 60, background:'#005254', paddingTop:"2%"}} className={classes.root}>
          <Grid item xs={12}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h3"}
              fontWeight="bold"
              component="h4"
              align="center"
              style={{ color: "#a9a9a9", marginTop: "0%", marginLeft: "2%" }}
            >
              My Plants
          </Typography>
          </Grid>
           <Grid item xs={12} mx="auto" style={{margin: '2%'}} >
            <BackButton/>
            </Grid>
            
      <div >
        <Grid container spacing={3}>
          <Typography
            component="div"
            style={{ backgroundColor: "#cfe8fc", height: "50vh" }}
          />
          {this.state.plants.map((plant) => (
            <Grid item xs key={plant.slug}>
              <RecentCard
               removePlant = {this.removePlant}
               key = {plant.slug}
                _id={plant._id}
                common_name={plant.common_name}
                slug={plant.slug}
                image_url={plant.image_url}
                isMyPlant= {true}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      </Grid>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default MyPlant;
