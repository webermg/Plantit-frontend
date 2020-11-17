import React, { useEffect, useState } from 'react'
import API from '../../../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import Comment from '../../Comment/Comment'
import { useParams } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


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
        <div className='classes.root'>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <h1>{plantDetails.common_name}</h1>
                        <h3>{plantDetails.scientific_name} </h3>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={plantDetails.image_url} />
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Native in: {plantDetails.native ? plantDetails.native.join(', ') : ""}</h4>

                    </Grid>

                </Grid>
            </Container>

            <Container maxWidth="sm">

            <h2>Comments</h2>

            {comments.map(comment => {
                return <Comment
                    comment={comment.commentText}
                    user={comment.userId.email}
                    key={comment._id}
                />

            })}
      </Container>
        </div>


    )
}
