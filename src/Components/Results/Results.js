import React, { useEffect, useState } from 'react'
import API from '../../utils/API';
import PlantSearchCard from '../PlantSearchCard/PlantSearchCard';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from "@material-ui/core";
import { Redirect, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { result } from 'lodash';
import Grid from "@material-ui/core/Grid";




const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#b1bb78"
  }
}));


export default function Results(props) {
  const [plantsInDatabase, setPlantsInDatabase] = useState([])
  const [plantsInTrefle, setPlantsInTrefle] = useState([])
  const [userToken, setUserToken] = useState("")
  let [page, setPage] = useState(1)

  const history = useHistory();

  useEffect(() => {
    

    API.getDatabasePlants(`${props.submittedSearch}`)
      .then(result => {
        console.log(result.data)
        if (result.data.name === "MongoError") {
          setPlantsInDatabase([])
        } else {
          setPlantsInDatabase(result.data)
        }

      }).catch(err => console.log(err));

    if (`${props.submittedSearch}` !== "") {
      API.getToken().then(result => {
        // console.log(result.data);
        setUserToken(result.data.token)

        API.getSearchedPlants(`${props.submittedSearch}`, result.data.token, page)
          .then(result => {

            if (page > 1 && result.data.name === "Error") {
              setPlantsInTrefle([]);
              console.log("No more plants to be found")
            } else {
              setPlantsInTrefle(result.data)
            }
          }).catch(err => {
            console.log(err)
            if (page > 1 && err.error === true) {
              setPlantsInTrefle([]);
              console.log("No more plants to be found")
            }
          });
      }, err => console.log(err))

    }


  }, [props.submittedSearch, page])

  function addFavorite (plantId, userId) {
    API.favoritePlant(plantId,userId)
    .then(result => console.log(result), 
      err => console.log(err))
  }

  //Filters out from Trefle all the plants currently in the database.  Needs some complicated promise stuff to make it happen in a way that isn't an infinite loop
  function filterTrefle() {
    let databaseSlugs = plantsInDatabase.map(element => element.slug)
    console.log(databaseSlugs)
    const newPlants = plantsInTrefle.filter(element => !(databaseSlugs.includes(element.slug)))
    setPlantsInTrefle(newPlants)
  }

  const newPlantInDatabase = function (slug, token) {
    API.getNewPlant(slug, token)
      .then(result => {
        history.push("/plant/" + result.data.slug)
      }, err => console.log(err))
  }

  const classes = useStyles();


  return (
    <React.Fragment className={classes.root}>
    {/* <div className={classes.root}> */}
      <Grid container display="flex" alignContent="center"
      // flexDirection="row" 
      // flexWrap="wrap" 
      // alignContent="flex-start" 
      // p={1} m={1}
      >
        <Grid item flexShrink={1} xs={12} style={{height:500, overflowY:'auto'}}>
          {/* Section with plants already in our database */}
          {console.log(plantsInDatabase)}
          {plantsInDatabase.length === 0 ? "no plants found" : "plants found"}
          {Array.isArray(plantsInDatabase) ? plantsInDatabase.map(element => {

            return <PlantSearchCard
              data={element}
              key={element.slug}
              newPlantInDatabase={newPlantInDatabase}
              inDatabase={true}
              addFavorite={addFavorite} />
          }) : ""
          }
          {plantsInTrefle.length === 0 && page > 1 ? <p> No more plants, please return to previous </p> : plantsInTrefle.map(element => {
            return <PlantSearchCard
              data={element}
              key={element.slug}
              newPlantInDatabase={newPlantInDatabase}
              usertoken={userToken}
              inDatabase={false}
              addFavorite={addFavorite} />
          })}
        </Grid>
      </Grid>
      {/* <Box display="flex" flexDirection="row" flexWrap="wrap" alignContent="flex-start" p={1} m={1}> */}

        {/* Button for more plants */}
        {/* <Box p={1} flexShrink={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<MoreHorizIcon />}
          ><Hidden only="xs">
              MORE
                </Hidden>
          </Button>
        </Box> */}
        {/* Upon button being clicked, button for more plants does an api call  */}
        {/* next and back buttons to get more results from trefle */}
        {/* <Box p={1} flexShrink={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<ArrowBackIcon />}
            onClick={() => page > 1 ? setPage(page - 1) : null}
          ><Hidden only="xs">
              LEFT
                </Hidden>
          </Button>
        </Box>
        <Box p={1} flexShrink={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<ArrowForwardIcon />}
            onClick={() => plantsInTrefle.length === 0 ? null : setPage(page++)}
          ><Hidden only="xs">
              RIGHT
                </Hidden>
          </Button>
        </Box> */}
      {/* </Box> */}
    {/* </div> */}
    </React.Fragment>
  )
}
