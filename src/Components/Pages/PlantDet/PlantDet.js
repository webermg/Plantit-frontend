import React, { useEffect, useState } from 'react'
import API from '../../../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import PlantSearchCard from '../../PlantSearchCard/PlantSearchCard';

const useStyles = makeStyles((theme) => ({

    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    button: {
      margin: theme.spacing(1),
      backgroundColor: "green"
    }
  }));

export default function PlantDet() {
    const [plantDetails, setPlantDetails] = useState([])
    const [comments, setComments] = useState([])
    useEffect(() => {
        API.getPlantID("5faed93cd337fd9fc042df4c")
        .then (result => {
            console.log(result.data)
            setPlantDetails(result.data.dbPlant)
            setComments(result.data.dbComment)
        })
    })


    return (
        <div className= 'classes.root'>

            <PlantSearchCard
            data={plantDetails}


            />
            
        </div>
    )
}
