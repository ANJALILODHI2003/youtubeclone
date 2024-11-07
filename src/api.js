import axios from 'axios'
console.log(process.env.REACT_APP_YOUTUBE_API_KEY)
const request = axios.create({
   baseURL: 'https://youtube.googleapis.com/youtube/v3/',
   params: {
      key: 'AIzaSyDUJiJJg0OPNFI-UF_oMUF3dnpGvfC98xs',
   },
})

export default request