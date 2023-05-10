import axios from "~/utils/axios"
import { queryParams } from "~/utils/queryParams.js"

export function getManagerList(page,query = {}){
     let r = queryParams(query)
     return axios.get(`/admin/manager/${page}${r}`)
 }
 

export function deleteManager(id){
     const result = axios.post(`/admin/manager/${id}/delete`)
     return result
}

export function updateManagerStatus(id, status){
     const result = axios.post(`/admin/manager/${id}/update_status`,{ status })
     return result
}

export function createManager(data){
     const result = axios.post(`/admin/manager`, data)
     return result
}

export function updateManager(id, data){
     const result = axios.post(`/admin/manager/${id}`, data)
     return result
}