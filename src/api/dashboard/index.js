import axios from "~/utils/axios"

export  function getStatisticsDB(){
    const result =  axios.get('/admin/statistics1')
    return result
}