import axios from "~/utils/axios"

export  function getNoticeList(page){
    const result =  axios.get('/admin/notice/'+ page)
    return result
}


export function createNoticeData(data){
    const result =  axios.post('/admin/notice', data)
    return result
}


export function delNoticeData(id ){
    const result =  axios.post(`/admin/notice/${id}/delete`)
    return result
}


export function editNoticeData(id, data){
    const result =  axios.post(`/admin/notice/${id}`,data)
    return result
}