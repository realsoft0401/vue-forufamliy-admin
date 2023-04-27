import axios from "~/utils/axios"

export  function getImageClassList(page, limit = 10){
    const result =  axios.get('/admin/image_class/'+ page +'?limit='+ limit )
    return result
}

export  function createImageClass(data){
    const result =  axios.post('/admin/image_class', data)
    return result
}

export  function editImageClass(id, data){
    const result =  axios.post('/admin/image_class/'+ id, data)
    return result
}

export  function delImageClass(id){
    const result =  axios.post('/admin/image_class/'+ id +'/delete')
    return result
}

export  function getImageList(id, page){
    const result =  axios.get('/admin/image_class/'+ id +'/image/'+ page +'?limit=10')
    return result
}


export  function editImgFile(id, name){
    const result =  axios.post('/admin/image/'+id, { name })
    return result
}


export  function delImgFile(ids){
    const result =  axios.post('/admin/image/delete_all', { ids })
    return result
}

export const uploadImageAction = "/api/admin/image/upload"