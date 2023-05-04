import axios from "~/utils/axios"

export  function getMaragerList(page, query = {
    limit: 10,
    keyword: null
 } ){
    let result
    if (query.keyword == null) {
         result = axios.get(`/admin/manager/${page}?limit=${query.limit}`)
    }else{
         result = axios.get(`/admin/manager/${page}?limit=${query.limit}&keyword=${encodeURIComponent(query.keyword)}`)
    }
    return result
}

export function delManagerData(id){
     const result = axios.post(`/admin/manager/${id}/delete`)
     return result
}

export function editManagerStatus(id, status){
     const result = axios.post(`/admin/manager/${id}/update_status`,{ status })
     return result
}

export function addManager(data){
     const result = axios.post(`/admin/manager`, data)
     return result
}

export function editManager(id, data){
     const result = axios.post(`/admin/manager/${id}`, data)
     return result
}