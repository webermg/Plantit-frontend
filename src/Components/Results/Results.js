import React, { useEffect, useState } from 'react'
import API from '../../utils/API';
import PlantSearchCard from '../PlantSearchCard/PlantSearchCard';

// import PlantSearchCard from '../PlantSearchCard/PlantSearchCard';

export default function Results() {
    const [plantsInDatabase, setPlantsInDatabase] = useState([])
    const [plantsInTrefle, setPlantsInTrefle] = useState([])
    useEffect(() => {
        API.getDatabasePlants("rosemary")
            .then(result => {
                console.log(result.data)
                (Array.isArray(result)) ? setPlantsInDatabase(result.data): setPlantsInDatabase("No plants found")
                
            }).catch(err => console.log(err));

        API.getToken().then(result => {
            console.log(result.data);


            API.getSearchedPlants("rosemary", result.data.token)
                .then(result => {
                    console.log(result.data)
                    setPlantsInTrefle(result.data)
                }).catch(err => console.log(err));
        }, err => console.log(err))


    }, [])

    return (
        <div>
            {/* Section with plants already in our database */}
            {console.log(plantsInDatabase)}
            {plantsInDatabase.length===0 ? "no plants found":"plants found"}
            {plantsInDatabase.map(element => {
                
                return <PlantSearchCard data={element} key={element.scientific_name} />
            })}
            {plantsInTrefle.map(element => {
                return <PlantSearchCard data={element} key={element.scientific_name} />
            })}

            {/* Button for more plants */}
            {/* Upon button being clicked, button for more plants does an api call  */}
            {/* next and back buttons to get more results from trefle */}
        </div>
    )
}
