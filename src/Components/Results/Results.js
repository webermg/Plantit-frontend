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
import TokenExpiry from '../../utils/TokenExpiry';
import _ from 'lodash'



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
  let [page, setPage] = useState(1)

  const history = useHistory();

  useEffect(() => {
    if (`${props.submittedSearch}` !== "") {
      const databasePromise = new Promise((resolve, reject) => {
        API.getDatabasePlants(`${props.submittedSearch}`).then(result => {
          console.log("database promise")
          console.log(result)

          if (result.data.name === "MongoError") {
            setPlantsInDatabase([])
            resolve([])
          } else {
            setPlantsInDatabase([])
            resolve(result.data);
          }
        }).catch(err => reject(err));
      })



      const treflePromise = new Promise((resolve, reject) => {
        const trefleToken = TokenExpiry.getLocalExpiry("trefleToken");

        const trefleResults = new Promise((resolve, reject) =>{
          if (!trefleToken) {
          API.getToken().then(result => {
            // console.log("double api")
            TokenExpiry.setLocalExpiry("trefleToken", result.data.token)
            resolve(API.getSearchedPlants(`${props.submittedSearch}`, result.data.token, page))
          }, err => reject(err))
        } else {
          resolve(API.getSearchedPlants(`${props.submittedSearch}`, trefleToken, page))
        }
        })
        

        trefleResults.then(result => {
          // console.log("trefle promise")
          if (page > 1 && result.data.name === "Error") {
            setPlantsInTrefle([]);
            resolve([]);
            // console.log("No more plants to be found")
          } else {
            setPlantsInTrefle(result.data);
            resolve(result.data);
          }
        }).catch(err => {
          // console.log(err)
          if (page > 1 && err.error === true) {
            setPlantsInTrefle([]);
            resolve([])
            // console.log("No more plants to be found")
          }else {
            reject(err)
          }
        });
      })

      const userPromise = new Promise((resolve, reject) => {
        const userID = localStorage.getItem("id");
        if(!userID) resolve(null)
        API.getUser(userID).then(result => {
          // console.log("user promise")
          if (userID && result.data.myPlants.length !==0) {
            const myPlantSlugs = result.data.myPlants.map(element => element.slug);
            // console.log(myPlantSlugs)
            resolve(myPlantSlugs);
          } else resolve([]);

        }, err => resolve([]))
      })


      Promise.all([databasePromise, treflePromise, userPromise]).then(result => {
          console.log(result)
          filterTrefle(databasePromise, treflePromise, userPromise)
        }, err => console.log(err)).catch(err=>{
          console.log(err)})
    }
  }, [props.submittedSearch, page])


  //Filters out from Trefle all the plants currently in the database.  Needs some complicated promise stuff to make it happen in a way that isn't an infinite loop
  function filterTrefle(database, trefle, user) {
    database.then(databaseData => {
      trefle.then(trefleData => {
        if (databaseData) {
          console.log(databaseData)
          let databaseSlugs = databaseData.map(element => element.slug);
          console.log(databaseSlugs);
          const newPlants = trefleData.filter(element => !(databaseSlugs.includes(element.slug)))
          console.log(newPlants)
          setPlantsInTrefle(newPlants)

          user.then(userData => {
            if(userData) {

              for (let i = 0; i < databaseData.length; i++) {
                const element = databaseData[i];
                if (userData.includes(element.slug)) {
                  element.favorite = true;
                } else {
                  element.favorite = false;
                }
              }
            }
            setPlantsInDatabase(databaseData)
            console.log("all done!")
          }, err =>{
            console.log(err)
          })
        }
      })
    })

  }

  function addFavorite(slug, plantId, userId, token) {
    if (plantId) {
      API.favoritePlant(plantId, userId)
        .then(result => {
          console.log(result)
        },
          err => console.log(err))
    } else {
      API.getNewPlant(slug, token)
        .then(result => {
          API.favoritePlant(result.data._id,userId)
          .then(result => {
            console.log(result)
          })
        }, err => console.log(err))

    }

  }

  const newPlantInDatabase = function (slug, token) {
    console.log(token)
    API.getNewPlant(slug, token)
      .then(result => {
        console.log(result)
        history.push("/plant/" + result.data.slug)
      }, err => console.log(err))
  }

  const classes = useStyles();


  return (
    // <React.Fragment className={classes.root}>
    <div className={classes.root}>
      <Grid container display="flex" justify='center' alignContent="center" 
      // flexDirection="row" 
      // flexWrap="wrap" 
      // alignContent="flex-start" 
      // p={1} m={1}
      >
      {plantsInDatabase.length === 0 ? <h2>no plants found</h2> : <h2>plants found</h2>}
        <Grid container justify="center" style={{height:500, overflowY:'auto'}}>
          {/* Section with plants already in our database */}
          {/* {console.log(plantsInDatabase)} */}
          {Array.isArray(plantsInDatabase) ? _.chunk(plantsInDatabase,2).map(elements => (
            <Grid key={elements[0]._id} item>
            <PlantSearchCard
              data={elements[0]}
              key={elements[0].slug}
              newPlantInDatabase={newPlantInDatabase}
              inDatabase={true}
              addFavorite={addFavorite} />
            {elements[1] && <PlantSearchCard
              data={elements[1]}
              key={elements[1].slug}
              newPlantInDatabase={newPlantInDatabase}
              inDatabase={true}
              addFavorite={addFavorite} />}
              </Grid>
          )) : ""
          }
          {plantsInTrefle.length === 0 && page > 1 ? <p> No more plants, please return to previous </p> : _.chunk(plantsInTrefle,2).map(elements => (
            <Grid key={elements[0]._id} item>
            <PlantSearchCard
              data={elements[0]}
              key={elements[0].slug}
              newPlantInDatabase={newPlantInDatabase}
              inDatabase={false}
              addFavorite={addFavorite} />
            {elements[1] && <PlantSearchCard
              data={elements[1]}
              key={elements[1].slug}
              newPlantInDatabase={newPlantInDatabase}
              inDatabase={false}
              addFavorite={addFavorite} />}
              </Grid>
          ))}
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
    {/* </React.Fragment> */}
    </div>
  )
}
