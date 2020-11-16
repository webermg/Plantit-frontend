import React, { useEffect, useState } from 'react'
import API from '../../../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import Comment from '../../Comment/Comment'
import { useParams } from 'react-router-dom';

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
    const [reset, setReset] = useState(true)
    const {slug} = useParams();

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

    return (
        <div className='classes.root'>
            {/* AMG- Plant search card is for displaying "quick results"--just name, slug, image etc--and meant for the search page.  Still pretty good for testing purposes here! I had to change a lot of stuff in the plantsearchcard due to actually getting data from trefle, so what you had here broke :(*/}
            {/* <PlantSearchCard
            data={plantDetails}
            /> */}

            <h1>{plantDetails.common_name}</h1>
            <h3>{plantDetails.scientific_name} </h3>
            <img src={plantDetails.image_url} />
            <br />
            <h4>Native in: {plantDetails.native}</h4>
            <h2>Comments</h2>

            {comments.map(comment => {
                return <Comment
                    comment={comment.commentText}
                    user={comment.userId.email}
                    key= {comment._id}
                />

            })}




        </div>
    )
}
