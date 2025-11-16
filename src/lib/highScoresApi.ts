import axios from 'axios'

const highScoresApi = axios.create({
	baseURL: 'https://localhost:7071/HighScore',
	timeout: 5000
});

export default highScoresApi;