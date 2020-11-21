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
        return axios.put(URL_BASE + "user/" + query + '/garden', {
            myGarden: data.myGarden,
        })
    },
    updateUserGardenImg: function (query, data) {
        return axios.put(URL_BASE + "user/" + query + '/gardenimg', {
            myGardenImg: data.myGardenImg
        })
    },
    deleteMyPlant: function (data) {
        return axios.put(URL_BASE + "myplants/delete", {
            userID: data.userID,
            plantID: data.plantID
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
    makeComment: function (plantId, userId, commentText) {
        return axios.post(URL_BASE + "comment", {
            plantId: plantId,
            userId: userId,
            commentText: commentText
        })
    },

    editComment : function (commentId,commentUpdate) {
        return axios.put(URL_BASE + "comment/edit", {
            commentId,
            commentUpdate
        })
    },

    deleteComment : function(commentId) {
        return axios.delete(URL_BASE+"comment/delete/"+commentId)
    },

    getMyPlants: function (userId) {
        return axios.get(URL_BASE + "myplants/" + userId)
    },

    updatePlant: function (plantId, update,growth_months) {
        console.log(update)
        return axios.put(URL_BASE + "plant/edit", {
            plantId: plantId,
            growth_habit: update.growth_habit,
            toxicity: update.toxicity,
            growth: update.growth,
            ph_min: update.ph_min,
            ph_max: update.ph_max,
            watering_min: update.watering_min,
            watering_max: update.watering_max,
            temperature_min: update.temperature_min,
            temperature_max: update.temperature_max,
            light: update.light,
            sowing: update.sowing,
            soil_nutriments: update.soil_nutriments,
            soil_texture: update.soil_texture,
            growth_months: growth_months,
        })
    }
}

export default API;