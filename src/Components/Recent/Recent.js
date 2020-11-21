import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 200,
  },
});

export default function RecentCard(props) {
  const classes = useStyles();

  const renderButtons = () => {
    let isMyPlant = props.isMyPlant;
    if (isMyPlant == true) {
      return (
        <CardActions>
        <Button size="small" color="primary" onClick={()=>props.removePlant(props._id)}>
              Remove
            </Button>

      <Button
      component={RouterLink}
      to={"/plant/" + props.slug}
      size="small"
      color="primary"
        >
      Learn More
      </Button>
      </CardActions>
      )} else {
        return (
          <CardActions>
            <Button
            component={RouterLink}
            to={"/plant/" + props.slug}
            size="small"
            fullWidth
            color="primary"
          >
            Learn More
          </Button>
        </CardActions>
          )
      }
       
    }

  return (
    <React.Fragment>
      <Box p={1} m={1} flexShrink={1} boxShadow={3} style={{ background: 'white', width: "90%" }}>
        <Card className={classes.root} style={{  margin: "5vh" }}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              id={props._id}
              image={props.image_url}
              title={props.common_name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.common_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.info}
              </Typography>
            </CardContent>
          </CardActionArea>
          {renderButtons()}
        </Card>
      </Box>
    </React.Fragment>
  );
}
