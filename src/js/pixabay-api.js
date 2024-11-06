import axios from 'axios';

const API_KEY = '46806547-3cbb9c5e78d8f101f788426f8';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;
    const response = await axios.get(url);
    
    if (response.status !== 200) {
        throw new Error('Failed to fetch images');
    }
    
    return {
        images: response.data.hits.map(({ webformatURL, largeImageURL, tags, likes, comments, views, downloads }) => ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            comments,
            views,
            downloads,
        })),
        totalHits: response.data.totalHits,
    };
}
