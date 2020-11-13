import axios from "axios";

const API = {
    getToken: function () {
        return axios.post("http://localhost:3001/token")
    },
    getDatabasePlants: function (query) {
        return axios.get("http://localhost:3001/plants/search/" + query)
    },
    getPlantID: function (id) {
        return axios.get("http://localhost:3001/plant/" + id)
    },
    getSearchedPlants: function (query, userToken, page) {
        return axios.get("http://localhost:3001/api/search/"+query+"/"+ userToken + "/" + page)
    }
}

export default API;