import { Container } from '@material-ui/core'
import React, { Suspense } from 'react'
import Scene from '../../Planner/Scene/Scene'
import '../MyGarden/MyGarden.css'
import API from '../../../utils/API'
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";



export default function MyGarden() {
    const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            API.getUser(id).then(res => {
                setUserData(res.data);
                console.log(res)
            });
        }
        else setUserData({})
    }, [])

    if (userData === null) return <h1>loading...</h1>

    return (
        <Grid container style={{ background: '#005254' }}>
            <Typography
                className={"MuiTypography--heading"}
                variant={"h4"}
                fontWeight="bold"
                component="h4"
                align="center"
                style={{ color: "#a9a9a9", margin: "2%" }}
            >
                My Garden
        </Typography>
            <Scene userData={userData} />
        </Grid>)


}
