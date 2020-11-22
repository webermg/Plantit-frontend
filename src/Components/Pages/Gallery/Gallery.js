import { Container } from '@material-ui/core'
import React from 'react'
import '../MyGarden/MyGarden.css'
import API from '../../../utils/API'
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardMedia, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    minWidth: 400
  },
  media: {
    
    height: 400,
    width: 400,
    objectFit: 'cover'
  },
});

export default function Gallery() {
  const classes = useStyles();
  const [gardens, setGardens] = React.useState(null)

  React.useEffect(() => {
    API.getGardenImgs().then(res => setGardens(res.data.filter(garden=>garden.myGardenImg!==""))).catch(err => console.log(err))
    
  }, [])

  if (gardens === null) return <h1>loading...</h1>

  return (
    <Container style={{ marginBottom: '20px' }}>
      <Typography
              className={"MuiTypography--heading"}
              variant={"h3"}
              fontWeight="bold"
              component="h4"
              align="center"
              style={{ color: "#a9a9a9", marginTop: "2%", marginLeft: "2%" }}
            >
              Gallery
          </Typography>
      <Grid container spacing={1} justify='space-evenly'>
      {gardens.map((garden,i) =>
        <Grid key={i} item xs={12} sm={6} md={4}>
          <Card className={classes.card}>

          <CardMedia
            className={classes.media}
            image={garden.myGardenImg}
            title={garden.username+"'s garden"}
          />
          <CardContent>
            <Typography gutterBottom align='center' variant="h5" component="h2">
              {garden.username}
            </Typography>

          </CardContent>


        </Card>
        </Grid>)}
        </Grid>
    </Container>)
}