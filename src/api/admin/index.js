import axios from "~/utils/axios"

export  function rePassword(data){
    const result = axios.post('/admin/updatepassword',data)
    return result
}