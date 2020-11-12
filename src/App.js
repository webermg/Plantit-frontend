import './App.css';
import NavBar from "./Components/Navbar/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from '../src/Components/Pages/Home/Home';
import MyGarden from '../src/Components/Pages/MyGarden/MyGarden';
import MyPlant from '../src/Components/Pages/MyPlant/MyPlant';
import PlantDet from '../src/Components/Pages/PlantDet/PlantDet';




function App() {
  return (
    <Router>
      <NavBar/>
      <Switch/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/mygarden" component={MyGarden}/>
      <Route exact path="/myplant" component={MyPlant}/>
      <Route exact path="/plantdet" component={PlantDet}/>
    </Router>
  );
}

export default App;
