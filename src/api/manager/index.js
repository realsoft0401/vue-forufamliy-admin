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