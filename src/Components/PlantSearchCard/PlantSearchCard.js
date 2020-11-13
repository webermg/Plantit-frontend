import React from 'react'

export default function PlantSearchCard({data}) {
    // console.log(data)
    return (
        <div>
            <h3>{data.common_name}</h3>
            <p>{data.scientific_name}</p>
            <img src={data.image_url} alt={"Identifying image of " + data.common_name}/>
        </div>
    )
}
