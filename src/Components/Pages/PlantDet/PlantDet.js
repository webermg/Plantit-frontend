import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import { makeStyles } from "@material-ui/core/styles";
import PlantSearchCard from "../../PlantSearchCard/PlantSearchCard";
import Comment from "../../Comment/Comment";
import { useParams } from "react-router-dom";
import Recent from "../../Recent/Recent";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

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
  const [plantDetails, setPlantDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [reset, setReset] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    // ID is now SLUG in the get route, currently hardcoded
    API.getPlantID(`2`)
      .then((result) => {
        console.log(result.data);
        setPlantDetails(result.data.dbPlant);
        setComments(result.data.dbComment);
      })
      .catch((err) => console.log(err));

    // getPlantProfile(id)
  }, [reset]);

  // const getPlantProfile = (id) => {
  //     API.getPlantID(`${id}`)
  //         .then(result => {
  //             console.log(result.data)
  //             setPlantDetails(result.data.dbPlant)
  //             setComments(result.data.dbComment)
  //         }).catch(err => console.log(err))
  // }

  //This resets the page when a new comment is added
  const newComment = function () {
    setReset(!reset);
  };

  return (
    <div className={classes.root}>
      {/* AMG- Plant search card is for displaying "quick results"--just name, slug, image etc--and meant for the search page.  Still pretty good for testing purposes here! I had to change a lot of stuff in the plantsearchcard due to actually getting data from trefle, so what you had here broke :(*/}
      {/* <PlantSearchCard
            data={plantDetails}
            /> */}
      <Card className={classes.root} style={{ height: "100vh", margin: "5vh" }}>
        <CardActionArea>
          <CardContent>
            <Typography
              fontWeight="bold"
              gutterBottom
              variant="h5"
              component="h2"
            >
              <h1>Common Name: {plantDetails.common_name}</h1>
              <h3>Scientific Name: {plantDetails.scientific_name}</h3>
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <h4>Native Areas: {plantDetails.native} </h4>
            </Typography>
            <Typography>
              <img src={"https://placekitten.com/g/200/300"} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <div>
        <div className={classes.root} style={{ margin: "5vh" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <h4>Comments: {plantDetails.native}</h4>
            <p>
              DEFAULT: NO COMMENTS HAVE BEEN MADE
              Lots of words go here isn't that great. Lets do even more words
              for fun. What if I'm crazy and i don't stop. At what point will
              the words wrap for me this is going on and on.
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
    </div>
  );
}
