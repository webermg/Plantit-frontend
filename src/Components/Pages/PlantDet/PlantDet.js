import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import { makeStyles } from "@material-ui/core/styles";
import Comment from "../../Comment/Comment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useParams } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Hidden } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",

  },
  root2: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
  },

  root3: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  input: {
    background: 'white'
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#b1bb78",
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
  const [value, setValue] = React.useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    // ID is now SLUG in the get route, currently hardcoded
    API.getPlantID(slug)
      .then(result => {
        console.log(result.data)
        setPlantDetails(result.data.dbPlant)
        setComments(result.data.dbComment)
      }).catch(err => console.log(err))

    // getPlantProfile(id)

  }, [reset])

  //This resets the page when a new comment is added
  const newComment = function () {
    API.makeComment(plantDetails._id, localStorage.getItem("id"), value)
      .then(result => {
        console.log(result)
        setReset(!reset)
      })

  }


  return (
    <Container className={classes.root}>
      {console.log(comments)}
      {/* <Grid style ={{background:'#cac5b9'}}> */}
      {/* <Paper className={classes.paper} style={{background: '#cac5b9'}}> */}
      <Grid item sm={12} md={6} style={{ background: '#cac5b9' }}>
        <Card className={classes.root} style={{ margin: "5vh" }}>
          <CardActionArea >
            <CardContent>
              <Typography
                fontWeight="bold"
                gutterBottom
                variant="h5"
                component="h2"
              >
                <h1>{plantDetails.common_name}</h1>
                <h3>Scientific Name: {plantDetails.scientific_name}</h3>
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                <h4>Native Areas: </h4>
                <span>{plantDetails.native ? plantDetails.native.join(', ') : ""}</span>
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                <p>Form: {plantDetails.growth_habit} </p>
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                <p>How to grow: {plantDetails.growth} </p>
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                <p>Growing months: {plantDetails.growth_months} </p>
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                <p>Soil preferences:</p>
                <ul>
                  <li>PH restrictions:{plantDetails.ph ? plantDetails.ph[0]+"-"+plantDetails.ph[1] : "unknown"}</li>
                  {/* <li> Soil Nutriments: {plantDetails.sowing ? plantDetails.sowing[1] :} </li> */}
                </ul>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item sm={12} md={6} style={{ background: '#cac5b9' }}>
        <Card mx="auto" className={classes.root} style={{ width: 500, margin: "5vh", maxWidth: 450 }}>
          <img src={plantDetails.image_url} style={{ height: 500, width: '100%', objectfit: 'cover' }} />
        </Card>
      </Grid>
      <div>
        <div className={classes.root} style={{ margin: "5vh" }}>
          <Typography gutterBottom variant="h5" component="h2" style={{ background: '#cac5b9' }}>
            <div className={classes.root2}>
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
                    onChange={handleChange}
                  />
                  <Button
                    className={classes.button}
                    variant="contained"
                    size="small" color="primary"
                    endIcon={<PostAddIcon />}
                    onClick={newComment}
                  >
                    <Hidden only="xs">
                      Add Comment
                      </Hidden>
                  </Button>
                </FormControl>
              </form>
            </div >


            <h4>Comments: </h4>
            <p>
              DEFAULT: NO COMMENTS HAVE BEEN MADE
              Lots of words go here isn't that great. Lets do even more words
              for fun. What if I'm crazy and i don't stop. At what point will
              the words wrap for me this is going on and on. When the time is right the comment map will be here and all will be well.
            </p>
            {comments.map((comment) => {
              console.log(comment)
              return (

                <Comment
                  variant="p"
                  comment={comment.commentText}
                  user={comment.userId.username}
                  key={comment._id}
                />
              );
            })}
          </Typography>
        </div>
      </div>
      {/* </Grid> */}
      {/* </Paper> */}
    </Container>
  );
}
