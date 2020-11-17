import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';

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

  return (
    <Box p={1} m={1} flexShrink={1} boxShadow={3} style={{ width: '90%' }}>
    <Card className={classes.root} style={{margin: "5vh"}}>
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
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Button component={RouterLink} to={'/plant/:slug'} size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    </Box>
  );
}

