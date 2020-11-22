import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import { makeStyles } from "@material-ui/core/styles";
import Comment from "../../Comment/Comment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Checkbox, FormControlLabel, FormGroup, FormLabel, Hidden, Slider } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BackButton from "../../BackButton/BackButton";
import PlantDetModal from "../../PlantDetModal/PlantDetModal";
import CardMedia from "@material-ui/core/CardMedia";
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
    action: {
      disabled: {
        light: '#c88f76',
        main: '#bb7354',
        dark: '#82503a',
        contrastText: '#fff',
      },
    },
    
  }
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",

  },
  root2: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

  root3: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
    background: '#cac5b9'
  },
  input: {
    background: 'white',

  },
  thumb:{
    backgroundColor: '#614051',
    },
  button: {
    margin: theme.spacing(1),
    
  },
  Card: {
    width: 300,
    margin: 'auto'
  },
  img: {
    height: '100%',
    width: '100%'
  }
}));

export default function PlantDet() {
  const [plantDetails, setPlantDetails] = useState([])
  const [comments, setComments] = useState([])
  const [reset, setReset] = useState(true)
  const { slug } = useParams();
  const classes = useStyles();
  const [value, setValue] = useState();
  const [update, setUpdate] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [months, setMonths] = useState({
    Jan: false,
    Feb: false,
    Mar: false,
    Apr: false,
    May: false,
    Jun: false,
    Jul: false,
    Aug: false,
    Sep: false,
    Oct: false,
    Nov: false,
    Dec: false

  })

  useEffect(() => {
    API.getPlantID(slug)
      .then(result => {
        setPlantDetails(result.data.dbPlant)
        setComments(result.data.dbComment)

        if (result.data.dbComment.length === 0) {
          setOpen(true)
          setUpdate({ ...update, ...result.data.dbPlant })
          if (result.data.dbPlant.growth_months && result.data.dbPlant.growth_months.length > 0) {
            const monthList = {
              Jan: false,
              Feb: false,
              Mar: false,
              Apr: false,
              May: false,
              Jun: false,
              Jul: false,
              Aug: false,
              Sep: false,
              Oct: false,
              Nov: false,
              Dec: false
            }
            result.data.dbPlant.growth_months.forEach(element => {
              monthList[element] = true
            });
            setMonths(monthList)
          }
        }


        if(localStorage.getItem("id")) {
      API.getMyPlants(localStorage.getItem("id"))
      .then(myplants =>{
        const mySlugs = myplants.data.map(element => element.slug)
        if(mySlugs.includes(result.data.dbPlant.slug)){
          setIsFavorite(true)

              }
            })

        }
      }).catch(err => console.log(err))

  }, [reset])

  function makeFavorite() {

    API.favoritePlant(plantDetails._id, localStorage.getItem("id"))
      .then(result => {
        setIsFavorite(true)
      },
        err => console.log(err))
  }

  const handleCommentChange = (event) => {
    setValue(event.target.value);
  };

  const handleUpdateChange = (event) => {
    let { name, value } = event.target
    setUpdate({ ...update, [name]: value });
  }

  const handleSliderChange = (name, value) => {
    setUpdate({ ...update, [name]: value });
  }

  const handleMonthChange = (event) => {
    setMonths({ ...months, [event.target.name]: event.target.checked })
  }

  const handleUpdateSubmit = () => {
    const growth_months = [];
    for (const month in months) {
      if (months[month] === true) {
        growth_months.push(month);
      }
    }
    API.updatePlant(plantDetails._id, update, growth_months)
      .then(result => {
        if(localStorage.getItem("id")) {
          API.makeComment(plantDetails._id,localStorage.getItem("id"), "Initial review completed!")
          .then(commentResult => {
            setReset(!reset)
            setUpdate(false)
          })
        }
        else {
          API.makeComment(plantDetails._id,"5fb83d88db974b470c3395e4", "Initial review completed!")
          .then(commentResult => {
            setReset(!reset)
            setUpdate(false)
          })
        }

      })
  }

  //This resets the page when a new comment is added
  const newComment = function () {
    API.makeComment(plantDetails._id, localStorage.getItem("id"), value)
      .then(result => {
        console.log(result)
        setValue("")
        setReset(!reset)
      })
  }

  const handleClose = () => {
    setOpen(false);
  };



  if (plantDetails.length === 0) {
    return (
      <Grid container style={{ background: '#005254' }}>
        <Typography
          className={"MuiTypography--heading"}
          variant={"h3"}
          fontWeight="bold"
          component="h4"
          align="center"
          style={{ color: "#a9a9a9", margin: "2%" }}
        >loading
      </Typography>
      </Grid>)
  }




  return (
<MuiThemeProvider theme={theme}>
    
    <React.Fragment>
      <PlantDetModal 
      open={open}
      handleClose={handleClose}
       />
      <Grid container mx="auto" className={classes.root} style={{ background: '#005254', justifyContent: 'center', margin: 'auto' }}>
        {/* Header title and button */}
        <Grid container >
          <Grid item xs={12}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h3"}
              fontWeight="bold"
              component="h1"
              align="center"
              style={{ color: "#a9a9a9", marginTop: "2%", marginLeft: "2%" }}
            >
              Plant Details
          </Typography>
            </Grid>
            <Grid item xs={12} mx="auto" style={{ marginTop: ".5%", marginLeft: '2%' }} >
              <BackButton />
            </Grid>
          </Grid>
          <Grid item xs={12} mx="auto" style={{ marginTop: ".5%", marginLeft: '2%' }} >
            <BackButton />
          </Grid>
        </Grid>

          {/* Plant DetailsCard */}
          <Grid container style={{ background: '#005254', padding: '1%' }}>
            <Card style={{ background: '#cac5b9' }}>

              {/* Plant Det Head with Pic */}
              <Grid container>
                <Grid item sm={12} md={6} >
                  <CardContent style={{ margin: "5vh" }}>
                    <Grid container >
                      <Grid item xs={10}>
                        <Typography
                          fontWeight="bold"
                          gutterBottom
                          variant="h3"
                          component="h1"
                        >
                          {plantDetails.common_name}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Button
                          className={classes.button1}
                          variant="contained"
                          size="small" color="primary"
                          style={{ background: '#614051' }}
                          endIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          onClick={() => makeFavorite()}
                        ><Hidden only="xs">
                            Save
                        </Hidden>
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography
                      fontWeight="bold"
                      gutterBottom
                      variant="h4"
                      component="h2">
                      Scientific Name: {plantDetails.scientific_name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      <p>Native Areas: </p>
                      <span>{plantDetails.native ? plantDetails.native.join(', ') : ""}</span>
                    </Typography>

                  <Typography gutterBottom variant="h5" component="h2">
                    Form: {update ? <TextField
                      id="outlined-static"
                      style={{ margin: 8, background: "white" }}
                      name="growth_habit"
                      label="Form"
                      defaultValue={update.growth_habit}
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleUpdateChange}
                    /> : plantDetails.growth_habit}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item sm={12} md={6} >
                <CardMedia style={{ margin: "5vh" }}>
                  <img src={plantDetails.image_url} style={{ height: 500, width: '100%', objectfit: 'cover' }} />
                </CardMedia>
                </Grid>

              </Grid>

              {/*Form and Saved info  */}
              <Grid container >

                {/* Left side of the form/info */}
                <Grid item sm={12} md={6}>
                  <CardContent style={{ marginLeft: "5vh" }}>
                    <Grid container>

                      {/* Month Selection or Month List */}
                      <Grid item>
                        {update ?
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup>
                              <FormLabel component="legend">Growth Months (check all that apply)</FormLabel>
                              <Grid item xs>
                                <FormControlLabel control={<Checkbox checked={months.Jan} onChange={handleMonthChange} name="Jan" />} label="Jan" />
                                <FormControlLabel control={<Checkbox checked={months.Feb} onChange={handleMonthChange} name="Feb" />} label="Feb" />
                                <FormControlLabel control={<Checkbox checked={months.Mar} onChange={handleMonthChange} name="Mar" />} label="Mar" />
                                <FormControlLabel control={<Checkbox checked={months.Apr} onChange={handleMonthChange} name="Apr" />} label="Apr" />
                              </Grid>
                              <Grid item xs >
                                <FormControlLabel control={<Checkbox checked={months.May} onChange={handleMonthChange} name="May" />} label="May" />
                                <FormControlLabel control={<Checkbox checked={months.Jun} onChange={handleMonthChange} name="Jun" />} label="Jun" />
                                <FormControlLabel control={<Checkbox checked={months.Jul} onChange={handleMonthChange} name="Jul" />} label="Jul" />
                                <FormControlLabel control={<Checkbox checked={months.Aug} onChange={handleMonthChange} name="Aug" />} label="Aug" />
                              </Grid>
                              <Grid item xs >
                                <FormControlLabel control={<Checkbox checked={months.Sep} onChange={handleMonthChange} name="Sep" />} label="Sep" />
                                <FormControlLabel control={<Checkbox checked={months.Oct} onChange={handleMonthChange} name="Oct" />} label="Oct" />
                                <FormControlLabel control={<Checkbox checked={months.Nov} onChange={handleMonthChange} name="Nov" />} label="Nov" />
                                <FormControlLabel control={<Checkbox checked={months.Dec} onChange={handleMonthChange} name="Dec" />} label="Dec" />
                              </Grid>
                            </FormGroup>
                          </FormControl>
                          :
                          <Grid item>
                            <Typography gutterBottom variant="h5" component="h2">
                              <p>Growing months:{plantDetails.growth_months} </p>
                            </Typography>
                          </Grid>}
                      </Grid>
                    </Grid>

                    {/* Watering */}
                    <Grid item >
                      <Typography gutterBottom variant="h5" component="h2">
                        Watering (mm): {update ? <React.Fragment>
                          <TextField
                            label="Min"
                            style={{ margin: 8, width: '8ch' }}
                            name="watering_min"
                            defaultValue={update.watering_min}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                              className: classes.input
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleUpdateChange}
                          />

                        <TextField
                          label="Max"
                          style={{ margin: 8, width: '8ch' }}
                          name="watering_max"
                          defaultValue={update.watering_max}
                          variant="outlined"
                          margin="normal"
                          InputProps={{
                            className: classes.input
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleUpdateChange}
                        />
                      </React.Fragment> : (plantDetails.watering_min + " - " + plantDetails.watering_max + " mm")}
                    </Typography>
                  </Grid>

                    {/* Temperature */}
                    <Grid item >
                      <Typography gutterBottom variant="h5" component="h2">
                        Temperature (°F): {update ? <React.Fragment>
                          <TextField
                            label="Min"
                            style={{ margin: 8, width: '8ch' }}
                            name="temperature_min"
                            defaultValue={update.temperature_min}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                              className: classes.input
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleUpdateChange}
                          />

                          <TextField
                            label="Max"
                            style={{ margin: 8, width: '8ch' }}
                            name="temperature_max"
                            defaultValue={update.temperature_max}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                              className: classes.input
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleUpdateChange}
                          />
                        </React.Fragment> : (plantDetails.temperature_min + "-" + plantDetails.temperature_max + " °F")}
                      </Typography>
                    </Grid>

                    {/* Poisonous */}
                    <Grid item >
                      <Typography gutterBottom variant="h5" component="h2">
                        Poisonous: {update ? <TextField
                          style={{ margin: 8 }}
                          name="toxicity"
                          variant="outlined"
                          defaultValue={update.toxicity}
                          margin="normal"
                          InputProps={{
                            className: classes.input
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleUpdateChange}
                        /> : plantDetails.toxicity}
                      </Typography>
                    </Grid>

                    {/* Cultivation */}
                    <Grid item >
                      <Typography gutterBottom variant="h5" component="h2">
                        Cultivation details: {update ? <TextField
                          style={{ margin: 8 }}
                          name="growth"
                          variant="outlined"
                          fullWidth
                          defaultValue={update.growth}
                          margin="normal"
                          InputProps={{
                            className: classes.input
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleUpdateChange}
                        /> : plantDetails.growth}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Grid>


                {/* Right Side of the Form */}
                <Grid item sm={12} md={6}>
                  <CardContent style={{ marginLeft: "5vh" }}>
                    <Grid container>

                      {/* Light Req */}
                      <Grid item >
                        <Typography gutterBottom variant="h5" component="h2">
                          Light Requirement (low to high): {update.light} {update ? <Slider
                            key={`slider-${update.light}`}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            defaultValue={update.light ? update.light : plantDetails.light}
                            step={1}
                            marks
                            min={1}
                            max={10}
                            name="light"
                            onChangeCommitted={(event, value) => handleSliderChange("light", value)}
                          /> : <Slider
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="auto"
                              defaultValue={plantDetails.light ? plantDetails.light : 1}
                              step={1}
                              marks
                              min={1}
                              max={10}
                              aria-label="light"
                              className={classes.thumb}
                              disabled
                              color="secondary"
                            />}
                        </Typography>
                      </Grid>

                      {/* Soil Preferences */}
                      <Grid item >
                        <Typography gutterBottom variant="h5" component="h2">
                          <p>Soil Preferences:</p>
                          <ul>
                            <li>  PH Restrictions: {update ? <React.Fragment>
                              <TextField
                                label="Min"
                                style={{ margin: 8, width: '8ch' }}
                                name="ph_min"
                                defaultValue={update.ph_min}
                                variant="outlined"
                                margin="normal"
                                InputProps={{
                                  className: classes.input
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handleUpdateChange}
                              />

                              <TextField
                                label="Max"
                                style={{ margin: 8, width: '8ch' }}
                                name="ph_max"
                                defaultValue={update.ph_max}
                                variant="outlined"
                                margin="normal"
                                InputProps={{
                                  className: classes.input
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handleUpdateChange}
                              />
                            </React.Fragment> : (plantDetails.ph_min + "-" + plantDetails.ph_max)}</li>

                            <li> Soil Nutriments: {update ?
                              <Slider
                                aria-labelledby="discrete-slider"
                                key={`slider-${update.soil_nutriments}`}
                                valueLabelDisplay="auto"
                                defaultValue={update.soil_nutriments ? update.soil_nutriments : plantDetails.soil_nutriments}
                                step={1}
                                marks
                                min={1}
                                max={10}
                                aria-label="soil_nutriments"
                                onChangeCommitted={(event, value) => handleSliderChange("soil_nutriments", value)}
                              />
                              : <Slider
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                value={plantDetails.soil_nutriments}
                                step={1}
                                marks
                                min={1}
                                max={10}
                                aria-label="soil_nutriments"
                                disabled
                                className={classes.thumb}
                              />} </li>

                            <li> Soil texture: {update ?
                              <Slider
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                key={`slider-${update.soil_texture}`}
                                defaultValue={update.soil_texture ? update.soil_texture : plantDetails.soil_texture}
                                step={1}
                                marks
                                min={1}
                                max={10}
                                aria-label="soil_texture"
                                onChangeCommitted={(event, value) => handleSliderChange("soil_texture", value)}
                              />
                              : <Slider
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                defaultValue={plantDetails.soil_texture}
                                step={1}
                                marks
                                min={1}
                                max={10}
                                aria-label="soil_texture"
                                disabled
                                className={classes.thumb}
                              />} </li>
                            <li> Sowing Description: {update ? <TextField
                              style={{ margin: 8 }}
                              name="sowing"
                              defaultValue={update.sowing}
                              variant="outlined"
                              margin="normal"
                              InputProps={{
                                className: classes.input
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={handleUpdateChange}
                            /> : plantDetails.sowing} </li>
                          </ul>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>

              {/* Submit button */}
              {update ? <Grid container>
                <Grid item xs={12} s={6}>
                  <CardContent style={{ marginLeft: "5vh" }}>
                    <Grid item style={{ justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        size="large"
                        color='secondary'
                        className={classes.margin}
                        onClick={handleUpdateSubmit}>
                        Submit
                  </Button>
                    </Grid>
                  </CardContent>
                </Grid>
                </Grid> : null }

              {/* Comment Section */}
              <div>
                <div className={classes.root} style={{ margin: "5vh" }}>
                  <Typography gutterBottom variant="h5" component="h2" style={{ background: '#cac5b9' }}>
                    <div className={classes.root2}>
                      {!(JSON.parse(localStorage.getItem("isLoggedIn"))) ? <form
                        className={classes.root3}
                        onSubmit={newComment}
                        noValidate autoComplete="off">
                        <FormControl className={classes.formControl}>
                          <TextField
                            disabled
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            rows={4}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                              className: classes.input
                            }}
                            defaultValue={"Please log in to add a comment."}
                          />
                          <Button
                            className={classes.button}
                            disabled
                            variant="contained"
                            size="small" color="primary"
                            endIcon={<PostAddIcon />}
                          >
                            <Hidden only="xs">
                              Add Comment
                      </Hidden>
                          </Button>
                        </FormControl>
                      </form>
                        :
                        <form
                          className={classes.root3}
                          onSubmit={newComment}
                          noValidate autoComplete="off">
                          <FormControl className={classes.formControl}>
                            <TextField
                              id="outlined-multiline-static"
                              label="Comment"
                              multiline
                              rows={4}
                              variant="outlined"
                              InputProps={{
                                className: classes.input
                              }}
                              value={value}
                              onChange={handleCommentChange}
                            />
                            <Button
                              className={classes.button}
                              variant="contained"
                              size="small" color="secondary"
                              endIcon={<PostAddIcon />}
                              onClick={newComment}
                            >
                              <Hidden only="xs">
                                Add Comment
                      </Hidden>
                            </Button>
                          </FormControl>
                        </form>}

                    </div >


                    <h4>Comments: </h4>

                    {comments.map((comment) => {
                      return (

                        <Comment
                          variant="p"
                          comment={comment.commentText}
                          user={comment.userId.username}
                          commentId={comment._id}
                          key={comment._id}
                          userId={comment.userId._id}
                          viewerId={localStorage.getItem("id")}
                        />
                      );
                    })}
                  </Typography>
                </div>
              </div>

            </Card>
        </Grid >
      </React.Fragment >
    </MuiThemeProvider>
  );
}
