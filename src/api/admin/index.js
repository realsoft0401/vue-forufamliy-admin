import axios from "~/utils/axios"

export async function rePassword(data){
    const result =  await axios.post('/admin/updatepassword',data)
    return result
}