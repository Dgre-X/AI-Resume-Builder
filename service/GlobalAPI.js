// const { default: axios } = require("axios");
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY

const clientAxios = axios.create({
    baseURL:'http://localhost:1337/api/',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})

const createNewResume = (data) => clientAxios.post('/user-resumes', data)
const getUserResume = (userEmail) => clientAxios.get('/user-resumes?filter[userEmail][$eq]'+ userEmail)
const updateResumeDetails = (id, data) => clientAxios.put('/user-resumes/'+id,data)
const getResumeInfoById = (id) => clientAxios.get('/user-resumes/'+id+'?populate=*')
const deleteResumeById = (id) => clientAxios.delete('/user-resumes/'+ id)
export default {
    createNewResume,
    getUserResume,
    updateResumeDetails,
    getResumeInfoById,
    deleteResumeById
}