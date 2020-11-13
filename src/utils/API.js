import axios from "axios";

const API = {
    getToken: function () {
        return axios.post("http://localhost:3001/token")
    },
    getDatabasePlants: function (query) {
        return axios.get("http://localhost:3001/plants/search/"+query)
    },
    getSearchedPlants: function (query, userToken) {
        return axios.get("http://localhost:3001/api/search/"+query+"/"+ userToken)
    },
    getUser: function(query) {
        return axios.get("http://localhost:3001/user/"+query)
    }
}

export default API;