
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20496318-c7af985c6ce4a327e41f45e16';

function fetchImages(query, page) {
    return (
        axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`)
            .then(responce => responce.data.hits)
    )
}
export { fetchImages };