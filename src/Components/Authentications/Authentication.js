import axios from "axios";
import keys from "../../key/accessKey";


function Authentication () {
    axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=valorant&key=${keys.ytKey}`)
    .then(res => {
    console.log(res.data.items[0].snippet.title)
    }) 
}

export default Authentication