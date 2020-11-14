import React from 'react'

export default function PlantSearchCard(props) {
    if("data" in props) {

        return (
            <div>
                <h3>{props.data.common_name}</h3>
                <p>{props.data.scientific_name}</p>
                <img src={props.data.image_url} alt={"Identifying image of " + props.data.common_name}/>
                <br/>
                <button onClick={() => props.newPlantInDatabase(props.data.slug, props.usertoken)}>Choose this plant!</button>
            </div>
        )
    }
    else return(
        <div></div>
    )
}
