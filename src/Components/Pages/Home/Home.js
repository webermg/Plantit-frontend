import React from 'react'
import '../Home/Home.css'
import Search2 from "../../Search/Search2"
import Results from '../../Results/Results'
import GetToken from '../../../utils/GetToken'

export default function Home() {
    return (
        <div>
            <Search2/>
            <h2>Home</h2>
            <Results/>
        </div>
    )
}
