import axios from 'axios'
const apiUrl = import.meta.env.VITE_HIGHSCORES_API_URL;

const highScoresApi = axios.create({
	baseURL: apiUrl + '/HighScore',
	timeout: 5000
});

export default highScoresApi;