import axios from "~/utils/axios"

export  function login(username, password){
    const result =  axios.post('/admin/login',{username, password})
    return result
}

export  function getInfo(){
    const result =  axios.post('/admin/getinfo')
    return result
}

export  function logOut(){
    const result =  axios.post('/admin/logout')
    return result
}