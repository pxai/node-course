const axios = require('axios');

const url = '';

const getDataFromApi = () => {
	return axios.get(`${url}`)
		.then((response) => {
			return response;
			});

}
