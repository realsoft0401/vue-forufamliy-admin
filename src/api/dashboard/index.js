import axios from "~/utils/axios"

export  function getStatisticsDB(){
    const result =  axios.get('/admin/statistics1')
    return result
}


export  function getStatisticsLine(type){
    const result =  axios.get('/admin/statistics3?type=' + type)
    return result
}