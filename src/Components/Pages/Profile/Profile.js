import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import API from "../../../utils/API";
import { result } from 'lodash';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    }
});


export default class profile extends Component {

    componentDidMount() {
        const userID = localStorage.getItem("id")
        API.getUser(userID)
        .then(result => {
          console.log(result.data)
          this.setState({plants: result.data.myPlants})
        })
      }
    render() {
        const classes = useStyles
        return (
            <div>
                Welcome, User
                {this.state.plants.map((plant) => (
            <Grid item xs={4}>
              <RecentCard
                _id={plant._id}
                common_name={plant.common_name}
                slug={plant.slug}
                // wateringMin={plant.watering[0]}
                // wateringMax={plant.watering[1]}
                image_url={plant.image_url}
              />
         
        </Grid>
          ))}
                {/* {result.data.username}! */}
                {/* {userID.email} */}
            </div>
        )
    }
}
