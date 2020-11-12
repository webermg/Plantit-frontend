import React, { Component } from "react";
import "../Home/Home.css";
import Search2 from "../../Search/Search2";
import RecentCard from "../../Recent/Recent";
import plants from "../../../plantArray.json";

class Home extends Component {
  
    state = {
    plants
  };

  removePLant = id => {
      const plants = this.state.plants.filter(plant => plant.id !== id);
      this.setState({plants})
  }

  render() {
    return (
      <div>
        <Search2 />
        <h2>Home</h2>
        {this.state.plants.map(plant => (
          <RecentCard
            id={plant.id}
            name={plant.name}
            info={plant.info}
            image={plant.image}
          />
        ))}
      </div>
    );
  }
}

export default Home;
