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


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
  },
}));

export default function PlantDet() {
  const [plantDetails, setPlantDetails] = useState([])
    const [comments, setComments] = useState([])
    const [reset, setReset] = useState(true)
    const { slug } = useParams();

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

        setReset(!reset)
    }
    
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid item xs={6}>
      <Card className={classes.root} style={{ height: "100vh", margin: "5vh" }}>
        <CardActionArea>
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
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
      <Grid item xs={6}>
      <Card className={classes.root} style={{ height: "100vh", margin: "5vh" }}>
      <img src={plantDetails.image_url} />
      </Card>
      </Grid>
      <div>
        <div className={classes.root} style={{ margin: "5vh" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <h4>Comments: </h4>
            <p>
              DEFAULT: NO COMMENTS HAVE BEEN MADE
              Lots of words go here isn't that great. Lets do even more words
              for fun. What if I'm crazy and i don't stop. At what point will
              the words wrap for me this is going on and on. When the time is right the comment map will be here and all will be well.
            </p>
          {comments.map((comment) => {
            return (

              <Comment
                variant="p"
                comment={comment.commentText}
                user={comment.userId.email}
                key={comment._id}
              />
            );
          })}
          </Typography>
        </div>
      </div>
    </Container>
  );
}
