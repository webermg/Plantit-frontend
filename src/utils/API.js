import axios from "axios";

const URL_BASE = "http://localhost:3001/"
// const URL_BASE = "https://plantit-server.herokuapp.com/"

const API = {
    getToken: function () {
        return axios.post(URL_BASE + "token")
    },
    getDatabasePlants: function (query) {
        return axios.get(URL_BASE + "plants/search/" + query)
    },
    getUser: function (query) {
        return axios.get(URL_BASE + "user/" + query)
    },
    updateUserGarden: function (query, data) {
        return axios.put(URL_BASE + "user/" + query + '/garden',{
            myGarden:data.myGarden,
            myGardenImg:data.myGardenImg
        })
    },
    getPlantID: function (slug) {
        return axios.get(URL_BASE + "plant/" + slug)
    },
    getSearchedPlants: function (query, userToken, page) {
        return axios.get(URL_BASE + "api/search/" + query + "/" + userToken + "/" + page)
    },
    getNewPlant: function (slug, usertoken) {
        return axios.post(URL_BASE + "api/slug/" + slug + "/" + usertoken)
    },

    login: function (formData) {
        return axios.post(URL_BASE + "login", formData)
    },

    signup: function (formData) {
        return axios.post(URL_BASE + "user", formData)
    },

    getFeaturedPlants: function () {
        return axios.get(URL_BASE + "findByComments")
    },

    favoritePlant: function (plantId, userId) {
        return axios.post(URL_BASE + "myplants/create", {
            plantId: plantId,
            userId: userId,
        })
    },
    makeComment: function (plantId, userId,commentText) {
        return axios.post(URL_BASE + "comment", {
            plantId: plantId,
            userId: userId,
            commentText: commentText
        })
    },

}

export default API;