import { Container } from '@material-ui/core'
import React from 'react'
import Scene from '../../Planner/Scene/Scene'
import '../MyGarden/MyGarden.css'
import API from '../../../utils/API'
import Typography from '@material-ui/core/Typography';



export default function MyGarden() {
    const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            API.getUser(id).then(res => {
                setUserData(res.data);
            });
        }
        else setUserData({})
    }, [])

    if (userData === null) return <h1>loading...</h1>

    return (
        <Container fixed disableGutters style={{marginBottom: '20px'}}>
            <Typography
                className={"MuiTypography--heading"}
                variant={"h3"}
                fontWeight="bold"
                component="h4"
                align="center"
                style={{ color: "#a9a9a9", marginTop: "2%", marginLeft: "2%" }}
            >
                My Garden
        </Typography>
            <Scene userData={userData} />
        </Container>)


}
