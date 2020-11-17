import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Hidden } from "@material-ui/core";



const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 250,
    },
    button1: {
        backgroundColor: '#b1bb78'
    }
});



//A simple card that displays possible results to choose from either our database or trefle API results.
export default function PlantSearchCard(props) {
    const history = useHistory();
    const classes = useStyles();
    if ("data" in props) {

        return (
            <Box p={1} m={1} flexShrink={1} boxShadow={3} style={{ width: '90%' }}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.data.image_url}
                        title={"Identifying image of " + props.data.common_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.data.common_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                           {props.data.scientific_name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button   
                    className={classes.button1} 
                    variant="contained" 
                    size="small" color="primary" 
                    endIcon={<FavoriteBorderIcon/>}
                    onClick={() => {
                        props.addFavorite(props.data._id,"5fb4071f8bf9f556f0192391")
                    }}
                    ><Hidden only="xs">
                        Save this plant!
                        </Hidden>
                    </Button>
                    <Button   
                    className={classes.button} 
                    size="small" 
                    color="primary"
                    onClick={() => props.inDatabase ? history.push("/plant/"+props.data.slug): props.newPlantInDatabase(props.data.slug, props.usertoken)}
                    >
                        Learn More
                    </Button>
                </CardActions>
            </Card>
            </Box>
        )
    }
    else return (
        <div></div>
    )
}


