import axios from "axios"
const instance = axios.create({
    baseURL: 'https://backend.muskskyland.com.vn/api/v1',
    // timeout: 10000,
    headers:{
        "Content-Type":"application/json"
    }
})
export default instance

