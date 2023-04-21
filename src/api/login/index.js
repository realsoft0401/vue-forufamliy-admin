import axios from "~/utils/axios"

export async function loginApi(username, password){
    const result =  await axios.post('/admin/login',{username, password})
    return result
}

export async function getInfo(){
    const result =  await axios.post('/admin/getinfo')
    return result
}

export async function logOut(){
    const result =  await axios.post('/admin/logout')
    return result
}